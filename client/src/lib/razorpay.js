let loading;
export function loadRazorpay() {
  if (window.Razorpay) return Promise.resolve(window.Razorpay);
  if (loading) return loading;
  loading = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    const timer = setTimeout(() => failed(), 20000);
    function failed() {
      clearTimeout(timer);
      script.remove();
      loading = null;
      reject(new Error('Unable to load secure checkout. Check your connection and try again.'));
    }
    script.onerror = failed;
    script.onload = () => {
      clearTimeout(timer);
      if (!window.Razorpay) return failed();
      resolve(window.Razorpay);
    };
    document.head.appendChild(script);
  });
  return loading;
}
