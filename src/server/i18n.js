
import i18next from 'i18next';
import middleware from 'i18next-http-middleware';
import init from '@shared/i18n';


i18next.use(middleware.LanguageDetector);
init(i18next, {
  preload: ['en-US', 'ja-JP', 'ko-KR', 'zh-CN', 'zh-TW'],
});

export default (options = {}) => middleware.handle(i18next, options);
