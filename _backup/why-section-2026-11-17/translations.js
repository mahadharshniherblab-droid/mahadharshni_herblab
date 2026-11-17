// UI text in English, Tamil, Telugu and Hindi.
// Native speakers should review the Tamil, Telugu and Hindi text before launch.

export const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'ta', label: 'தமிழ்' },
  { code: 'te', label: 'తెలుగు' },
  { code: 'hi', label: 'हिन्दी' }
];

export const translations = {
  en: {
    tagline: 'Innovation starts here',
    shippingPolicy: 'Free delivery on orders over ₹1,000. ₹80 shipping on orders up to ₹1,000.',
    closeIngredient: 'Close',
    nature: { title: 'Goodness of Nature', body: 'From hibiscus petals to fenugreek seeds, discover the thirteen herbs that go into Keshdharshni hair oil.', previous: 'Previous slide', next: 'Next slide' },
    ingredientGroups: { hair: 'Hair oil', roll: 'Roll-on' },
    nav: { home: 'Home', offers: 'Offers', shop: 'Order', ingredients: 'Ingredients', about: 'About', contact: 'Contact', cart: 'Cart' },
    offer: { banner: 'First order offer: every product just ₹{offer} (MRP ₹{price})', short: 'First order ₹{offer}' },
    seasonal: {
      label: 'Limited time', title: 'Seasonal offers',
      intro: 'Special deals for the season — visit us before they are gone.',
      empty: 'No seasonal offers right now — check back soon!',
      valid: 'Offer period'
    },
    hero: {
      products: 'Herbal products',
      ingredients: 'Herbal ingredients',
      eyebrow: 'Pure herbs. Honest care. Visible results.',
      positioning: 'Where ancient herbs meet modern care.',
      title: 'Where Nature Begins,',
      accent: 'Wellness Follows.',
      subtitle: 'From a scalp massage with our 13-herb hair oil to a roll-on you can tuck in your bag, find herbal care for your daily routine.',
      cta: 'Shop now'
    },
    home: {
      productsTitle: 'Our products',
      whyTitle: 'The Mahadharshni Promise',
      whyEyebrow: 'Simple, by design',
      whyIntro: 'No long ingredient lists to decode, no guessing what you\'re putting on your skin. Just herbs you can name, batches small enough to check by hand, and a checkout you can trust.',
      why: [
        { t: 'Herbs you can recognise', d: 'Hibiscus, fenugreek, neem and more — handpicked and pressed into every bottle. No mineral oil, no filler, no fine print to decode.' },
        { t: 'Small batches, checked by hand', d: 'We blend, rest and bottle just a few litres at a time, so every bottle that reaches you is fresh, potent and personally checked.' },
        { t: 'No mystery ingredients', d: 'Open the label and meet every herb inside — its picture, its purpose, its story. If we can\'t explain it simply, it doesn\'t go in the bottle.' },
        { t: 'Checkout you can trust', d: 'UPI, cards or net banking, protected end to end. Your details stay private, and your order stays tracked from our hands to your door.' }
      ]
    },
    product: {
      mrp: 'MRP', offer: 'Offer price', addToCart: 'Add to cart', added: 'Added!',
      buyNow: 'Buy now', viewDetails: 'View details', size: 'Size', howToUse: 'How to use',
      benefits: 'Benefits', ingredients: 'Key ingredients', inclTax: 'Inclusive of all taxes',
      qty: 'Quantity', notFound: 'Product not found', backToShop: 'Back to shop', caution: 'Caution'
    },
    cart: {
      title: 'Your cart', empty: 'Your cart is empty.', continue: 'Continue shopping',
      remove: 'Remove', subtotal: 'Subtotal', mrpTotal: 'MRP total', discount: 'First order discount',
      shipping: 'Shipping', free: 'Free', total: 'Total', checkout: 'Proceed to checkout',
      checkoutSoon: 'Checkout with OTP login and Razorpay payment is coming next.',
      offerNote: 'The {off}% discount applies to every unit, on every order.',
      loading: 'Calculating…'
    },
    about: {
      title: 'About us',
      body: 'We draw on traditional herbal knowledge to make everyday care for hair, skin and sore muscles.'
    },
    reach: {
      title: "Ready to feel better, Naturally?",
      intro: "Call, WhatsApp or email us for help with products and orders.",
      call: "Call",
      whatsapp: "WhatsApp us",
      email: "Email us",
      follow: "Follow us on Instagram", instagram: "Instagram",
      explore: "Explore",
      top: "Back to top",
      credit: "Designed & developed by",
      websiteInvite: "Want a website like this? Tap {brand} to visit."
    },
    contact: {
      title: 'Contact us', name: 'Your name', phone: 'Mobile number', email: 'Email (optional)',
      message: 'Message', send: 'Send message', sent: 'Thank you! We will get back to you soon.',
      error: 'Could not send. Please try again.'
    },
    footer: { rights: 'All rights reserved.', disclaimer: 'These products are herbal preparations. Results may vary. Not intended to diagnose, treat or cure any disease. Consult a doctor if symptoms persist.' },
    fx: {
      offerTitle: '{off}% off', every: 'Every product', from: 'from', only: '', cta: 'Shop now',
      welcomeTitle: 'Welcome to Mahadharshni Herblab',
      welcomeBody: 'Great offers on every product — from ₹{offer}, with up to {off}% off.',
      welcomeCta: 'Grab the offer', welcomeLater: 'Maybe later',
      added: '{name} added to cart', viewCart: 'View cart', logoHint: 'Tap the logo', close: 'Close'
    },
    skip: 'Skip'
  },

  ta: {
    tagline: 'புதுமை இங்கே தொடங்குகிறது',
    shippingPolicy: '₹1,000க்கு மேல் இலவச டெலிவரி. ₹1,000 வரை டெலிவரி கட்டணம் ₹80.',
    closeIngredient: 'மூடு',
    nature: { title: 'இயற்கையின் நன்மை', body: 'செம்பருத்தி இதழ்கள் முதல் வெந்தயம் வரை கேஷ்தர்ஷ்னி கூந்தல் எண்ணெயில் உள்ள பதின்மூன்று மூலிகைகளை அறியுங்கள்.', previous: 'முந்தைய பக்கம்', next: 'அடுத்த பக்கம்' },
    ingredientGroups: { hair: 'கூந்தல் எண்ணெய்', roll: 'ரோல்-ஆன்' },
    nav: { home: 'முகப்பு', offers: 'சலுகைகள்', shop: 'ஆர்டர்', ingredients: 'மூலப்பொருட்கள்', about: 'எங்களைப் பற்றி', contact: 'தொடர்பு', cart: 'கூடை' },
    offer: { banner: 'முதல் ஆர்டர் சலுகை: ஒவ்வொரு பொருளும் ₹{offer} மட்டுமே (MRP ₹{price})', short: 'முதல் ஆர்டர் ₹{offer}' },
    seasonal: {
      label: 'வரையறுக்கப்பட்ட நேரம்', title: 'பருவகால சலுகைகள்',
      intro: 'பருவத்திற்கான சிறப்பு சலுகைகள் — முடிவதற்குள் வாருங்கள்.',
      empty: 'இப்போது பருவகால சலுகைகள் இல்லை — விரைவில் மீண்டும் பாருங்கள்!',
      valid: 'சலுகை காலம்'
    },
    hero: {
      products: 'மூலிகைத் தயாரிப்புகள்',
      ingredients: 'மூலிகைப் பொருட்கள்',
      eyebrow: 'தூய மூலிகைகள். நேர்மையான பராமரிப்பு. கண்கூடான பலன்கள்.',
      positioning: 'பாரம்பரிய மூலிகைகளும் நவீன பராமரிப்பும் சந்திக்கும் இடம்.',
      title: 'இயற்கை தொடங்கும் இடத்தில்,',
      accent: 'நலம் தொடரும்.',
      subtitle: 'தலை மசாஜுக்கு 13 மூலிகைகள் கொண்ட கூந்தல் எண்ணெய், கையோடு எடுத்துச் செல்ல ரோல்-ஆன் என உங்கள் அன்றாடத் தேவைக்கான மூலிகைப் பராமரிப்பைத் தேர்ந்தெடுங்கள்.',
      cta: 'இப்போதே வாங்குங்கள்'
    },
    home: {
      productsTitle: 'எங்கள் தயாரிப்புகள்',
      whyTitle: 'ஏன் மகாதர்ஷ்னி ஹெர்ப்லேப்?',
      why: [
        { t: 'உண்மையான மூலிகைகள், கலப்படம் இல்லை', d: 'செம்பருத்தி, வெந்தயம், வேப்பிலை என கைமுறையாகத் தேர்ந்தெடுத்த மூலிகைகளே ஒவ்வொரு புட்டியிலும். மினரல் ஆயில் இல்லை, சுருக்குவழி இல்லை.' },
        { t: 'சிறு அளவில் கவனமாகக் கலப்பு', d: 'சில லிட்டர் அளவில் கலந்து, ஊறவைத்து, புட்டியில் அடைக்கிறோம் — உங்களை அடைவது புதியதாகவும், கைப்படச் சோதித்ததாகவும் இருக்கும்.' },
        { t: 'ஒவ்வொரு மூலிகைக்கும் ஒரு பெயர்', d: 'மூலப்பொருள் பட்டியலைத் திறந்து ஒவ்வொரு மூலிகையையும் அறியுங்கள் — படம், பயன், கதை. லேபிளில் எதுவும் மர்மமாக இல்லை.' },
        { t: 'உங்கள் வசதியில், பாதுகாப்பாக', d: 'UPI, கார்டு அல்லது நெட் பேங்கிங் — முழுமையாகப் பாதுகாக்கப்பட்டது. உங்கள் விவரங்கள் ரகசியம், ஆர்டர் கண்காணிக்கப்படும்.' }
      ]
    },
    product: {
      mrp: 'MRP', offer: 'சலுகை விலை', addToCart: 'கூடையில் சேர்', added: 'சேர்க்கப்பட்டது!',
      buyNow: 'இப்போது வாங்கு', viewDetails: 'விவரங்கள்', size: 'அளவு', howToUse: 'பயன்படுத்தும் முறை',
      benefits: 'நன்மைகள்', ingredients: 'முக்கிய மூலப்பொருட்கள்', inclTax: 'அனைத்து வரிகளும் உட்பட',
      qty: 'எண்ணிக்கை', notFound: 'பொருள் கிடைக்கவில்லை', backToShop: 'கடைக்குத் திரும்பு', caution: 'எச்சரிக்கை'
    },
    cart: {
      title: 'உங்கள் கூடை', empty: 'உங்கள் கூடை காலியாக உள்ளது.', continue: 'தொடர்ந்து வாங்குங்கள்',
      remove: 'நீக்கு', subtotal: 'கூட்டுத்தொகை', mrpTotal: 'MRP மொத்தம்', discount: 'முதல் ஆர்டர் தள்ளுபடி',
      shipping: 'டெலிவரி', free: 'இலவசம்', total: 'மொத்தம்', checkout: 'செக்அவுட் செய்',
      checkoutSoon: 'OTP உள்நுழைவு மற்றும் Razorpay கட்டணத்துடன் செக்அவுட் விரைவில் வருகிறது.',
      offerNote: '{off}% தள்ளுபடி ஒவ்வொரு ஆர்டரின் ஒவ்வொரு யூனிட்டுக்கும் பொருந்தும்.',
      loading: 'கணக்கிடப்படுகிறது…'
    },
    about: {
      title: 'எங்களைப் பற்றி',
      body: 'கூந்தல், சருமம் மற்றும் தசைப் பராமரிப்புக்கான எங்கள் தயாரிப்புகள் பாரம்பரிய மூலிகை அறிவை அடிப்படையாகக் கொண்டவை.'
    },
    reach: {
      title: "இயற்கையாக நலமாக உணரத் தயாரா?",
      intro: "தயாரிப்புகள் மற்றும் ஆர்டர்கள் பற்றி தொலைபேசி, வாட்ஸ்அப் அல்லது மின்னஞ்சலில் தொடர்பு கொள்ளுங்கள்.",
      call: "அழைக்க",
      whatsapp: "வாட்ஸ்அப்",
      email: "மின்னஞ்சல்",
      follow: "இன்ஸ்டாகிராமில் பின்தொடருங்கள்", instagram: "இன்ஸ்டாகிராம்",
      explore: "பார்வையிட",
      top: "மேலே செல்ல",
      credit: "வடிவமைத்து உருவாக்கியவர்கள்",
      websiteInvite: "இது போன்ற இணையதளம் வேண்டுமா? {brand} தளத்திற்குச் செல்ல இங்கே தட்டவும்."
    },
    contact: {
      title: 'தொடர்பு கொள்ள', name: 'உங்கள் பெயர்', phone: 'மொபைல் எண்', email: 'மின்னஞ்சல் (விருப்பம்)',
      message: 'செய்தி', send: 'அனுப்பு', sent: 'நன்றி! விரைவில் உங்களைத் தொடர்பு கொள்வோம்.',
      error: 'அனுப்ப முடியவில்லை. மீண்டும் முயற்சிக்கவும்.'
    },
    footer: { rights: 'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.', disclaimer: 'இவை மூலிகைத் தயாரிப்புகள். பலன்கள் நபருக்கு நபர் மாறுபடலாம். அறிகுறிகள் தொடர்ந்தால் மருத்துவரை அணுகவும்.' },
    fx: {
      offerTitle: '{off}% தள்ளுபடி', every: 'ஒவ்வொரு பொருளும்', from: 'முதல்', only: 'மட்டுமே', cta: 'இப்போதே வாங்குங்கள்',
      welcomeTitle: 'Mahadharshni Herblab-க்கு வரவேற்கிறோம்',
      welcomeBody: 'ஒவ்வொரு பொருளுக்கும் சிறந்த சலுகை — ₹{offer} முதல், {off}% வரை தள்ளுபடி.',
      welcomeCta: 'சலுகையைப் பெறுங்கள்', welcomeLater: 'பிறகு பார்க்கலாம்',
      added: '{name} கூடையில் சேர்க்கப்பட்டது', viewCart: 'கூடையைப் பார்க்க', logoHint: 'லோகோவைத் தொடுங்கள்', close: 'மூடு'
    },
    skip: 'தவிர்'
  },

  te: {
    tagline: 'ఆవిష్కరణ ఇక్కడే మొదలవుతుంది',
    shippingPolicy: '₹1,000 కంటే ఎక్కువ విలువైన ఆర్డర్లకు ఉచిత డెలివరీ. ₹1,000 వరకు డెలివరీ ఛార్జీ ₹80.',
    closeIngredient: 'మూసివేయి',
    nature: { title: 'ప్రకృతి మేలు', body: 'మందార రేకుల నుంచి మెంతుల వరకు కేశధర్షిణి నూనెలోని పదమూడు మూలికలను తెలుసుకోండి.', previous: 'మునుపటి పేజీ', next: 'తదుపరి పేజీ' },
    ingredientGroups: { hair: 'హెయిర్ ఆయిల్', roll: 'రోల్-ఆన్' },
    nav: { home: 'హోమ్', offers: 'ఆఫర్లు', shop: 'ఆర్డర్', ingredients: 'పదార్థాలు', about: 'మా గురించి', contact: 'సంప్రదించండి', cart: 'కార్ట్' },
    offer: { banner: 'మొదటి ఆర్డర్ ఆఫర్: ప్రతి ఉత్పత్తి కేవలం ₹{offer} (MRP ₹{price})', short: 'మొదటి ఆర్డర్ ₹{offer}' },
    seasonal: {
      label: 'పరిమిత సమయం', title: 'కాలానుగుణ ఆఫర్లు',
      intro: 'సీజన్ కోసం ప్రత్యేక డీల్స్ — అయిపోయే ముందు రండి.',
      empty: 'ప్రస్తుతం కాలానుగుణ ఆఫర్లు లేవు — త్వరలో మళ్లీ చూడండి!',
      valid: 'ఆఫర్ కాలం'
    },
    hero: {
      products: 'మూలికా ఉత్పత్తులు',
      ingredients: 'మూలికా పదార్థాలు',
      eyebrow: 'స్వచ్ఛమైన మూలికలు. నిజాయితీతో సంరక్షణ. కనిపించే ఫలితాలు.',
      positioning: 'సాంప్రదాయ మూలికలు, ఆధునిక సంరక్షణ కలిసే చోటు.',
      title: 'ప్రకృతి మొదలయ్యే చోట,',
      accent: 'ఆరోగ్యం వెల్లివిరుస్తుంది.',
      subtitle: 'తలకు మర్దన చేసుకోవడానికి 13 మూలికలతో చేసిన నూనె, మీ బ్యాగులో వెంట తీసుకెళ్లడానికి రోల్-ఆన్. మీ దినచర్యకు సరిపోయే మూలికా ఉత్పత్తులను ఎంచుకోండి.',
      cta: 'ఇప్పుడే కొనండి'
    },
    home: {
      productsTitle: 'మా ఉత్పత్తులు',
      whyTitle: 'మహాదర్శ్ని హెర్బ్‌ల్యాబ్ ఎందుకు?',
      why: [
        { t: 'నిజమైన మూలికలే, కల్తీ లేదు', d: 'మందార, మెంతులు, వేప — చేతితో ఎంచుకున్న మూలికలే ప్రతి బాటిల్‌లో. మినరల్ ఆయిల్ లేదు, షార్ట్‌కట్‌లు లేవు.' },
        { t: 'చిన్న బ్యాచ్‌లలో శ్రద్ధగా కలయిక', d: 'కొన్ని లీటర్ల చొప్పున కలిపి, నానబెట్టి, బాటిల్ చేస్తాం — మీకు చేరేది తాజాగా, చేతితో పరీక్షించినదిగా ఉంటుంది.' },
        { t: 'ప్రతి మూలికకు ఒక పేరు', d: 'పదార్థాల జాబితా తెరిచి ప్రతి మూలికను తెలుసుకోండి — చిత్రం, పని, కథ. లేబుల్‌పై ఏదీ మిస్టరీ కాదు.' },
        { t: 'మీ విధంగా, సురక్షితంగా', d: 'UPI, కార్డులు లేదా నెట్ బ్యాంకింగ్ — పూర్తిగా సురక్షితం. మీ వివరాలు గోప్యం, ఆర్డర్ ట్రాక్ అవుతుంది.' }
      ]
    },
    product: {
      mrp: 'MRP', offer: 'ఆఫర్ ధర', addToCart: 'కార్ట్‌కు జోడించండి', added: 'జోడించబడింది!',
      buyNow: 'ఇప్పుడే కొనండి', viewDetails: 'వివరాలు', size: 'పరిమాణం', howToUse: 'వాడే విధానం',
      benefits: 'ప్రయోజనాలు', ingredients: 'ముఖ్య పదార్థాలు', inclTax: 'అన్ని పన్నులతో కలిపి',
      qty: 'పరిమాణం', notFound: 'ఉత్పత్తి కనబడలేదు', backToShop: 'షాప్‌కు తిరిగి వెళ్ళండి', caution: 'జాగ్రత్త'
    },
    cart: {
      title: 'మీ కార్ట్', empty: 'మీ కార్ట్ ఖాళీగా ఉంది.', continue: 'షాపింగ్ కొనసాగించండి',
      remove: 'తొలగించు', subtotal: 'ఉపమొత్తం', mrpTotal: 'MRP మొత్తం', discount: 'మొదటి ఆర్డర్ తగ్గింపు',
      shipping: 'డెలివరీ', free: 'ఉచితం', total: 'మొత్తం', checkout: 'చెక్అవుట్‌కు వెళ్ళండి',
      checkoutSoon: 'OTP లాగిన్ మరియు Razorpay చెల్లింపుతో చెక్అవుట్ త్వరలో వస్తుంది.',
      offerNote: '{off}% తగ్గింపు ప్రతి ఆర్డర్‌లోని ప్రతి యూనిట్‌కు వర్తిస్తుంది.',
      loading: 'లెక్కిస్తోంది…'
    },
    about: {
      title: 'మా గురించి',
      body: 'జుట్టు, చర్మం, కండరాల రోజువారీ సంరక్షణకు సంప్రదాయ మూలికా జ్ఞానంతో మా ఉత్పత్తులను తయారు చేస్తాం.'
    },
    reach: {
      title: "సహజంగా మరింత మెరుగ్గా అనిపించేందుకు సిద్ధమా?",
      intro: "ఉత్పత్తులు, ఆర్డర్ల గురించి ఫోన్, వాట్సాప్ లేదా ఇమెయిల్ ద్వారా సంప్రదించండి.",
      call: "కాల్",
      whatsapp: "వాట్సాప్",
      email: "ఇమెయిల్",
      follow: "ఇన్‌స్టాగ్రామ్‌లో అనుసరించండి", instagram: "ఇన్‌స్టాగ్రామ్",
      explore: "అన్వేషించండి",
      top: "పైకి వెళ్లండి",
      credit: "రూపకల్పన, అభివృద్ధి",
      websiteInvite: "ఇలాంటి వెబ్‌సైట్ కావాలా? {brand} వెబ్‌సైట్‌ను సందర్శించడానికి నొక్కండి."
    },
    contact: {
      title: 'మమ్మల్ని సంప్రదించండి', name: 'మీ పేరు', phone: 'మొబైల్ నంబర్', email: 'ఈమెయిల్ (ఐచ్ఛికం)',
      message: 'సందేశం', send: 'పంపండి', sent: 'ధన్యవాదాలు! మేము త్వరలో మిమ్మల్ని సంప్రదిస్తాము.',
      error: 'పంపలేకపోయాము. దయచేసి మళ్ళీ ప్రయత్నించండి.'
    },
    footer: { rights: 'అన్ని హక్కులు ప్రత్యేకించబడ్డాయి.', disclaimer: 'ఇవి మూలికా ఉత్పత్తులు. ఫలితాలు వ్యక్తిని బట్టి మారవచ్చు. లక్షణాలు కొనసాగితే వైద్యుడిని సంప్రదించండి.' },
    fx: {
      offerTitle: '{off}% తగ్గింపు', every: 'ప్రతి ఉత్పత్తి', from: 'నుండి', only: '', cta: 'ఇప్పుడే కొనండి',
      welcomeTitle: 'Mahadharshni Herblab కు స్వాగతం',
      welcomeBody: 'ప్రతి ఉత్పత్తిపై గొప్ప ఆఫర్లు — ₹{offer} నుండి, {off}% వరకు తగ్గింపు.',
      welcomeCta: 'ఆఫర్ పొందండి', welcomeLater: 'తర్వాత చూస్తాను',
      added: '{name} కార్ట్‌లో చేరింది', viewCart: 'కార్ట్ చూడండి', logoHint: 'లోగోను తాకండి', close: 'మూసివేయి'
    },
    skip: 'దాటవేయి'
  },

  hi: {
    tagline: 'नवाचार यहीं से शुरू होता है',
    shippingPolicy: '₹1,000 से अधिक के ऑर्डर पर मुफ़्त डिलीवरी। ₹1,000 तक के ऑर्डर पर ₹80 डिलीवरी शुल्क।',
    closeIngredient: 'बंद करें',
    nature: { title: 'प्रकृति की अच्छाई', body: 'गुड़हल की पंखुड़ियों से लेकर मेथी के दानों तक, जानें केशधर्शनी हेयर ऑयल की तेरह जड़ी-बूटियों के बारे में।', previous: 'पिछली स्लाइड', next: 'अगली स्लाइड' },
    ingredientGroups: { hair: 'हेयर ऑयल', roll: 'रोल-ऑन' },
    nav: { home: 'होम', offers: 'ऑफ़र', shop: 'ऑर्डर', ingredients: 'सामग्री', about: 'हमारे बारे में', contact: 'संपर्क', cart: 'कार्ट' },
    offer: { banner: 'पहले ऑर्डर का ऑफ़र: हर प्रोडक्ट सिर्फ़ ₹{offer} (MRP ₹{price})', short: 'पहला ऑर्डर ₹{offer}' },
    seasonal: {
      label: 'सीमित समय', title: 'मौसमी ऑफ़र',
      intro: 'इस मौसम के खास ऑफ़र — खत्म होने से पहले आएँ।',
      empty: 'अभी कोई मौसमी ऑफ़र नहीं है — जल्दी फिर देखें!',
      valid: 'ऑफ़र अवधि'
    },
    hero: {
      products: 'हर्बल उत्पाद',
      ingredients: 'हर्बल सामग्री',
      eyebrow: 'शुद्ध जड़ी-बूटियाँ। सच्ची देखभाल। दिखते नतीजे।',
      positioning: 'जहाँ पारंपरिक जड़ी-बूटियाँ आधुनिक देखभाल से मिलती हैं।',
      title: 'जहाँ प्रकृति की शुरुआत,',
      accent: 'वहीं सेहत का साथ।',
      subtitle: 'सिर की मालिश के लिए 13 जड़ी-बूटियों वाला हेयर ऑयल और बैग में साथ रखने के लिए रोल-ऑन। अपनी दिनचर्या के लिए हर्बल देखभाल चुनें।',
      cta: 'अभी खरीदें'
    },
    home: {
      productsTitle: 'हमारे प्रोडक्ट',
      whyTitle: 'महादर्शनी हर्बलैब क्यों?',
      why: [
        { t: 'असली जड़ी-बूटियाँ, कोई मिलावट नहीं', d: 'गुड़हल, मेथी, नीम — हाथ से चुनी जड़ी-बूटियाँ हर बोतल में। न मिनरल ऑयल, न कोई शॉर्टकट।' },
        { t: 'छोटे बैच में, पूरी देखभाल से', d: 'कुछ लीटर के बैच में मिलाया, पकाया और बोतलबंद — आप तक ताज़ा, असरदार और हाथ से जाँचा हुआ पहुँचता है।' },
        { t: 'हर जड़ी-बूटी का अपना नाम', d: 'सामग्री सूची खोलिए और हर जड़ी-बूटी को जानिए — तस्वीर, काम और कहानी। लेबल पर कुछ भी रहस्य नहीं।' },
        { t: 'अपने तरीके से, सुरक्षित भुगतान', d: 'UPI, कार्ड या नेट बैंकिंग — शुरू से अंत तक सुरक्षित। आपकी जानकारी निजी और ऑर्डर ट्रैक रहता है।' }
      ]
    },
    product: {
      mrp: 'MRP', offer: 'ऑफ़र कीमत', addToCart: 'कार्ट में डालें', added: 'जोड़ दिया!',
      buyNow: 'अभी खरीदें', viewDetails: 'विवरण देखें', size: 'साइज़', howToUse: 'इस्तेमाल का तरीका',
      benefits: 'फ़ायदे', ingredients: 'मुख्य सामग्री', inclTax: 'सभी टैक्स सहित',
      qty: 'मात्रा', notFound: 'प्रोडक्ट नहीं मिला', backToShop: 'शॉप पर वापस जाएँ', caution: 'सावधानी'
    },
    cart: {
      title: 'आपका कार्ट', empty: 'आपका कार्ट खाली है।', continue: 'खरीदारी जारी रखें',
      remove: 'हटाएँ', subtotal: 'उप-योग', mrpTotal: 'MRP कुल', discount: 'पहले ऑर्डर की छूट',
      shipping: 'डिलीवरी', free: 'मुफ़्त', total: 'कुल', checkout: 'चेकआउट करें',
      checkoutSoon: 'OTP लॉगिन और Razorpay भुगतान के साथ चेकआउट जल्द आ रहा है।',
      offerNote: '{off}% की छूट हर ऑर्डर की हर यूनिट पर लागू होती है।',
      loading: 'गणना हो रही है…'
    },
    about: {
      title: 'हमारे बारे में',
      body: 'हम पारंपरिक जड़ी-बूटियों के ज्ञान से बालों, त्वचा और मांसपेशियों की रोज़मर्रा की देखभाल के उत्पाद बनाते हैं।'
    },
    reach: {
      title: "कुदरती देखभाल से बेहतर महसूस करने के लिए तैयार हैं?",
      intro: "उत्पाद और ऑर्डर से जुड़ी मदद के लिए कॉल, व्हाट्सऐप या ईमेल करें।",
      call: "कॉल करें",
      whatsapp: "व्हाट्सऐप करें",
      email: "ईमेल करें",
      follow: "इंस्टाग्राम पर फ़ॉलो करें", instagram: "इंस्टाग्राम",
      explore: "देखें",
      top: "ऊपर जाएँ",
      credit: "डिज़ाइन और विकास",
      websiteInvite: "ऐसी वेबसाइट चाहिए? {brand} की साइट देखने के लिए टैप करें।"
    },
    contact: {
      title: 'संपर्क करें', name: 'आपका नाम', phone: 'मोबाइल नंबर', email: 'ईमेल (वैकल्पिक)',
      message: 'संदेश', send: 'भेजें', sent: 'धन्यवाद! हम जल्द ही आपसे संपर्क करेंगे।',
      error: 'भेजा नहीं जा सका। कृपया फिर से कोशिश करें।'
    },
    footer: { rights: 'सर्वाधिकार सुरक्षित।', disclaimer: 'ये हर्बल उत्पाद हैं। परिणाम व्यक्ति के अनुसार अलग हो सकते हैं। लक्षण बने रहने पर डॉक्टर से सलाह लें।' },
    fx: {
      offerTitle: '{off}% की छूट', every: 'हर प्रोडक्ट', from: 'से', only: '', cta: 'अभी खरीदें',
      welcomeTitle: 'Mahadharshni Herblab में आपका स्वागत है',
      welcomeBody: 'हर प्रोडक्ट पर शानदार ऑफ़र — ₹{offer} से, {off}% तक की छूट।',
      welcomeCta: 'ऑफ़र पाएँ', welcomeLater: 'बाद में',
      added: '{name} कार्ट में जुड़ गया', viewCart: 'कार्ट देखें', logoHint: 'लोगो को छुएँ', close: 'बंद करें'
    },
    skip: 'छोड़ें'
  }
};
