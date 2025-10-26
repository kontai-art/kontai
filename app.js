// Fade-in blocks when they enter viewport
const fadeBlocks = [...document.querySelectorAll('.fade-block')];
const fadeObs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('visible');
      fadeObs.unobserve(e.target);
    }
  });
},{threshold:0.2});
fadeBlocks.forEach(el=>fadeObs.observe(el));

// Smooth scroll for in-page nav
document.querySelectorAll('a[href^="#"]').forEach(link=>{
  link.addEventListener('click',e=>{
    const target=document.querySelector(link.getAttribute('href'));
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth'});
    }
  });
});

// Hero video fallback handling
const heroVideo = document.querySelector('.scene-hero-video');
const heroFallback = document.querySelector('.scene-hero-fallback');

// some browsers block autoplay until they confirm it's actually playing
if (heroVideo && heroFallback) {
  heroVideo.addEventListener('playing', () => {
    // video is actually running → hide fallback still
    heroFallback.style.display = 'none';
  });

  heroVideo.addEventListener('error', () => {
    // video can't play → hide video, keep fallback
    heroVideo.style.display = 'none';
    heroFallback.style.display = 'block';
  });
}
