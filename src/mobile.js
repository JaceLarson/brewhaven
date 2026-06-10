/*
 * Mobile mode detection. Loaded first so every later script (and the inline
 * orientation-watcher in index.html) can read MOBILE_MODE / isPortrait().
 */

// Mobile mode = small viewport (phones/small tablets), checked once at load.
// Using the smaller dimension means it stays stable across orientation changes.
const MOBILE_MODE = Math.min(window.innerWidth, window.innerHeight) <= 700;

function isPortrait() { return window.innerHeight > window.innerWidth; }
