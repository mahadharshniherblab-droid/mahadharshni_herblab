// One queue for checkout edits and payment transitions in this backend process.
let pending = Promise.resolve();
export function withOrderLock(operation) {
  const result = pending.then(operation);
  pending = result.catch(() => {});
  return result;
}
