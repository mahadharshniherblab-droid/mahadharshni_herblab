import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { translations, LANGUAGES } from '../i18n/translations.js';

const LangContext = createContext(null);

function lookup(obj, path) {
  return path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj);
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem('mh-lang');
      if (saved && translations[saved]) return saved;
    } catch { /* ignore */ }
    return 'en';
  });

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dataset.lang = lang;
    try { localStorage.setItem('mh-lang', lang); } catch { /* ignore */ }
  }, [lang]);

  const value = useMemo(() => {
    // t('cart.offerNote', { cap: 1 }) -> translated string with {placeholders} filled.
    // Falls back to English when a key is missing in the chosen language.
    const t = (key, vars) => {
      let s = lookup(translations[lang], key) ?? lookup(translations.en, key) ?? key;
      if (typeof s === 'string' && vars) {
        s = s.replace(/\{(\w+)\}/g, (_, v) => (vars[v] ?? `{${v}}`));
      }
      return s;
    };
    return { lang, setLang, t, languages: LANGUAGES };
  }, [lang]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
