import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import gr from './locales/gr.json';

// Detect user language
const getUserLanguage = () => {
  const savedLanguage = localStorage.getItem('language');
  if (savedLanguage) return savedLanguage;
  
  const browserLanguage = navigator.language.split('-')[0];
  return ['en', 'gr'].includes(browserLanguage) ? browserLanguage : 'en';
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      gr: { translation: gr }
    },
    lng: getUserLanguage(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;