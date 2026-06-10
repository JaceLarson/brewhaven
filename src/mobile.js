/*
 * Mobile mode detection. Loaded first so every later script (and the inline
 * orientation-watcher in index.html) can read MOBILE_MODE / isPortrait().
 */

// Mobile mode = small viewport (phones/small tablets), checked once at load.
// Using the smaller dimension means it stays stable across orientation changes.
const MOBILE_MODE = Math.min(window.innerWidth, window.innerHeight) <= 700;

function isPortrait() { return window.innerHeight > window.innerWidth; }

// Mobile browsers' 100vh includes space hidden behind the address bar /
// toolbars, which makes #game taller than what's actually visible and cuts
// off content (e.g. the menu's START GAME button). Track the real visible
// height in a CSS custom property that #game's height is based on.
function setViewportHeight() {
  const h = window.visualViewport ? window.visualViewport.height : window.innerHeight;
  document.documentElement.style.setProperty('--vh', h * 0.01 + 'px');
}
setViewportHeight();
window.addEventListener('resize', setViewportHeight);
window.addEventListener('orientationchange', setViewportHeight);
if (window.visualViewport) window.visualViewport.addEventListener('resize', setViewportHeight);
