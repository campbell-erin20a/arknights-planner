
import i18next from 'i18next';
import Detector from 'i18next-browser-languagedetector';

import init from '@shared/i18n';


export default function initI18next() {
  i18next.use(Detector);
  return init(i18next, {});
}
