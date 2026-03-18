const nav = document.querySelector('.nav');
const hero = document.querySelector('.hero');
const observer = new IntersectionObserver(
  ([entry]) => {
    nav.style.opacity = entry.isIntersecting ? '1' : '0';
    nav.style.pointerEvents = entry.isIntersecting ? 'auto' : 'none';
  },
  { threshold: 0 }
);
observer.observe(hero);
