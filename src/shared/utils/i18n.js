

export const FALLBACK_LANGUAGE = 'zh';

export function translate(i18n_string, language, missing = 'Missing Translation') {
  return i18n_string[language]
    ?? i18n_string[FALLBACK_LANGUAGE]
    ?? missing;
}
