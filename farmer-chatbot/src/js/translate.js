// ── UI TEXT FOR EACH LANGUAGE ──
const uiTranslations = {
  en: {
    headerTitle:      'Farmer Assistant',
    headerSubtitle:   'Your smart farming guide',
    welcomeMsg:       'Hello Farmer! 👋 I can help you with weather updates, crop advice, market prices, and pest control. How can I help you today?',
    inputPlaceholder: 'Type your question here...',
    sendBtn:          'Send ➤',
    quickWeather:     '🌦 Weather',
    quickCrop:        '🌱 Crop Advice',
    quickMarket:      '💰 Market Price',
    quickPest:        '🐛 Pest Control',
    quickScan:        '📷 Scan Crop',
    awaitingCity:     '🌍 Sure! Which city or district are you in?\n\nJust type your city name — for example: Hyderabad, Warangal, Nalgonda',
    scanTitle:        'Crop Disease Scanner',
    scanSubtitle:     'Upload a photo of your crop to detect diseases instantly',
    dropText:         'Tap to upload or drag & drop a crop photo',
    dropHint:         'Supports JPG, PNG — Max 5MB',
    scanTipsTitle:    '📸 Photo Tips for Best Results:',
    tip1:             'Take a close-up of the affected leaf or stem',
    tip2:             'Ensure good lighting — avoid shadows',
    tip3:             'Focus on the most visibly affected area',
    tip4:             'Avoid blurry or dark photos',
    analyzeBtn:       '🔬 Analyze Crop',
    analyzingBtn:     'Analyzing...',
    clearBtn:         '🗑 Clear',
  },
  hi: {
    headerTitle:      'किसान सहायक',
    headerSubtitle:   'आपका स्मार्ट खेती गाइड',
    welcomeMsg:       'नमस्ते किसान भाई! 👋 मैं मौसम, फसल सलाह, मंडी भाव और कीट नियंत्रण में मदद कर सकता हूं। आज क्या जानना चाहते हैं?',
    inputPlaceholder: 'अपना सवाल यहाँ लिखें...',
    sendBtn:          'भेजें ➤',
    quickWeather:     '🌦 मौसम',
    quickCrop:        '🌱 फसल सलाह',
    quickMarket:      '💰 मंडी भाव',
    quickPest:        '🐛 कीट नियंत्रण',
    quickScan:        '📷 फसल स्कैन',
    awaitingCity:     '🌍 ज़रूर! आप किस शहर या जिले में हैं?\n\nशहर का नाम लिखें — जैसे: हैदराबाद, वारंगल, निज़ामाबाद',
    scanTitle:        'फसल रोग स्कैनर',
    scanSubtitle:     'रोग तुरंत पहचानने के लिए अपनी फसल की फोटो अपलोड करें',
    dropText:         'फोटो अपलोड करने के लिए टैप करें',
    dropHint:         'JPG, PNG — अधिकतम 5MB',
    scanTipsTitle:    '📸 बेहतर परिणाम के लिए फोटो टिप्स:',
    tip1:             'प्रभावित पत्ते या तने की क्लोज़-अप फोटो लें',
    tip2:             'अच्छी रोशनी में फोटो लें — छाया से बचें',
    tip3:             'सबसे ज्यादा प्रभावित हिस्से पर फोकस करें',
    tip4:             'धुंधली या अंधेरे में ली गई फोटो न डालें',
    analyzeBtn:       '🔬 फसल की जांच करें',
    analyzingBtn:     'जांच हो रही है...',
    clearBtn:         '🗑 हटाएं',
  },
  te: {
    headerTitle:      'రైతు సహాయకుడు',
    headerSubtitle:   'మీ స్మార్ట్ వ్యవసాయ మార్గదర్శి',
    welcomeMsg:       'నమస్కారం రైతు అన్నా! 👋 వాతావరణం, పంట సలహా, మండీ ధరలు మరియు పురుగు నియంత్రణలో సహాయం చేయగలను. ఈరోజు ఏమి కావాలి?',
    inputPlaceholder: 'మీ ప్రశ్న ఇక్కడ టైప్ చేయండి...',
    sendBtn:          'పంపండి ➤',
    quickWeather:     '🌦 వాతావరణం',
    quickCrop:        '🌱 పంట సలహా',
    quickMarket:      '💰 మండీ ధర',
    quickPest:        '🐛 పురుగు నియంత్రణ',
    quickScan:        '📷 పంట స్కాన్',
    awaitingCity:     '🌍 సరే! మీరు ఏ నగరంలో లేదా జిల్లాలో ఉన్నారు?\n\nనగరం పేరు టైప్ చేయండి — ఉదాహరణ: హైదరాబాద్, వరంగల్, నిజామాబాద్',
    scanTitle:        'పంట వ్యాధి స్కానర్',
    scanSubtitle:     'వ్యాధిని తక్షణం గుర్తించడానికి మీ పంట ఫోటో అప్‌లోడ్ చేయండి',
    dropText:         'ఫోటో అప్‌లోడ్ చేయడానికి టాప్ చేయండి',
    dropHint:         'JPG, PNG — గరిష్టంగా 5MB',
    scanTipsTitle:    '📸 మంచి ఫలితాల కోసం ఫోటో చిట్కాలు:',
    tip1:             'సోకిన ఆకు లేదా కాండం క్లోజ్-అప్ తీయండి',
    tip2:             'మంచి వెలుతురులో తీయండి — నీడ వద్దు',
    tip3:             'ఎక్కువ సోకిన ప్రాంతంపై దృష్టి పెట్టండి',
    tip4:             'మసకగా లేదా చీకటిలో తీసిన ఫోటోలు వద్దు',
    analyzeBtn:       '🔬 పంట విశ్లేషణ చేయండి',
    analyzingBtn:     'విశ్లేషిస్తోంది...',
    clearBtn:         '🗑 తొలగించు',
  }
};

// ── APPLY LANGUAGE TO UI ──────────────────────────────────────
function updateUILanguage(lang) {
  const t = uiTranslations[lang];
  if (!t) return;

  // Header
  document.querySelector('.header-title').textContent    = t.headerTitle;
  document.querySelector('.header-subtitle').textContent = t.headerSubtitle;

  // Input placeholder & send button
  document.getElementById('userInput').placeholder     = t.inputPlaceholder;
  document.querySelector('.send-btn').textContent      = t.sendBtn;

  // Quick reply buttons
  const btns = document.querySelectorAll('.quick-btn');
  if (btns[0]) btns[0].textContent = t.quickWeather;
  if (btns[1]) btns[1].textContent = t.quickCrop;
  if (btns[2]) btns[2].textContent = t.quickMarket;
  if (btns[3]) btns[3].textContent = t.quickPest;
  if (btns[4]) btns[4].textContent = t.quickScan;

  // Scan panel UI
  const scanTitle    = document.getElementById('scanTitle');
  const scanSubtitle = document.getElementById('scanSubtitle');
  const dropText     = document.getElementById('dropText');
  const dropHint     = document.getElementById('dropHint');
  const scanTipsTitle= document.getElementById('scanTipsTitle');
  const tip1         = document.getElementById('tip1');
  const tip2         = document.getElementById('tip2');
  const tip3         = document.getElementById('tip3');
  const tip4         = document.getElementById('tip4');
  const analyzeBtn   = document.getElementById('analyzeBtn');

  if (scanTitle)     scanTitle.textContent     = t.scanTitle;
  if (scanSubtitle)  scanSubtitle.textContent  = t.scanSubtitle;
  if (dropText)      dropText.textContent      = t.dropText;
  if (dropHint)      dropHint.textContent      = t.dropHint;
  if (scanTipsTitle) scanTipsTitle.textContent = t.scanTipsTitle;
  if (tip1)          tip1.textContent          = t.tip1;
  if (tip2)          tip2.textContent          = t.tip2;
  if (tip3)          tip3.textContent          = t.tip3;
  if (tip4)          tip4.textContent          = t.tip4;
  if (analyzeBtn && !analyzeBtn.disabled) analyzeBtn.textContent = t.analyzeBtn;
}