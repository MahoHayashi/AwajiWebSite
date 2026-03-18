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

function drawMapConnectors() {
  const mapIllustration = document.querySelector('.map-illustration');
  if (!mapIllustration) return;

  const illustrationRect = mapIllustration.getBoundingClientRect();
  const firstIcon = mapIllustration.querySelector('.map-icon');

  function addLine(iconEl, nameEl, color, useRight) {
    if (!iconEl || !nameEl) return;
    const iconRect = iconEl.getBoundingClientRect();
    const nameRect = nameEl.getBoundingClientRect();

    const x1 = iconRect.left + iconRect.width / 2 - illustrationRect.left;
    const y1 = iconRect.top + iconRect.height / 2 - illustrationRect.top;
    const x2 = (useRight ? nameRect.right : nameRect.left) - illustrationRect.left;
    const y2 = nameRect.bottom - illustrationRect.top;

    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);

    const line = document.createElement('div');
    line.style.cssText = `position:absolute;left:${x1}px;top:${y1}px;width:${length}px;height:1px;background:${color};transform-origin:left center;transform:rotate(${angle}deg);pointer-events:none;`;
    mapIllustration.insertBefore(line, firstIcon);
  }

  addLine(document.querySelector('.map-icon--s2'), document.querySelector('.map-spots--right .map-spot-item:first-child .map-spot-name--blue'),   '#3088d0', false);
  addLine(document.querySelector('.map-icon--g2'), document.querySelector('.map-spots--right .map-spot-item:nth-child(2) .map-spot-name--orange'), '#f6ad4f', false);
  addLine(document.querySelector('.map-icon--s3'), document.querySelector('.map-spots--right .map-spot-item:nth-child(3) .map-spot-name--blue'),   '#3088d0', false);
  addLine(document.querySelector('.map-icon--s1'), document.querySelector('.map-spots--left .map-spot-item:nth-child(2) .map-spot-name--blue'),    '#3088d0', true);
  addLine(document.querySelector('.map-icon--g1'), document.querySelector('.map-spots--left .map-spot-item:first-child .map-spot-name--orange'),   '#f6ad4f', true);
  addLine(document.querySelector('.map-icon--g3'), document.querySelector('.map-spots--left .map-spot-item:nth-child(3) .map-spot-name--orange'),  '#f6ad4f', true);
}

window.addEventListener('load', () => setTimeout(drawMapConnectors, 500));
