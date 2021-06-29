
import { initReactI18next } from 'react-i18next';

import en_US from '../../public/locale/en_US/ui.json';


export default function initI18next(i18n, options = {}) {
  i18n.use(initReactI18next).init({
    ns: ['ui'],
    defaultNS: 'ui',
    fallbackLng: 'zh',

    interpolation: {
      escapeValue: false,
    },

    react: {
      useSuspense: false,
    },

    ...options,
  });

  i18n.addResourceBundle('en', 'ui', en_US);
  i18n.addResourceBundle('zh', 'ui', {});

  return i18n;
}
