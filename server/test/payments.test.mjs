import test from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import {createPaymentService,validPaymentSignature} from '../src/services/payments.js';
import {paymentRouterFor} from '../src/routes/payments.js';

const checkoutId='12345678-1234-4123-8123-123456789abc';
const secret='unit-test-secret-only';
const providerId='order_unitTest';
const paymentId='pay_unitTest';
const signature=(order=providerId)=>crypto.createHmac('sha256',secret).update(`${order}|${paymentId}`).digest('hex');
function fixture({total=439,live=false}={}) {
 let row={orderId:checkoutId,total,status:'PENDING_PAYMENT',paymentId:'',quoteJson:JSON.stringify({total,currency:'INR',lines:[]})};
 let writes=0,creates=0,queue=Promise.resolve();
 const payment={id:paymentId,order_id:providerId,amount:43900,currency:'INR',status:'captured',captured:true};
 const provider={orders:{
  create:async payload=>{creates++;assert.equal(payload.receipt,checkoutId);assert.equal(payload.currency,'INR');return {id:providerId,...payload};},
  fetch:async()=>({id:providerId,amount:43900,currency:'INR',status:'created'}),
  fetchPayments:async()=>({items:[]})
 },payments:{fetch:async()=>({...payment})}};
 const args={provider,keyId:live?'rzp_live_unit':'rzp_test_unit',secret,
  readOrders:async()=>[structuredClone(row)],
  saveOrder:async(index,next)=>{assert.equal(index,0);writes++;row=structuredClone(next);},
  lock:operation=>{const task=queue.then(operation);queue=task.catch(()=>{});return task;}};
 return {service:createPaymentService(args),args,provider,payment,row:()=>row,writes:()=>writes,creates:()=>creates,
  body:()=>({orderId:checkoutId,razorpay_order_id:providerId,razorpay_payment_id:paymentId,razorpay_signature:signature()})};
}
test('creates from saved amount and persists mapping; concurrent retries reuse one provider order',async()=>{
 const f=fixture();const results=await Promise.all([f.service.create(checkoutId),f.service.create(checkoutId)]);
 assert.equal(results[0].amount,43900);assert.equal(results[0].currency,'INR');assert.equal(f.creates(),1);
 assert.equal(JSON.parse(f.row().quoteJson).razorpay.orderId,providerId);assert.equal(f.row().status,'PAYMENT_CREATED');
});
test('missing checkout and amounts below 100 paise are rejected',async()=>{
 const f=fixture({total:.99});await assert.rejects(f.service.create(checkoutId),{status:400});
 await assert.rejects(f.service.create('bad'),{status:400});assert.equal(f.creates(),0);
});
test('missing fields, malformed signature, forged signature and swapped order cannot mark paid',async()=>{
 const f=fixture();await f.service.create(checkoutId);
 for(const body of [{},{...f.body(),razorpay_signature:'invalid'},{...f.body(),razorpay_signature:'0'.repeat(64)},{...f.body(),razorpay_order_id:'order_other',razorpay_signature:signature('order_other')}]){
  await assert.rejects(f.service.verify(body),{status:400});
 }
 assert.equal(f.writes(),1);assert.equal(f.row().paymentId,'');
});
test('captured test payment verifies idempotently and is labelled TEST_PAID',async()=>{
 const f=fixture();await f.service.create(checkoutId);
 assert.equal((await f.service.verify(f.body())).paid,true);assert.equal(f.row().status,'TEST_PAID');
 assert.equal(f.row().paymentId,paymentId);assert.equal(f.row().paymentMethod,'Razorpay Test');
 await f.service.verify(f.body());assert.equal(f.writes(),2);
});
test('captured live payment is PAID',async()=>{
 const f=fixture({live:true});await f.service.create(checkoutId);await f.service.verify(f.body());
 assert.equal(f.row().status,'PAID');
});
test('signature alone is insufficient: wrong amount/currency or payment order fails',async()=>{
 for(const patch of [{amount:100},{currency:'USD'},{order_id:'order_other'},{id:'pay_other'}]){
  const f=fixture();await f.service.create(checkoutId);Object.assign(f.payment,patch);
  await assert.rejects(f.service.verify(f.body()),{status:400});assert.equal(f.row().status,'PAYMENT_CREATED');
 }
});

test('routes map validation, authentication, provider failures and pending responses',async()=>{
 async function invoke(service,path,body={}) {
  const router=paymentRouterFor(service);
  const handler=router.stack.find(layer=>layer.route?.path===path).route.stack[0].handle;
  const response={status(code){this.code=code;return this;},json(value){this.body=value;return this;}};
  await handler({body},response);
  return response;
 }
 for(const [error,expected] of [[{status:400,message:'Invalid signature'},400],[{statusCode:401},401],[{statusCode:502},500]]) {
  const response=await invoke({verify:async()=>{throw error;}},'/verify-payment');
  assert.equal(response.code,expected);assert.equal(response.body.success,undefined);
 }
 const pending=await invoke({create:async id=>{assert.equal(id,checkoutId);return {pending:true};}},'/create-order',{orderId:checkoutId,amount:1});
 assert.equal(pending.code,202);
});
test('authorized payment stays pending and failed payment is never paid',async()=>{
 const f=fixture();await f.service.create(checkoutId);Object.assign(f.payment,{captured:false,status:'authorized'});
 assert.equal((await f.service.verify(f.body())).pending,true);assert.equal(f.writes(),1);
 f.payment.status='failed';await assert.rejects(f.service.verify(f.body()),{status:400});
});
test('new process can recover captured payment when callback was lost',async()=>{
 const f=fixture();await f.service.create(checkoutId);f.provider.orders.fetchPayments=async()=>({items:[f.payment]});
 const restarted=createPaymentService(f.args);assert.equal((await restarted.create(checkoutId)).paid,true);assert.equal(f.creates(),1);
});
test('failed storage write does not return payment success',async()=>{
 const f=fixture();await f.service.create(checkoutId);
 const service=createPaymentService({...f.args,saveOrder:async()=>{throw new Error('Sheets unavailable');}});
 await assert.rejects(service.verify(f.body()),/Sheets unavailable/);assert.equal(f.row().status,'PAYMENT_CREATED');
});
test('provider authentication error is propagated for route mapping',async()=>{
 const f=fixture();f.provider.orders.create=async()=>{throw {statusCode:401};};
 await assert.rejects(f.service.create(checkoutId),e=>e.statusCode===401);assert.equal(f.writes(),0);
});
test('signature comparison handles invalid types without throwing',()=>{
 for(const s of [null,{},[],12,'a'])assert.equal(validPaymentSignature(providerId,paymentId,s,secret),false);
 assert.equal(validPaymentSignature(providerId,paymentId,signature(),secret),true);
});
