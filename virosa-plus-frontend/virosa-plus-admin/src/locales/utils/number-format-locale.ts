import i18next from 'i18next';

import { allLangs } from '../all-langs';
import { fallbackLng } from '../locales-config';

// ----------------------------------------------------------------------

export function formatNumberLocale() {
  const lng = i18next.resolvedLanguage ?? fallbackLng;

  const currentLang = allLangs.find((lang) => lang.value === lng);

  return { code: currentLang?.numberFormat.code, currency: currentLang?.numberFormat.currency };
}
