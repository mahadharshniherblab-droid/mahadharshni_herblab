// Turns the English text the owner types into Tamil, Telugu and Hindi,
// so the dashboard only needs one language while the site still shows all four.
const ENDPOINT = 'https://translate.googleapis.com/translate_a/single';
const TARGETS = ['ta', 'te', 'hi'];
// Google keeps this marker intact, so several fields can travel in one request.
const SEPARATOR = ' §§ ';

async function translate(text, target) {
  const url = `${ENDPOINT}?client=gtx&sl=en&tl=${target}&dt=t&q=${encodeURIComponent(text)}`;
  const res = await fetch(url, { signal: AbortSignal.timeout(9000) });
  if (!res.ok) throw new Error(`Translation request failed (${res.status})`);
  const data = await res.json();
  const out = (data?.[0] ?? []).map((part) => part?.[0] ?? '').join('').trim();
  if (!out) throw new Error('Translation came back empty');
  return out;
}

/**
 * Translates a list of English strings into Tamil, Telugu and Hindi.
 * On failure every language falls back to the English list, so nothing is left blank.
 * @returns {Promise<{ta:string[], te:string[], hi:string[], translated:boolean}>}
 */
export async function translateList(items) {
  const list = (items ?? []).map((item) => String(item ?? '').trim());
  if (!list.some(Boolean)) return { ta: list, te: list, hi: list, translated: false };

  try {
    const joined = list.join(SEPARATOR);
    const result = { translated: true };
    for (const lang of TARGETS) {
      const text = await translate(joined, lang);
      const parts = text.split(/§§/).map((part) => part.trim());
      result[lang] = parts.length === list.length ? parts : list;
    }
    return result;
  } catch (error) {
    console.error('[translate] falling back to English:', error.message);
    return { ta: list, te: list, hi: list, translated: false };
  }
}

/**
 * @returns {Promise<{ values: {ta:string, te:string, hi:string}, translated: boolean }>}
 */
export async function translateEnglish(text) {
  const clean = String(text ?? '').trim();
  if (!clean) return { values: { ta: '', te: '', hi: '' }, translated: false };
  const result = await translateList([clean]);
  return {
    values: { ta: result.ta[0] ?? clean, te: result.te[0] ?? clean, hi: result.hi[0] ?? clean },
    translated: result.translated
  };
}

/** Builds the "English|தமிழ்|తెలుగు|हिन्दी" string the storefront reads. */
export async function toAllLanguages(text) {
  const clean = String(text ?? '').trim();
  if (!clean) return { value: '', translated: false };
  const { values, translated } = await translateEnglish(clean);
  return { value: [clean, values.ta, values.te, values.hi].join('|'), translated };
}

/** "English|தமிழ்|..." for a name and a description in a single translation round. */
export async function pairToAllLanguages(name, description) {
  const cleanName = String(name ?? '').trim();
  const cleanDescription = String(description ?? '').trim();
  const result = await translateList([cleanName, cleanDescription]);
  const at = (list, index, fallback) => list[index] || fallback;
  return {
    label: [cleanName, at(result.ta, 0, cleanName), at(result.te, 0, cleanName), at(result.hi, 0, cleanName)].join('|'),
    description: cleanDescription
      ? [cleanDescription, at(result.ta, 1, cleanDescription), at(result.te, 1, cleanDescription), at(result.hi, 1, cleanDescription)].join('|')
      : '',
    translated: result.translated
  };
}
