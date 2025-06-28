/* language-switcher.js */
/* 1) reads the i18n object from translations.js
   2) swaps English ↔ Spanish text on demand
   Robust version: replaces **all** template markers inside each element
   without nuking the rest of its HTML. */

let currentLang = localStorage.getItem('lang') || 'en';

// lookup helper
function t(key) {
  return (i18n[currentLang] && i18n[currentLang][key]) || i18n.en[key] || key;
}

// iterate once on DOMContentLoaded *or* when we deliberately switch
function applyTranslations() {
  document.querySelectorAll('*').forEach(el => {
    el.innerHTML = el.innerHTML.replace(/{{\\s*t\\('(.+?)'\\)\\s*}}/g, (_, key) => t(key));
  });
}

// initial run
applyTranslations();

// make the switcher globally visible for the buttons
window.switchLang = lang => {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  applyTranslations();
};
