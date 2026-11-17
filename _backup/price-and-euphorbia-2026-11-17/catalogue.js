// Default catalogue, seeded from the storefront content.
// The owner can add, edit and delete products and ingredients from the admin dashboard;
// saved changes live in server/data/content.json.
export const DEFAULT_CATALOGUE = {
  "products": [
    {
      "id": "ortho-g",
      "slug": "ortho-g",
      "size": "50 ml",
      "accent": "#2e7d32",
      "inStock": true,
      "order": 0,
      "cardImage": "/media/ortho-g-square.jpg",
      "images": {
        "en": "/media/ortho-g-hd.png"
      },
      "i18n": {
        "en": {
          "name": "Ortho-G",
          "type": "Pain Relief Roll-On",
          "tagline": "Nature's Touch, Soothing Relief",
          "short": "A herbal roll-on for everyday aches in joints, back, neck and muscles.",
          "benefits": [
            "Soothes joint, back and neck discomfort",
            "Easy, mess-free roll-on",
            "Herbal formula with a cooling feel",
            "Handy size for home and travel"
          ],
          "howToUse": "Roll gently over the affected area 2–3 times a day and massage lightly until absorbed.",
          "caution": "For external use only. Avoid eyes and broken skin."
        },
        "ta": {
          "name": "ஆர்த்தோ-ஜி",
          "type": "வலி நிவாரண ரோல்-ஆன்",
          "tagline": "இயற்கையின் தொடுதல், இதமான நிவாரணம்",
          "short": "மூட்டு, முதுகு, கழுத்து, தசை வலிகளுக்கான மூலிகை ரோல்-ஆன்.",
          "benefits": [
            "மூட்டு, முதுகு, கழுத்து வலியைத் தணிக்கிறது",
            "எளிதான, கறையில்லா ரோல்-ஆன்",
            "குளிர்ச்சி உணர்வுடன் மூலிகை சூத்திரம்",
            "வீட்டிலும் பயணத்திலும் பயன்படுத்த எளிது"
          ],
          "howToUse": "பாதிக்கப்பட்ட இடத்தில் நாளொன்றுக்கு 2–3 முறை மெதுவாக உருட்டி, உறிஞ்சும் வரை லேசாகத் தேய்க்கவும்.",
          "caution": "வெளிப்புற பயன்பாட்டிற்கு மட்டும். கண்கள் மற்றும் காயங்களில் படாமல் பார்த்துக்கொள்ளவும்."
        },
        "te": {
          "name": "ఆర్థో-జి",
          "type": "నొప్పి ఉపశమన రోల్-ఆన్",
          "tagline": "ప్రకృతి స్పర్శ, ఉపశమనం",
          "short": "కీళ్ళు, వీపు, మెడ, కండరాల నొప్పులకు మూలికా రోల్-ఆన్.",
          "benefits": [
            "కీళ్ళు, వీపు, మెడ నొప్పిని తగ్గిస్తుంది",
            "సులభమైన, మరకలు లేని రోల్-ఆన్",
            "చల్లదనం ఇచ్చే మూలికా ఫార్ములా",
            "ఇంట్లో, ప్రయాణంలో వాడటానికి అనుకూలం"
          ],
          "howToUse": "నొప్పి ఉన్న చోట రోజుకు 2–3 సార్లు మెల్లగా రోల్ చేసి, ఇంకిపోయే వరకు తేలికగా మర్దన చేయండి.",
          "caution": "బాహ్య వినియోగానికి మాత్రమే. కళ్ళు, గాయాలపై తగలకుండా చూడండి."
        },
        "hi": {
          "name": "ऑर्थो-जी",
          "type": "दर्द निवारक रोल-ऑन",
          "tagline": "प्रकृति का स्पर्श, सुकून भरी राहत",
          "short": "जोड़ों, पीठ, गर्दन और मांसपेशियों के रोज़मर्रा दर्द के लिए हर्बल रोल-ऑन।",
          "benefits": [
            "जोड़ों, पीठ और गर्दन के दर्द में आराम",
            "आसान, बिना गंदगी वाला रोल-ऑन",
            "ठंडक देने वाला हर्बल फ़ॉर्मूला",
            "घर और सफ़र के लिए सुविधाजनक"
          ],
          "howToUse": "प्रभावित जगह पर दिन में 2–3 बार धीरे से लगाएँ और सोखने तक हल्की मालिश करें।",
          "caution": "केवल बाहरी उपयोग के लिए। आँखों और कटी त्वचा से दूर रखें।"
        }
      }
    },
    {
      "id": "keshdharshni",
      "slug": "keshdharshni-hair-oil",
      "size": "100 ml",
      "accent": "#7b1e1e",
      "inStock": true,
      "order": 1,
      "cardImage": "/media/keshdharshni-square.jpg",
      "images": {
        "en": "/media/keshdharshni.jpg"
      },
      "i18n": {
        "en": {
          "name": "Keshdharshni",
          "type": "Herbal Hair Oil",
          "tagline": "Where Nature Meets Stronger Hair.",
          "short": "A blend of 13 herbs for hair growth and hair fall control, with a comb applicator.",
          "benefits": [
            "Supports hair growth",
            "Helps control hair fall",
            "Blend of 13 herbals",
            "Comb applicator reaches the scalp directly"
          ],
          "howToUse": "Apply to the scalp with the comb applicator, massage for 5 minutes and leave for at least 1 hour or overnight. Wash with a mild shampoo. Use 2–3 times a week.",
          "caution": "For external use only. Do a patch test before first use."
        },
        "ta": {
          "name": "கேஷ்தர்ஷ்னி",
          "type": "மூலிகை கூந்தல் எண்ணெய்",
          "tagline": "இயற்கை வலிமையான கூந்தலைச் சந்திக்கும் இடம்.",
          "short": "முடி வளர்ச்சி மற்றும் முடி உதிர்வு கட்டுப்பாட்டிற்கான 13 மூலிகைகளின் கலவை, சீப்பு அப்ளிகேட்டருடன்.",
          "benefits": [
            "முடி வளர்ச்சிக்கு உதவுகிறது",
            "முடி உதிர்வைக் கட்டுப்படுத்த உதவுகிறது",
            "13 மூலிகைகளின் கலவை",
            "சீப்பு அப்ளிகேட்டர் நேரடியாக உச்சந்தலையை அடைகிறது"
          ],
          "howToUse": "சீப்பு அப்ளிகேட்டரால் உச்சந்தலையில் தடவி 5 நிமிடம் மசாஜ் செய்து, குறைந்தது 1 மணி நேரம் அல்லது இரவு முழுவதும் வைக்கவும். மிதமான ஷாம்பூவால் அலசவும். வாரம் 2–3 முறை பயன்படுத்தவும்.",
          "caution": "வெளிப்புற பயன்பாட்டிற்கு மட்டும். முதல் முறை பயன்படுத்தும் முன் சிறிய இடத்தில் சோதிக்கவும்."
        },
        "te": {
          "name": "కేశ్‌దర్శ్ని",
          "type": "మూలికా జుట్టు నూనె",
          "tagline": "ప్రకృతి బలమైన జుట్టును కలిసే చోటు.",
          "short": "జుట్టు పెరుగుదల, జుట్టు రాలడం నియంత్రణకు 13 మూలికల మిశ్రమం, దువ్వెన అప్లికేటర్‌తో.",
          "benefits": [
            "జుట్టు పెరుగుదలకు తోడ్పడుతుంది",
            "జుట్టు రాలడాన్ని నియంత్రించడంలో సహాయపడుతుంది",
            "13 మూలికల మిశ్రమం",
            "దువ్వెన అప్లికేటర్ నేరుగా తలకు చేరుతుంది"
          ],
          "howToUse": "దువ్వెన అప్లికేటర్‌తో తలకు రాసి 5 నిమిషాలు మర్దన చేసి, కనీసం 1 గంట లేదా రాత్రంతా ఉంచండి. తేలికపాటి షాంపూతో కడగండి. వారానికి 2–3 సార్లు వాడండి.",
          "caution": "బాహ్య వినియోగానికి మాత్రమే. మొదటిసారి వాడే ముందు ప్యాచ్ టెస్ట్ చేయండి."
        },
        "hi": {
          "name": "केशदर्शनी",
          "type": "हर्बल हेयर ऑयल",
          "tagline": "जहाँ प्रकृति मिलती है मज़बूत बालों से।",
          "short": "बालों की ग्रोथ और हेयर फ़ॉल कंट्रोल के लिए 13 जड़ी-बूटियों का मिश्रण, कंघी एप्लिकेटर के साथ।",
          "benefits": [
            "बालों की ग्रोथ में मदद",
            "बालों का झड़ना कम करने में मदद",
            "13 जड़ी-बूटियों का मिश्रण",
            "कंघी एप्लिकेटर सीधे स्कैल्प तक पहुँचता है"
          ],
          "howToUse": "कंघी एप्लिकेटर से स्कैल्प पर लगाएँ, 5 मिनट मालिश करें और कम से कम 1 घंटा या रात भर छोड़ दें। हल्के शैम्पू से धोएँ। हफ़्ते में 2–3 बार इस्तेमाल करें।",
          "caution": "केवल बाहरी उपयोग के लिए। पहली बार इस्तेमाल से पहले पैच टेस्ट करें।"
        }
      }
    },
    {
      "id": "byewart",
      "slug": "byewart-gel",
      "size": "50 ml",
      "accent": "#c62828",
      "inStock": true,
      "order": 2,
      "cardImage": "/media/byewart-square.jpg",
      "images": {
        "en": "/media/byewart.jpg"
      },
      "i18n": {
        "en": {
          "name": "ByeWart",
          "type": "Gel",
          "tagline": "Effective Anti-Wart Formula",
          "short": "A Euphorbia hirta gel for warts and skin tags. Safe, gentle, for healthy clear skin.",
          "benefits": [
            "Helps remove warts and skin tags",
            "Made with Euphorbia hirta",
            "Safe and gentle on skin",
            "For healthy, clear skin"
          ],
          "howToUse": "Clean and dry the area. Apply a thin layer on the wart or skin tag only, 2 times a day, until it clears.",
          "caution": "For external use only. Do not apply on the face near the eyes, or on broken skin. Consult a doctor for warts that bleed, change colour or spread quickly."
        },
        "ta": {
          "name": "பைவார்ட்",
          "type": "ஜெல்",
          "tagline": "சிறந்த மரு நீக்கும் சூத்திரம்",
          "short": "மருக்கள் மற்றும் சதைப் பருக்களுக்கான அம்மான் பச்சரிசி (Euphorbia hirta) ஜெல். பாதுகாப்பானது, மென்மையானது.",
          "benefits": [
            "மருக்கள் மற்றும் சதைப் பருக்களை நீக்க உதவுகிறது",
            "அம்மான் பச்சரிசியால் தயாரிக்கப்பட்டது",
            "தோலுக்குப் பாதுகாப்பானது, மென்மையானது",
            "ஆரோக்கியமான, தெளிவான தோலுக்கு"
          ],
          "howToUse": "அந்த இடத்தைச் சுத்தம் செய்து உலர வைக்கவும். மரு அல்லது சதைப் பருவின் மீது மட்டும் மெல்லிய அடுக்காக நாளொன்றுக்கு 2 முறை தடவவும்.",
          "caution": "வெளிப்புற பயன்பாட்டிற்கு மட்டும். கண்களுக்கு அருகிலும் காயங்களிலும் தடவ வேண்டாம். இரத்தம் வரும், நிறம் மாறும் அல்லது வேகமாகப் பரவும் மருக்களுக்கு மருத்துவரை அணுகவும்."
        },
        "te": {
          "name": "బైవార్ట్",
          "type": "జెల్",
          "tagline": "ప్రభావవంతమైన పులిపిరి నివారణ ఫార్ములా",
          "short": "పులిపిర్లు, స్కిన్ ట్యాగ్‌ల కోసం నానబాలు (Euphorbia hirta) జెల్. సురక్షితం, మృదువైనది.",
          "benefits": [
            "పులిపిర్లు, స్కిన్ ట్యాగ్‌లను తొలగించడంలో సహాయపడుతుంది",
            "నానబాలు మూలికతో తయారు",
            "చర్మానికి సురక్షితం, మృదువైనది",
            "ఆరోగ్యకరమైన, స్పష్టమైన చర్మం కోసం"
          ],
          "howToUse": "ఆ ప్రాంతాన్ని శుభ్రం చేసి ఆరబెట్టండి. పులిపిరి లేదా స్కిన్ ట్యాగ్‌పై మాత్రమే రోజుకు 2 సార్లు పలుచగా రాయండి.",
          "caution": "బాహ్య వినియోగానికి మాత్రమే. కళ్ళ దగ్గర, గాయాలపై రాయవద్దు. రక్తం కారే, రంగు మారే లేదా వేగంగా వ్యాపించే పులిపిర్లకు వైద్యుడిని సంప్రదించండి."
        },
        "hi": {
          "name": "बायवार्ट",
          "type": "जेल",
          "tagline": "असरदार मस्सा-रोधी फ़ॉर्मूला",
          "short": "मस्सों और स्किन टैग के लिए दुग्धिका (Euphorbia hirta) जेल। सुरक्षित और सौम्य।",
          "benefits": [
            "मस्से और स्किन टैग हटाने में मदद",
            "दुग्धिका से बना",
            "त्वचा के लिए सुरक्षित और सौम्य",
            "स्वस्थ, साफ़ त्वचा के लिए"
          ],
          "howToUse": "जगह को साफ़ करके सुखा लें। सिर्फ़ मस्से या स्किन टैग पर दिन में 2 बार पतली परत लगाएँ।",
          "caution": "केवल बाहरी उपयोग के लिए। आँखों के पास या कटी त्वचा पर न लगाएँ। खून आने, रंग बदलने या तेज़ी से फैलने वाले मस्सों के लिए डॉक्टर से मिलें।"
        }
      }
    }
  ],
  "ingredientGroups": [
    {
      "key": "hair",
      "product": "Keshdharshni",
      "label": "Hair oil|கூந்தல் எண்ணெய்|హెయిర్ ఆయిల్|हेयर ऑयल",
      "order": 0,
      "entries": [
        {
          "key": "hibiscus",
          "label": "Hibiscus|செம்பருத்தி|మందారం|गुड़हल",
          "description": "Crimson petals used in traditional hair oils.|கூந்தல் எண்ணெயில் சேர்க்கப்படும் சிவப்பு இதழ்கள்.|కేశ తైలాల్లో వాడే ఎర్రని రేకులు.|बालों के पारंपरिक तेलों में इस्तेमाल होने वाली लाल पंखुड़ियाँ।",
          "image": "/media/ingredients/hibiscus.jpg",
          "order": 0
        },
        {
          "key": "bhringraj",
          "label": "Bhringraj|கரிசலாங்கண்ணி|గుంటగలగరాకు|भृंगराज",
          "description": "A leafy herb with small white flower heads.|சிறிய வெள்ளைப் பூக்கள் கொண்ட மூலிகை.|చిన్న తెల్లని పువ్వులు పూసే మొక్క.|छोटे सफेद फूलों वाली हरी जड़ी-बूटी।",
          "image": "/media/ingredients/bhringraj.jpg",
          "order": 1
        },
        {
          "key": "aloe",
          "label": "Aloe vera|கற்றாழை|కలబంద|घृतकुमारी",
          "description": "Thick, fleshy leaves hold a clear gel.|சதைப்பற்றுள்ள இலைகளுக்குள் தெளிவான ஜெல் உள்ளது.|దళసరి ఆకుల్లో పారదర్శకమైన గుజ్జు ఉంటుంది.|इसकी मोटी पत्तियों में पारदर्शी जेल होता है।",
          "image": "/media/ingredients/aloe.jpg",
          "order": 2
        },
        {
          "key": "black-cumin",
          "label": "Black cumin|கருஞ்சீரகம்|నల్ల జీలకర్ర|कलौंजी",
          "description": "Small, dark seeds with a distinctive aroma.|தனித்துவமான மணம் கொண்ட சிறிய கருப்பு விதைகள்.|ప్రత్యేకమైన సువాసన కలిగిన చిన్న నల్ల గింజలు.|खास सुगंध वाले छोटे काले बीज।",
          "image": "/media/ingredients/black-cumin.jpg",
          "order": 3
        },
        {
          "key": "muthiyar",
          "label": "Muthiyar Koondhal|முதியார் கூந்தல்|ముతియార్ కూందల్|मुथियार कूंधल",
          "description": "One of the herbs in the Keshdharshni oil blend.|கேஷ்தர்ஷ்னி எண்ணெய்க் கலவையில் உள்ள ஒரு மூலிகை.|కేశధర్షిణి నూనె మిశ్రమంలోని ఒక మూలిక.|केशधर्शनी तेल के मिश्रण में शामिल एक जड़ी-बूटी।",
          "image": "/media/ingredients/muthiyar.jpg",
          "order": 4
        },
        {
          "key": "joyweed",
          "label": "Sessile joyweed|பொன்னாங்கண்ணி|పొన్నగంటి|गुदरी साग",
          "description": "A low-growing plant with tender green leaves.|தரையோடு வளரும் மென்மையான பச்சைக் கீரை.|నేలకు దగ్గరగా పెరిగే లేత ఆకుల మొక్క.|ज़मीन के करीब उगने वाला कोमल हरी पत्तियों का पौधा।",
          "image": "/media/ingredients/joyweed.jpg",
          "order": 5
        },
        {
          "key": "rose",
          "label": "Rose flowers|ரோஜா மலர்கள்|గులాబీ పూలు|गुलाब के फूल",
          "description": "Fragrant petals lend a soft floral note.|மென்மையான மலர்மணம் தரும் இதழ்கள்.|మృదువైన పూల పరిమళాన్ని అందించే రేకులు.|कोमल पंखुड़ियाँ हल्की फूलों की खुशबू देती हैं।",
          "image": "/media/ingredients/rose.jpg",
          "order": 6
        },
        {
          "key": "cassia",
          "label": "Tanner’s cassia flowers|ஆவாரம் பூ|తంగేడు పూలు|तरवड़ के फूल",
          "description": "Golden-yellow blossoms from the cassia shrub.|ஆவாரச் செடியில் பூக்கும் பொன்னிற மலர்கள்.|తంగేడు పొదకు పూసే బంగారు పసుపు పూలు.|तरवड़ की झाड़ी पर खिलने वाले सुनहरे पीले फूल।",
          "image": "/media/ingredients/cassia.jpg",
          "order": 7
        },
        {
          "key": "fenugreek",
          "label": "Fenugreek seeds|வெந்தயம்|మెంతులు|मेथी के दाने",
          "description": "Amber seeds that soften when soaked.|ஊறவைத்தால் மென்மையாகும் பொன்னிற விதைகள்.|నానబెడితే మెత్తబడే పసుపు రంగు గింజలు.|पानी में भिगोने पर नरम होने वाले सुनहरे दाने।",
          "image": "/media/ingredients/fenugreek.jpg",
          "order": 8
        },
        {
          "key": "indigo",
          "label": "Indigo|அவுரி|నీలి|नील",
          "description": "The leafy plant known for its deep blue dye.|அடர் நீலச் சாயத்திற்குப் பெயர் பெற்ற செடி.|ముదురు నీలి రంగుకు ప్రసిద్ధి చెందిన మొక్క.|गहरे नीले रंग के लिए प्रसिद्ध पत्तेदार पौधा।",
          "image": "/media/ingredients/indigo.jpg",
          "order": 9
        },
        {
          "key": "neem",
          "label": "Neem leaves|வேப்பிலை|వేప ఆకులు|नीम की पत्तियाँ",
          "description": "Slender green leaflets with toothed edges.|பற்கள் போன்ற விளிம்புள்ள மெல்லிய பச்சை இலைகள்.|రంపపు అంచులు ఉన్న సన్నని ఆకులు.|दाँतेदार किनारों वाली पतली हरी पत्तियाँ।",
          "image": "/media/ingredients/neem.jpg",
          "order": 10
        },
        {
          "key": "amla",
          "label": "Amla|நெல்லிக்காய்|ఉసిరి|आँवला",
          "description": "Also called Indian gooseberry, a tart green fruit.|புளிப்புச் சுவை கொண்ட பச்சை நிறக் கனி.|పుల్లని రుచి గల ఆకుపచ్చ పండు.|खट्टे स्वाद वाला गोल हरा फल।",
          "image": "/media/ingredients/amla.jpg",
          "order": 11
        },
        {
          "key": "curry",
          "label": "Curry leaves|கறிவேப்பிலை|కరివేపాకు|करी पत्ता",
          "description": "Glossy, aromatic leaves used in the hair oil.|கூந்தல் எண்ணெயில் சேர்க்கப்படும் மணமுள்ள இலைகள்.|హెయిర్ ఆయిల్‌లో వాడే సువాసనగల ఆకులు.|बालों के तेल में इस्तेमाल होने वाली सुगंधित पत्तियाँ।",
          "image": "/media/ingredients/curry.jpg",
          "order": 12
        }
      ]
    },
    {
      "key": "roll",
      "product": "Ortho-G",
      "label": "Roll-on|ரோல்-ஆன்|రోల్-ఆన్|रोल-ऑन",
      "order": 1,
      "entries": [
        {
          "key": "menthol",
          "label": "Menthol|மெந்தால்|మెంథాల్|मेन्थॉल",
          "description": "The mint component behind the cooling sensation.|புதினாவுக்குக் குளிர்ச்சி தரும் கூறு.|పుదీనాకు చల్లదనాన్ని ఇచ్చే పదార్థం.|पुदीने का वह घटक जो ठंडक का एहसास देता है।",
          "image": "/media/ingredients/menthol.jpg",
          "order": 0
        },
        {
          "key": "turmeric",
          "label": "Turmeric|மஞ்சள்|పసుపు|हल्दी",
          "description": "A golden rhizome with a warm, earthy aroma.|மண் மணம் கொண்ட பொன்னிறக் கிழங்கு.|మట్టి పరిమళం గల బంగారు రంగు కొమ్ము.|मिट्टी जैसी सौंधी सुगंध वाली सुनहरी गाँठ।",
          "image": "/media/ingredients/turmeric.jpg",
          "order": 1
        },
        {
          "key": "eucalyptus",
          "label": "Eucalyptus|யூகலிப்டஸ்|యూకలిప్టస్|नीलगिरी",
          "description": "Long, aromatic leaves with a fresh scent.|புத்துணர்வான மணம் கொண்ட நீண்ட இலைகள்.|తాజా సువాసన కలిగిన పొడవైన ఆకులు.|ताज़ी खुशबू वाली लंबी पत्तियाँ।",
          "image": "/media/ingredients/eucalyptus.jpg",
          "order": 2
        }
      ]
    },
    {
      "key": "byewart",
      "product": "ByeWart",
      "label": "Gel|ஜெல்|జెల్|जेल",
      "order": 2,
      "entries": [
        {
          "key": "euphorbia-hirta",
          "label": "Euphorbia hirta (Amman Pacharisi)|Euphorbia hirta (அம்மான் பச்சரிசி)|Euphorbia hirta (అమ్మాన్ పచ్చరిసి)|Euphorbia hirta (अम्मान पचरिसी)",
          "description": "",
          "image": "/media/ingredients/euphorbia-hirta.jpg",
          "order": 0
        }
      ]
    }
  ],
  "herbalData": {
    "products": 3,
    "productsSuffix": "",
    "ingredients": 20,
    "ingredientsSuffix": "+"
  }
};
