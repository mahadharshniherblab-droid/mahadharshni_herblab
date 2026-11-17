// Small, dependency-free interaction helpers shared across the site.

export const reducedMotion = () =>
  typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

// Fades elements marked data-reveal into view as they scroll on screen.
// Marks them with data-in (an attribute React never touches) so re-renders keep them visible.
export function startReveal(root) {
  const show = (el) => el.setAttribute('data-in', '');
  if (reducedMotion() || !('IntersectionObserver' in window)) {
    const all = () => root.querySelectorAll('[data-reveal]:not([data-in])').forEach(show);
    all();
    const mo = new MutationObserver(all);
    mo.observe(root, { childList: true, subtree: true });
    return () => mo.disconnect();
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { show(e.target); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  const scan = () => root.querySelectorAll('[data-reveal]:not([data-in])').forEach((el) => io.observe(el));
  scan();
  const mo = new MutationObserver(scan);
  mo.observe(root, { childList: true, subtree: true });
  return () => { io.disconnect(); mo.disconnect(); };
}

// Material-style ripple on every .btn press.
export function startRipples() {
  const onDown = (e) => {
    const btn = e.target.closest('.btn, .ripple-host');
    if (!btn || reducedMotion()) return;
    const r = btn.getBoundingClientRect();
    const size = Math.max(r.width, r.height) * 2;
    const dot = document.createElement('span');
    dot.className = 'ripple';
    dot.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - r.left - size / 2}px;top:${e.clientY - r.top - size / 2}px`;
    btn.appendChild(dot);
    dot.addEventListener('animationend', () => dot.remove());
  };
  document.addEventListener('pointerdown', onDown);
  return () => document.removeEventListener('pointerdown', onDown);
}

// Sends a copy of a product photo flying into the cart icon.
export function flyToCart(img) {
  const cart = document.querySelector('.cart-btn');
  if (!img || !cart || reducedMotion() || !img.animate) return;
  const from = img.getBoundingClientRect();
  const to = cart.getBoundingClientRect();
  if (!from.width) return;
  const ghost = img.cloneNode();
  ghost.className = 'fly-ghost';
  ghost.removeAttribute('loading');
  Object.assign(ghost.style, { left: from.left + 'px', top: from.top + 'px', width: from.width + 'px', height: from.height + 'px' });
  document.body.appendChild(ghost);
  const dx = to.left + to.width / 2 - (from.left + from.width / 2);
  const dy = to.top + to.height / 2 - (from.top + from.height / 2);
  ghost.animate([
    { transform: 'translate(0,0) scale(1)', opacity: 1, borderRadius: '16px' },
    { transform: `translate(${dx * 0.55}px, ${dy * 0.55 - 80}px) scale(.45)`, opacity: .95, borderRadius: '50%', offset: 0.55 },
    { transform: `translate(${dx}px, ${dy}px) scale(.08)`, opacity: .2, borderRadius: '50%' }
  ], { duration: 850, easing: 'cubic-bezier(.5,0,.3,1)' }).finished.then(() => ghost.remove(), () => ghost.remove());
}

// A little burst of leaves from a point on screen.
export function leafBurst(x, y, count = 14) {
  if (reducedMotion()) return;
  const glyphs = ['🌿', '🍃', '✨', '🌱'];
  for (let i = 0; i < count; i++) {
    const s = document.createElement('span');
    s.className = 'leaf-particle';
    s.textContent = glyphs[i % glyphs.length];
    s.style.left = x + 'px';
    s.style.top = y + 'px';
    document.body.appendChild(s);
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
    const dist = 90 + Math.random() * 110;
    s.animate([
      { transform: 'translate(-50%,-50%) scale(.4) rotate(0deg)', opacity: 1 },
      { transform: `translate(calc(-50% + ${Math.cos(angle) * dist}px), calc(-50% + ${Math.sin(angle) * dist}px)) scale(1.1) rotate(${Math.random() * 360}deg)`, opacity: 0 }
    ], { duration: 900 + Math.random() * 500, easing: 'cubic-bezier(.2,.7,.3,1)' }).finished.then(() => s.remove(), () => s.remove());
  }
}
