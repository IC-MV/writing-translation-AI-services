/* language-switcher.js
   Reads the global i18n object from translations.js
   and swaps text between EN ↔ ES.
*/
let currentLang = localStorage.getItem('lang') || 'en';

const t = key =>
  (i18n[currentLang] && i18n[currentLang][key]) ||
  i18n.en[key] || key;

function applyTranslations () {
  document.documentElement.lang = currentLang;
  document.title = t('title_main');

  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.innerHTML = t(el.dataset.i18n);
  });
}

// run once the DOM is ready
document.addEventListener('DOMContentLoaded', applyTranslations);

// exposed to the buttons:  <button onclick="switchLang('es')">ES</button>
window.switchLang = lang => {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  applyTranslations();
};
