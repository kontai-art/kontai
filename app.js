// Fade-in animation blocks (optional future use)
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

// Smooth scroll navigation
document.querySelectorAll('a[href^="#"]').forEach(link=>{
  link.addEventListener('click',e=>{
    const target=document.querySelector(link.getAttribute('href'));
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth'});
    }
  });
});

// ✅ HERO VIDEO FAIL-SAFE INITIALIZATION
(function(){
  const video=document.querySelector('.scene-hero-video');
  const fallback=document.querySelector('.scene-hero-fallback');
  if(!video||!fallback)return;

  const playAttempt=video.play();
  if(playAttempt!==undefined){
    playAttempt.then(()=>{
      video.addEventListener('playing',()=>{
        video.style.display='block';
        fallback.style.display='none';
      },{once:true});
    }).catch(()=>{
      video.style.display='none';
      fallback.style.display='block';
    });
  }else{
    video.style.display='none';
    fallback.style.display='block';
  }
})();
