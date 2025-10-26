// Scroll fade-in effect
const fadeBlocks=[...document.querySelectorAll('.fade-block')];
const obs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('visible');
      obs.unobserve(e.target);
    }
  });
},{threshold:0.2});
fadeBlocks.forEach(el=>obs.observe(el));

// Smooth scroll nav
document.querySelectorAll('a[href^="#"]').forEach(link=>{
  link.addEventListener('click',e=>{
    const target=document.querySelector(link.getAttribute('href'));
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth'});
    }
  });
});
