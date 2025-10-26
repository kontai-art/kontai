// Smooth scroll navigation
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// HERO VIDEO FALLBACK FIX
(function(){
  const video = document.getElementById('heroVideo');
  const fallback = document.getElementById('heroFallback');
  if (!video || !fallback) return;

  // Try to play safely
  const playPromise = video.play();

  if (playPromise !== undefined) {
    playPromise.then(() => {
      video.addEventListener('playing', () => {
        video.style.opacity = '1';
        fallback.style.opacity = '0';
      }, { once: true });
    }).catch(() => {
      // Autoplay not allowed, show fallback
      video.style.opacity = '0';
      fallback.style.opacity = '1';
    });
  } else {
    fallback.style.opacity = '1';
  }
})();
