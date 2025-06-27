/* language-switcher.js
   Very small helper that
   1) reads the i18n object from translations.js
   2) swaps English ↔ Spanish text on demand
*/

// ---------- basic lookup ----------
function t(key) {
  // fall back to English if something is missing
  return i18n[currentLang][key] || i18n.en[key] || key;
}

// ---------- apply to every element that contains {{ t('key') }} ----------
function applyTranslations() {
  document.querySelectorAll('*').forEach(el => {
    const m = el.innerHTML.match(/{{\s*t\('(.+?)'\)\s*}}/);
    if (m) el.innerHTML = t(m[1]);
  });
}

// ---------- language handling ----------
let currentLang = localStorage.getItem('lang') || 'en';
applyTranslations();                        // run once on page load

window.switchLang = function (lang) {       // make it global for buttons
  currentLang = lang;
  localStorage.setItem('lang', lang);
  applyTranslations();
};