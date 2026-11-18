// Display content for each product, per language.
// Prices come from the API (server/src/config/products.js) - edit them there, not here.
// Per-language promo images: put a file in public/media/<lang>/ and list it under `images`;
// languages without their own image fall back to `en`.

export const PRODUCT_CONTENT = {
  'ortho-g': {
    slug: 'ortho-g',
    size: '50 ml',
    images: { en: '/media/ortho-g-hd.png' },
    cardImage: '/media/ortho-g-square.jpg',
    accent: '#2e7d32',
    en: {
      name: 'Ortho-G',
      type: 'Pain Relief Roll-On',
      tagline: "Nature's Touch, Soothing Relief",
      short: 'A herbal roll-on for everyday aches in joints, back, neck and muscles.',
      benefits: ['Soothes joint, back and neck discomfort', 'Easy, mess-free roll-on', 'Herbal formula with a cooling feel', 'Handy size for home and travel'],
      howToUse: 'Roll gently over the affected area 2–3 times a day and massage lightly until absorbed.',
      caution: 'For external use only. Avoid eyes and broken skin.'
    },
    ta: {
      name: 'ஆர்த்தோ-ஜி',
      type: 'வலி நிவாரண ரோல்-ஆன்',
      tagline: 'இயற்கையின் தொடுதல், இதமான நிவாரணம்',
      short: 'மூட்டு, முதுகு, கழுத்து, தசை வலிகளுக்கான மூலிகை ரோல்-ஆன்.',
      benefits: ['மூட்டு, முதுகு, கழுத்து வலியைத் தணிக்கிறது', 'எளிதான, கறையில்லா ரோல்-ஆன்', 'குளிர்ச்சி உணர்வுடன் மூலிகை சூத்திரம்', 'வீட்டிலும் பயணத்திலும் பயன்படுத்த எளிது'],
      howToUse: 'பாதிக்கப்பட்ட இடத்தில் நாளொன்றுக்கு 2–3 முறை மெதுவாக உருட்டி, உறிஞ்சும் வரை லேசாகத் தேய்க்கவும்.',
      caution: 'வெளிப்புற பயன்பாட்டிற்கு மட்டும். கண்கள் மற்றும் காயங்களில் படாமல் பார்த்துக்கொள்ளவும்.'
    },
    te: {
      name: 'ఆర్థో-జి',
      type: 'నొప్పి ఉపశమన రోల్-ఆన్',
      tagline: 'ప్రకృతి స్పర్శ, ఉపశమనం',
      short: 'కీళ్ళు, వీపు, మెడ, కండరాల నొప్పులకు మూలికా రోల్-ఆన్.',
      benefits: ['కీళ్ళు, వీపు, మెడ నొప్పిని తగ్గిస్తుంది', 'సులభమైన, మరకలు లేని రోల్-ఆన్', 'చల్లదనం ఇచ్చే మూలికా ఫార్ములా', 'ఇంట్లో, ప్రయాణంలో వాడటానికి అనుకూలం'],
      howToUse: 'నొప్పి ఉన్న చోట రోజుకు 2–3 సార్లు మెల్లగా రోల్ చేసి, ఇంకిపోయే వరకు తేలికగా మర్దన చేయండి.',
      caution: 'బాహ్య వినియోగానికి మాత్రమే. కళ్ళు, గాయాలపై తగలకుండా చూడండి.'
    },
    hi: {
      name: 'ऑर्थो-जी',
      type: 'दर्द निवारक रोल-ऑन',
      tagline: 'प्रकृति का स्पर्श, सुकून भरी राहत',
      short: 'जोड़ों, पीठ, गर्दन और मांसपेशियों के रोज़मर्रा दर्द के लिए हर्बल रोल-ऑन।',
      benefits: ['जोड़ों, पीठ और गर्दन के दर्द में आराम', 'आसान, बिना गंदगी वाला रोल-ऑन', 'ठंडक देने वाला हर्बल फ़ॉर्मूला', 'घर और सफ़र के लिए सुविधाजनक'],
      howToUse: 'प्रभावित जगह पर दिन में 2–3 बार धीरे से लगाएँ और सोखने तक हल्की मालिश करें।',
      caution: 'केवल बाहरी उपयोग के लिए। आँखों और कटी त्वचा से दूर रखें।'
    }
  },

  keshdharshni: {
    slug: 'keshdharshni-hair-oil',
    size: '100 ml',
    images: { en: '/media/keshdharshni.jpg' },
    cardImage: '/media/keshdharshni-square.jpg',
    accent: '#7b1e1e',
    en: {
      name: 'Keshdharshni',
      type: 'Herbal Hair Oil',
      tagline: 'Where Nature Meets Stronger Hair.',
      short: 'A blend of 13 herbs for hair growth and hair fall control, with a comb applicator.',
      benefits: ['Supports hair growth', 'Helps control hair fall', 'Blend of 13 herbals', 'Comb applicator reaches the scalp directly'],
      howToUse: 'Apply to the scalp with the comb applicator, massage for 5 minutes and leave for at least 1 hour or overnight. Wash with a mild shampoo. Use 2–3 times a week.',
      caution: 'For external use only. Do a patch test before first use.'
    },
    ta: {
      name: 'கேஷ்தர்ஷ்னி',
      type: 'மூலிகை கூந்தல் எண்ணெய்',
      tagline: 'இயற்கை வலிமையான கூந்தலைச் சந்திக்கும் இடம்.',
      short: 'முடி வளர்ச்சி மற்றும் முடி உதிர்வு கட்டுப்பாட்டிற்கான 13 மூலிகைகளின் கலவை, சீப்பு அப்ளிகேட்டருடன்.',
      benefits: ['முடி வளர்ச்சிக்கு உதவுகிறது', 'முடி உதிர்வைக் கட்டுப்படுத்த உதவுகிறது', '13 மூலிகைகளின் கலவை', 'சீப்பு அப்ளிகேட்டர் நேரடியாக உச்சந்தலையை அடைகிறது'],
      howToUse: 'சீப்பு அப்ளிகேட்டரால் உச்சந்தலையில் தடவி 5 நிமிடம் மசாஜ் செய்து, குறைந்தது 1 மணி நேரம் அல்லது இரவு முழுவதும் வைக்கவும். மிதமான ஷாம்பூவால் அலசவும். வாரம் 2–3 முறை பயன்படுத்தவும்.',
      caution: 'வெளிப்புற பயன்பாட்டிற்கு மட்டும். முதல் முறை பயன்படுத்தும் முன் சிறிய இடத்தில் சோதிக்கவும்.'
    },
    te: {
      name: 'కేశ్‌దర్శ్ని',
      type: 'మూలికా జుట్టు నూనె',
      tagline: 'ప్రకృతి బలమైన జుట్టును కలిసే చోటు.',
      short: 'జుట్టు పెరుగుదల, జుట్టు రాలడం నియంత్రణకు 13 మూలికల మిశ్రమం, దువ్వెన అప్లికేటర్‌తో.',
      benefits: ['జుట్టు పెరుగుదలకు తోడ్పడుతుంది', 'జుట్టు రాలడాన్ని నియంత్రించడంలో సహాయపడుతుంది', '13 మూలికల మిశ్రమం', 'దువ్వెన అప్లికేటర్ నేరుగా తలకు చేరుతుంది'],
      howToUse: 'దువ్వెన అప్లికేటర్‌తో తలకు రాసి 5 నిమిషాలు మర్దన చేసి, కనీసం 1 గంట లేదా రాత్రంతా ఉంచండి. తేలికపాటి షాంపూతో కడగండి. వారానికి 2–3 సార్లు వాడండి.',
      caution: 'బాహ్య వినియోగానికి మాత్రమే. మొదటిసారి వాడే ముందు ప్యాచ్ టెస్ట్ చేయండి.'
    },
    hi: {
      name: 'केशदर्शनी',
      type: 'हर्बल हेयर ऑयल',
      tagline: 'जहाँ प्रकृति मिलती है मज़बूत बालों से।',
      short: 'बालों की ग्रोथ और हेयर फ़ॉल कंट्रोल के लिए 13 जड़ी-बूटियों का मिश्रण, कंघी एप्लिकेटर के साथ।',
      benefits: ['बालों की ग्रोथ में मदद', 'बालों का झड़ना कम करने में मदद', '13 जड़ी-बूटियों का मिश्रण', 'कंघी एप्लिकेटर सीधे स्कैल्प तक पहुँचता है'],
      howToUse: 'कंघी एप्लिकेटर से स्कैल्प पर लगाएँ, 5 मिनट मालिश करें और कम से कम 1 घंटा या रात भर छोड़ दें। हल्के शैम्पू से धोएँ। हफ़्ते में 2–3 बार इस्तेमाल करें।',
      caution: 'केवल बाहरी उपयोग के लिए। पहली बार इस्तेमाल से पहले पैच टेस्ट करें।'
    }
  },

  byewart: {
    slug: 'byewart-gel',
    size: '50 ml',
    images: { en: '/media/byewart.jpg' },
    cardImage: '/media/byewart-square.jpg',
    cardFit: 'blend',
    accent: '#c62828',
    en: {
      name: 'ByeWart',
      type: 'Gel',
      tagline: 'Effective Anti-Wart Formula',
      short: 'A Euphorbia hirta gel for warts and skin tags. Safe, gentle, for healthy clear skin.',
      benefits: ['Helps remove warts and skin tags', 'Made with Euphorbia hirta', 'Safe and gentle on skin', 'For healthy, clear skin'],
      howToUse: 'Clean and dry the area. Apply a thin layer on the wart or skin tag only, 2 times a day, until it clears.',
      caution: 'For external use only. Do not apply on the face near the eyes, or on broken skin. Consult a doctor for warts that bleed, change colour or spread quickly.'
    },
    ta: {
      name: 'பைவார்ட்',
      type: 'ஜெல்',
      tagline: 'சிறந்த மரு நீக்கும் சூத்திரம்',
      short: 'மருக்கள் மற்றும் சதைப் பருக்களுக்கான அம்மான் பச்சரிசி (Euphorbia hirta) ஜெல். பாதுகாப்பானது, மென்மையானது.',
      benefits: ['மருக்கள் மற்றும் சதைப் பருக்களை நீக்க உதவுகிறது', 'அம்மான் பச்சரிசியால் தயாரிக்கப்பட்டது', 'தோலுக்குப் பாதுகாப்பானது, மென்மையானது', 'ஆரோக்கியமான, தெளிவான தோலுக்கு'],
      howToUse: 'அந்த இடத்தைச் சுத்தம் செய்து உலர வைக்கவும். மரு அல்லது சதைப் பருவின் மீது மட்டும் மெல்லிய அடுக்காக நாளொன்றுக்கு 2 முறை தடவவும்.',
      caution: 'வெளிப்புற பயன்பாட்டிற்கு மட்டும். கண்களுக்கு அருகிலும் காயங்களிலும் தடவ வேண்டாம். இரத்தம் வரும், நிறம் மாறும் அல்லது வேகமாகப் பரவும் மருக்களுக்கு மருத்துவரை அணுகவும்.'
    },
    te: {
      name: 'బైవార్ట్',
      type: 'జెల్',
      tagline: 'ప్రభావవంతమైన పులిపిరి నివారణ ఫార్ములా',
      short: 'పులిపిర్లు, స్కిన్ ట్యాగ్‌ల కోసం నానబాలు (Euphorbia hirta) జెల్. సురక్షితం, మృదువైనది.',
      benefits: ['పులిపిర్లు, స్కిన్ ట్యాగ్‌లను తొలగించడంలో సహాయపడుతుంది', 'నానబాలు మూలికతో తయారు', 'చర్మానికి సురక్షితం, మృదువైనది', 'ఆరోగ్యకరమైన, స్పష్టమైన చర్మం కోసం'],
      howToUse: 'ఆ ప్రాంతాన్ని శుభ్రం చేసి ఆరబెట్టండి. పులిపిరి లేదా స్కిన్ ట్యాగ్‌పై మాత్రమే రోజుకు 2 సార్లు పలుచగా రాయండి.',
      caution: 'బాహ్య వినియోగానికి మాత్రమే. కళ్ళ దగ్గర, గాయాలపై రాయవద్దు. రక్తం కారే, రంగు మారే లేదా వేగంగా వ్యాపించే పులిపిర్లకు వైద్యుడిని సంప్రదించండి.'
    },
    hi: {
      name: 'बायवार्ट',
      type: 'जेल',
      tagline: 'असरदार मस्सा-रोधी फ़ॉर्मूला',
      short: 'मस्सों और स्किन टैग के लिए दुग्धिका (Euphorbia hirta) जेल। सुरक्षित और सौम्य।',
      benefits: ['मस्से और स्किन टैग हटाने में मदद', 'दुग्धिका से बना', 'त्वचा के लिए सुरक्षित और सौम्य', 'स्वस्थ, साफ़ त्वचा के लिए'],
      howToUse: 'जगह को साफ़ करके सुखा लें। सिर्फ़ मस्से या स्किन टैग पर दिन में 2 बार पतली परत लगाएँ।',
      caution: 'केवल बाहरी उपयोग के लिए। आँखों के पास या कटी त्वचा पर न लगाएँ। खून आने, रंग बदलने या तेज़ी से फैलने वाले मस्सों के लिए डॉक्टर से मिलें।'
    }
  },
  'byewart-8456': {
    slug: 'byewart-8456',
    size: '30ml',
    images: { en: 'https://res.cloudinary.com/l0pwpmgt/image/upload/v1794903540/mahadharshni-herblab/ukdogxjvpdwlwqe6lbx9.jpg' },
    cardImage: 'https://res.cloudinary.com/l0pwpmgt/image/upload/c_pad,w_1200,h_1200,b_white/v1794903543/mahadharshni-herblab/fxspy0urxkpvfjueqgkj.jpg',
    cardFit: 'blend',
    accent: '#2e7d32',
    price: 150,
    en: {
      name: 'ByeWart',
      type: 'Oil',
      tagline: "Nature's Touch, Soothing Relief",
      short: 'A herbal pain relief roll-on designed for everyday aches and discomfort in joints, back, neck and muscles.',
      benefits: ['Soothes joint, back and neck discomfort', 'Easy, mess-free roll-on application', 'Herbal formula with a cooling feel', 'Convenient size for home and travel'],
      howToUse: 'Roll gently over the affected area 2–3 times a day and massage lightly until absorbed. Follow the product label directions.',
      caution: 'For external use only. Avoid contact with eyes and broken skin. Discontinue use if irritation occurs.'
    },
    ta: {
      name: 'ByeWart',
      type: 'Oil',
      tagline: "Nature's Touch, Soothing Relief",
      short: 'A herbal pain relief roll-on designed for everyday aches and discomfort in joints, back, neck and muscles.',
      benefits: ['Soothes joint, back and neck discomfort', 'Easy, mess-free roll-on application', 'Herbal formula with a cooling feel', 'Convenient size for home and travel'],
      howToUse: 'Roll gently over the affected area 2–3 times a day and massage lightly until absorbed. Follow the product label directions.',
      caution: 'For external use only. Avoid contact with eyes and broken skin. Discontinue use if irritation occurs.'
    },
    te: {
      name: 'బైవార్ట్',
      type: 'ఆయిల్',
      tagline: 'నేచర్స్ టచ్, ఓదార్పు ఉపశమనం',
      short: 'కీళ్ళు, వీపు, మెడ మరియు కండరాలలో రోజువారీ నొప్పులు మరియు అసౌకర్యం కోసం రూపొందించిన మూలికా నొప్పి నివారణ రోల్-ఆన్.',
      benefits: ['కీళ్ల, వీపు మరియు మెడ అసౌకర్యాన్ని ఉపశమనం చేస్తుంది', 'సులభమైన, గందరగోళం లేని రోల్-ఆన్ అప్లికేషన్', 'శీతలీకరణ అనుభూతితో కూడిన హెర్బల్ ఫార్ములా', 'ఇంటికి మరియు ప్రయాణానికి అనుకూలమైన పరిమాణం'],
      howToUse: 'ప్రభావిత ప్రాంతంపై రోజుకు 2-3 సార్లు సున్నితంగా రోల్ చేయండి మరియు గ్రహించే వరకు తేలికగా మసాజ్ చేయండి. ఉత్పత్తి లేబుల్ దిశలను అనుసరించండి.',
      caution: 'బాహ్య వినియోగం కోసం మాత్రమే. కళ్ళు మరియు విరిగిన చర్మంతో సంబంధాన్ని నివారించండి. చికాకు సంభవిస్తే ఉపయోగించడం మానేయండి.'
    },
    hi: {
      name: 'बायवार्ट',
      type: 'तेल',
      tagline: 'प्रकृति का स्पर्श, सुखदायक राहत',
      short: 'जोड़ों, पीठ, गर्दन और मांसपेशियों में रोजमर्रा के दर्द और परेशानी के लिए डिज़ाइन किया गया एक हर्बल दर्द निवारक रोल-ऑन।',
      benefits: ['जोड़ों, पीठ और गर्दन की परेशानी को शांत करता है', 'आसान, गंदगी मुक्त रोल-ऑन एप्लीकेशन', 'ठंडक के एहसास के साथ हर्बल फॉर्मूला', 'घर और यात्रा के लिए सुविधाजनक आकार'],
      howToUse: 'प्रभावित क्षेत्र पर दिन में 2-3 बार धीरे से घुमाएँ और अवशोषित होने तक हल्की मालिश करें। उत्पाद लेबल निर्देशों का पालन करें.',
      caution: 'केवल बाहरी उपयोग के लिए। आंखों और टूटी त्वचा के संपर्क से बचें। यदि जलन हो तो प्रयोग रोक दें।'
    }
  }
};

export const PRODUCT_ORDER = ['ortho-g', 'keshdharshni', 'byewart', 'byewart-8456'];

export function findBySlug(slug) {
  return PRODUCT_ORDER.find((id) => PRODUCT_CONTENT[id].slug === slug || id === slug);
}

export function imageFor(id, lang) {
  const imgs = PRODUCT_CONTENT[id].images;
  const path = imgs[lang] ?? imgs.en;
  return location.protocol === 'file:' ? 'preview/site' + path : path;
}
