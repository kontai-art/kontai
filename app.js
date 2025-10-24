// Optional analytics (wire your webhook or leave null)
const WEBHOOK_URL = null;
const startedAt = performance.now();
const pageName = "Showrooms";
function send(payload){ if(!WEBHOOK_URL){ console.debug("ANALYTICS", payload); return; }
  const blob = new Blob([JSON.stringify(payload)], {type: "application/json"});
  navigator.sendBeacon?.(WEBHOOK_URL, blob) ||
    fetch(WEBHOOK_URL, { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(payload) });
}
function logEvent(type, anchor="", extra={}) {
  send({ type, page: pageName, anchor, t: new Date().toISOString(), ms: Math.round(performance.now() - startedAt), ...extra });
}
const headerEl = document.querySelector('.site-header');
const progressEl = document.getElementById('scrollProgress');
const backToTop = document.getElementById('backToTop');
const burger = document.getElementById('burger');
const mobileNav = document.getElementById('mobileNav');
const mobileNavLinks = [...mobileNav.querySelectorAll('a[href^="#"]')];
let lastY = 0;
function updateHeaderAndProgress(){
  const y = window.scrollY || window.pageYOffset;
  if (y > 24) headerEl.classList.add('scrolled'); else headerEl.classList.remove('scrolled');
  const doc = document.documentElement;
  const scrollable = (doc.scrollHeight - doc.clientHeight);
  progressEl.style.transform = `scaleX(${scrollable>0? Math.min(1, y/scrollable):0})`;
  if (y > 320) backToTop.classList.add('show'); else backToTop.classList.remove('show');
  const isMobile = window.matchMedia('(max-width: 960px)').matches;
  if (isMobile){
    if (y > lastY && y > 80 && !mobileNav.classList.contains('open')) headerEl.classList.add('hide-mobile');
    else headerEl.classList.remove('hide-mobile');
  } else { headerEl.classList.remove('hide-mobile'); }
  lastY = y;
}
window.addEventListener('scroll', updateHeaderAndProgress, { passive: true });
window.addEventListener('resize', updateHeaderAndProgress);
document.addEventListener('DOMContentLoaded', updateHeaderAndProgress);
burger.addEventListener('click', ()=>{
  const open = mobileNav.classList.toggle('open');
  burger.setAttribute('aria-expanded', String(open));
});
mobileNavLinks.forEach(a => a.addEventListener('click', ()=> {
  mobileNav.classList.remove('open');
  burger.setAttribute('aria-expanded', 'false');
}));
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
const pxEls = [...document.querySelectorAll('[data-parallax]')];
function applyParallax() {
  const vh = window.innerHeight;
  pxEls.forEach(el => {
    const speed = parseFloat(el.getAttribute('data-parallax') || '0.05');
    const rect = el.getBoundingClientRect();
    const elCenter = rect.top + rect.height / 2;
    const delta = (elCenter - vh/2) / vh;
    const translate = Math.max(-1, Math.min(1, delta)) * (speed * 100);
    el.style.transform = `translate3d(0, ${translate}px, 0)`;
  });
}
window.addEventListener('scroll', applyParallax, { passive: true });
window.addEventListener('resize', applyParallax);
document.addEventListener('DOMContentLoaded', applyParallax);
const sections = ["#hero","#whatwedo","#products","#why","#examples","#tech","#privacy","#procurement","#process","#evidence","#faq","#contact"];
const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{ if(entry.isIntersecting){ logEvent("sectionEnter", `#${entry.target.id}`); } });
},{ threshold: 0.6 });
sections.forEach(sel=>{ const el = document.querySelector(sel); if(el) io.observe(el); });
window.addEventListener("beforeunload", ()=>{ logEvent("pageUnload"); });
document.getElementById("year").textContent = new Date().getFullYear();
document.addEventListener("click", (e)=>{
  const target = e.target.closest("a,button");
  if(!target) return;
  if(target.id === "btnDemo") logEvent("cta", "demo");
  if(target.id === "btnRefs") logEvent("cta", "references");
});
