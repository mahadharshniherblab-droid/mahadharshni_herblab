const languages = ['en', 'ta', 'te', 'hi'];

export const ingredientGroups = [
  {
    key: 'hair', product: 'Keshdharshni',
    entries: [
      ['hibiscus', 'Hibiscus|செம்பருத்தி|మందారం|गुड़हल', 'Crimson petals used in traditional hair oils.|கூந்தல் எண்ணெயில் சேர்க்கப்படும் சிவப்பு இதழ்கள்.|కేశ తైలాల్లో వాడే ఎర్రని రేకులు.|बालों के पारंपरिक तेलों में इस्तेमाल होने वाली लाल पंखुड़ियाँ।'],
      ['bhringraj', 'Bhringraj|கரிசலாங்கண்ணி|గుంటగలగరాకు|भृंगराज', 'A leafy herb with small white flower heads.|சிறிய வெள்ளைப் பூக்கள் கொண்ட மூலிகை.|చిన్న తెల్లని పువ్వులు పూసే మొక్క.|छोटे सफेद फूलों वाली हरी जड़ी-बूटी।'],
      ['aloe', 'Aloe vera|கற்றாழை|కలబంద|घृतकुमारी', 'Thick, fleshy leaves hold a clear gel.|சதைப்பற்றுள்ள இலைகளுக்குள் தெளிவான ஜெல் உள்ளது.|దళసరి ఆకుల్లో పారదర్శకమైన గుజ్జు ఉంటుంది.|इसकी मोटी पत्तियों में पारदर्शी जेल होता है।'],
      ['black-cumin', 'Black cumin|கருஞ்சீரகம்|నల్ల జీలకర్ర|कलौंजी', 'Small, dark seeds with a distinctive aroma.|தனித்துவமான மணம் கொண்ட சிறிய கருப்பு விதைகள்.|ప్రత్యేకమైన సువాసన కలిగిన చిన్న నల్ల గింజలు.|खास सुगंध वाले छोटे काले बीज।'],
      ['muthiyar', 'Muthiyar Koondhal|முதியார் கூந்தல்|ముతియార్ కూందల్|मुथियार कूंधल', 'One of the herbs in the Keshdharshni oil blend.|கேஷ்தர்ஷ்னி எண்ணெய்க் கலவையில் உள்ள ஒரு மூலிகை.|కేశధర్షిణి నూనె మిశ్రమంలోని ఒక మూలిక.|केशधर्शनी तेल के मिश्रण में शामिल एक जड़ी-बूटी।'],
      ['joyweed', 'Sessile joyweed|பொன்னாங்கண்ணி|పొన్నగంటి|गुदरी साग', 'A low-growing plant with tender green leaves.|தரையோடு வளரும் மென்மையான பச்சைக் கீரை.|నేలకు దగ్గరగా పెరిగే లేత ఆకుల మొక్క.|ज़मीन के करीब उगने वाला कोमल हरी पत्तियों का पौधा।'],
      ['rose', 'Rose flowers|ரோஜா மலர்கள்|గులాబీ పూలు|गुलाब के फूल', 'Fragrant petals lend a soft floral note.|மென்மையான மலர்மணம் தரும் இதழ்கள்.|మృదువైన పూల పరిమళాన్ని అందించే రేకులు.|कोमल पंखुड़ियाँ हल्की फूलों की खुशबू देती हैं।'],
      ['cassia', 'Tanner’s cassia flowers|ஆவாரம் பூ|తంగేడు పూలు|तरवड़ के फूल', 'Golden-yellow blossoms from the cassia shrub.|ஆவாரச் செடியில் பூக்கும் பொன்னிற மலர்கள்.|తంగేడు పొదకు పూసే బంగారు పసుపు పూలు.|तरवड़ की झाड़ी पर खिलने वाले सुनहरे पीले फूल।'],
      ['fenugreek', 'Fenugreek seeds|வெந்தயம்|మెంతులు|मेथी के दाने', 'Amber seeds that soften when soaked.|ஊறவைத்தால் மென்மையாகும் பொன்னிற விதைகள்.|నానబెడితే మెత్తబడే పసుపు రంగు గింజలు.|पानी में भिगोने पर नरम होने वाले सुनहरे दाने।'],
      ['indigo', 'Indigo|அவுரி|నీలి|नील', 'The leafy plant known for its deep blue dye.|அடர் நீலச் சாயத்திற்குப் பெயர் பெற்ற செடி.|ముదురు నీలి రంగుకు ప్రసిద్ధి చెందిన మొక్క.|गहरे नीले रंग के लिए प्रसिद्ध पत्तेदार पौधा।'],
      ['neem', 'Neem leaves|வேப்பிலை|వేప ఆకులు|नीम की पत्तियाँ', 'Slender green leaflets with toothed edges.|பற்கள் போன்ற விளிம்புள்ள மெல்லிய பச்சை இலைகள்.|రంపపు అంచులు ఉన్న సన్నని ఆకులు.|दाँतेदार किनारों वाली पतली हरी पत्तियाँ।'],
      ['amla', 'Amla|நெல்லிக்காய்|ఉసిరి|आँवला', 'Also called Indian gooseberry, a tart green fruit.|புளிப்புச் சுவை கொண்ட பச்சை நிறக் கனி.|పుల్లని రుచి గల ఆకుపచ్చ పండు.|खट्टे स्वाद वाला गोल हरा फल।'],
      ['curry', 'Curry leaves|கறிவேப்பிலை|కరివేపాకు|करी पत्ता', 'Glossy, aromatic leaves used in the hair oil.|கூந்தல் எண்ணெயில் சேர்க்கப்படும் மணமுள்ள இலைகள்.|హెయిర్ ఆయిల్‌లో వాడే సువాసనగల ఆకులు.|बालों के तेल में इस्तेमाल होने वाली सुगंधित पत्तियाँ।']
    ]
  },
  {
    key: 'roll', product: 'Ortho-G',
    entries: [
      ['menthol', 'Menthol|மெந்தால்|మెంథాల్|मेन्थॉल', 'The mint component behind the cooling sensation.|புதினாவுக்குக் குளிர்ச்சி தரும் கூறு.|పుదీనాకు చల్లదనాన్ని ఇచ్చే పదార్థం.|पुदीने का वह घटक जो ठंडक का एहसास देता है।'],
      ['turmeric', 'Turmeric|மஞ்சள்|పసుపు|हल्दी', 'A golden rhizome with a warm, earthy aroma.|மண் மணம் கொண்ட பொன்னிறக் கிழங்கு.|మట్టి పరిమళం గల బంగారు రంగు కొమ్ము.|मिट्टी जैसी सौंधी सुगंध वाली सुनहरी गाँठ।'],
      ['eucalyptus', 'Eucalyptus|யூகலிப்டஸ்|యూకలిప్టస్|नीलगिरी', 'Long, aromatic leaves with a fresh scent.|புத்துணர்வான மணம் கொண்ட நீண்ட இலைகள்.|తాజా సువాసన కలిగిన పొడవైన ఆకులు.|ताज़ी खुशबू वाली लंबी पत्तियाँ।']
    ]
  },
  {
    key: 'byewart', product: 'ByeWart', label: 'Gel|ஜெல்|జెల్|जेल',
    entries: [
      ['euphorbia-hirta', 'Euphorbia hirta (Amman Pacharisi)|Euphorbia hirta (அம்மான் பச்சரிசி)|Euphorbia hirta (అమ్మాన్ పచ్చరిసి)|Euphorbia hirta (अम्मान पचरिसी)', '']
    ]
  }
];

export function localized(text, lang) {
  const variants = text.split('|');
  return variants[languages.indexOf(lang)] ?? variants[0];
}
