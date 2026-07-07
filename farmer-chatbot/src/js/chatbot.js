// ╔══════════════════════════════════════════════════════════════╗
// ║           FARMER ASSISTANT CHATBOT — MAIN ENGINE            ║
// ║     Multilingual | Weather | Crops | Market | Pest | Voice  ║
// ╚══════════════════════════════════════════════════════════════╝

// ── GLOBAL STATE ──────────────────────────────────────────────
let currentLanguage = 'en';
let responses       = {};
let wizardActive    = false;
let wizardStep      = 0;
let wizardData      = { water: '', season: '' };
let recognition     = null;
let isListening     = false;

const BACKEND_URL = 'http://127.0.0.1:5001';

// ── STATIC MSP DATA (2024-25) ─────────────────────────────────
const STATIC_MSP = {
  paddy:     { price: '2,183', note: 'Common Grade | Grade A: ₹2,203' },
  wheat:     { price: '2,275', note: '' },
  maize:     { price: '2,090', note: '' },
  cotton:    { price: '7,521', note: 'Long Staple | Medium: ₹7,121' },
  soybean:   { price: '4,892', note: '' },
  groundnut: { price: '6,783', note: '' },
  mustard:   { price: '5,950', note: '' },
  arhar:     { price: '7,550', note: 'Tur/Red Gram' },
  moong:     { price: '8,682', note: 'Green Gram' },
  urad:      { price: '7,400', note: 'Black Gram' },
  bajra:     { price: '2,625', note: 'Pearl Millet' },
  jowar:     { price: '3,371', note: 'Hybrid Sorghum' },
  sunflower: { price: '7,280', note: '' },
  chickpea:  { price: '5,440', note: 'Gram/Chana' },
  barley:    { price: '1,735', note: '' },
};

const NO_MSP_CROPS = ['onion', 'tomato', 'potato', 'chilli', 'turmeric'];

// ── CROP DICTIONARY (longest match wins) ──────────────────────
const CROP_DICT = Object.entries({
  'pearl millet': 'bajra', 'green gram': 'moong', 'black gram': 'urad',
  'groundnut': 'groundnut', 'sunflower': 'sunflower', 'sorghum': 'jowar',
  'chickpea': 'chickpea', 'mustard': 'mustard', 'soybean': 'soybean',
  'turmeric': 'turmeric', 'cotton': 'cotton', 'potato': 'potato',
  'tomato': 'tomato', 'chilli': 'chilli', 'barley': 'barley',
  'maize': 'maize', 'moong': 'moong', 'onion': 'onion',
  'wheat': 'wheat', 'paddy': 'paddy', 'bajra': 'bajra',
  'jowar': 'jowar', 'urad': 'urad', 'corn': 'maize',
  'rice': 'paddy', 'tur': 'arhar', 'toor': 'arhar', 'arhar': 'arhar',
  'gram': 'chickpea', 'soya': 'soybean', 'haldi': 'turmeric',
  'mirchi': 'chilli', 'kapas': 'cotton', 'sarson': 'mustard',
  'gehun': 'wheat', 'gehu': 'wheat', 'aloo': 'potato',
  'pyaz': 'onion', 'makka': 'maize', 'dhaan': 'paddy', 'chana': 'chickpea',
  'मूंगफली': 'groundnut', 'सूरजमुखी': 'sunflower', 'सोयाबीन': 'soybean',
  'टमाटर': 'tomato', 'कपास': 'cotton', 'सरसों': 'mustard',
  'अरहर': 'arhar', 'बाजरा': 'bajra', 'ज्वार': 'jowar',
  'गेहूं': 'wheat', 'धान': 'paddy', 'मक्का': 'maize',
  'प्याज': 'onion', 'आलू': 'potato', 'मूंग': 'moong',
  'उड़द': 'urad', 'चना': 'chickpea',
  'మొక్కజొన్న': 'maize', 'బంగాళాదుంప': 'potato', 'వేరుశనగ': 'groundnut',
  'పొద్దుతిరుగుడు': 'sunflower', 'సోయాబీన్': 'soybean', 'కందులు': 'arhar',
  'మినుము': 'urad', 'గోధుమ': 'wheat', 'పత్తి': 'cotton',
  'ఆవాలు': 'mustard', 'టమాటో': 'tomato', 'పెసర': 'moong',
  'ఉల్లి': 'onion', 'సజ్జ': 'bajra', 'జొన్న': 'jowar',
  'పసుపు': 'turmeric', 'మిర్చి': 'chilli', 'శనగ': 'chickpea', 'వరి': 'paddy',
}).sort((a, b) => b[0].length - a[0].length);

// ── PRICE TRIGGERS ────────────────────────────────────────────
const PRICE_TRIGGERS = [
  'live price', 'today price', 'current price', 'mandi price',
  'market price', 'price today', 'rate today', 'what is the price',
  'tell me the price', 'how much is', 'bhav', 'daam', 'rate',
  'आज का भाव', 'आज भाव', 'मंडी भाव', 'आज का दाम', 'भाव बताओ',
  'నేటి ధర', 'మండీ ధర', 'ధర చెప్పండి', 'ఈరోజు ధర', 'ధర ఎంత',
];

// ── VOICE LANGUAGE MAP ────────────────────────────────────────
const VOICE_LANG_MAP = { en: 'en-IN', hi: 'hi-IN', te: 'te-IN' };

// ── INITIALISE ────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', async () => {
  await loadResponses('en');
  updateUILanguage('en');
  showChatDate();
  initVoice();
});

async function loadResponses(lang) {
  const res = await fetch(`src/data/responses_${lang}.json`);
  responses = await res.json();
}

// ══════════════════════════════════════════════════════════════
//  VOICE ASSISTANT
// ══════════════════════════════════════════════════════════════
function initVoice() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    // Hide voice button if browser doesn't support it
    const btn = document.getElementById('voiceBtn');
    if (btn) btn.style.display = 'none';
    return;
  }

  recognition = new SpeechRecognition();
  recognition.continuous    = false;
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;

  // Show interim results in input box as user speaks
  recognition.onresult = (event) => {
    const input = document.getElementById('userInput');
    let transcript = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript;
    }
    input.value = transcript;

    // If final result — auto send
    if (event.results[event.results.length - 1].isFinal) {
      stopVoice();
      if (transcript.trim()) {
        setTimeout(() => sendMessage(), 300);
      }
    }
  };

  recognition.onerror = (event) => {
    console.error('Voice error:', event.error);
    stopVoice();
    const errors = {
      'not-allowed': '🎤 Microphone access denied. Please allow microphone in browser settings.',
      'no-speech':   '🎤 No speech detected. Please try again.',
      'network':     '🎤 Network error. Please check your connection.',
    };
    const msg = errors[event.error] || '🎤 Voice recognition error. Please try again.';
    addMessage(msg, 'bot');
  };

  recognition.onend = () => {
    if (isListening) stopVoice();
  };
}

function toggleVoice() {
  if (isListening) {
    stopVoice();
  } else {
    startVoice();
  }
}

function startVoice() {
  if (!recognition) {
    addMessage('🎤 Voice input is not supported in this browser. Please use Chrome or Edge.', 'bot');
    return;
  }

  // Set language based on current selection
  recognition.lang = VOICE_LANG_MAP[currentLanguage] || 'en-IN';

  try {
    recognition.start();
    isListening = true;

    // Update UI
    const btn    = document.getElementById('voiceBtn');
    const status = document.getElementById('voiceStatus');
    if (btn)    btn.classList.add('listening');
    if (status) status.style.display = 'flex';

    // Update status text per language
    const statusText = document.getElementById('voiceStatusText');
    if (statusText) {
      statusText.textContent = currentLanguage === 'hi'
        ? 'सुन रहा हूं... बोलें'
        : currentLanguage === 'te'
          ? 'వింటున్నాను... మాట్లాడండి'
          : 'Listening... speak now';
    }

    // Clear input for fresh voice input
    document.getElementById('userInput').value = '';

  } catch (err) {
    console.error('Voice start error:', err);
    stopVoice();
  }
}

function stopVoice() {
  isListening = false;
  if (recognition) {
    try { recognition.stop(); } catch (_) {}
  }

  // Reset UI
  const btn    = document.getElementById('voiceBtn');
  const status = document.getElementById('voiceStatus');
  if (btn)    btn.classList.remove('listening');
  if (status) status.style.display = 'none';
}

// ══════════════════════════════════════════════════════════════
//  INTENT DETECTION
// ══════════════════════════════════════════════════════════════
function detectIntent(message) {
  const msg     = message.toLowerCase();
  const intents = ['weather', 'crop', 'market', 'pest', 'greeting'];
  let bestIntent = 'fallback';
  let bestScore  = 0;

  for (const intent of intents) {
    const keywords = responses[intent]?.keywords || [];
    let score = 0;
    for (const kw of keywords) {
      if (msg.includes(kw.toLowerCase())) score += kw.length;
    }
    if (score > bestScore) { bestScore = score; bestIntent = intent; }
  }
  return bestIntent;
}

function getResponse(intent, userMessage) {
  const msg = userMessage.toLowerCase();
  if (intent === 'fallback') {
    const arr = responses.fallback;
    return arr[Math.floor(Math.random() * arr.length)];
  }
  const intentData = responses[intent];
  if (intentData?.rules) {
    for (const rule of intentData.rules) {
      for (const trigger of rule.triggers) {
        if (msg.includes(trigger.toLowerCase())) return rule.response;
      }
    }
  }
  const arr = intentData?.responses || responses.fallback;
  return arr[Math.floor(Math.random() * arr.length)];
}

function isWizardTrigger(text) {
  const msg = text.toLowerCase().trim();
  const triggers = [
    'suggest me a crop', 'suggest crop', 'crop wizard',
    'help me choose crop', 'which crop should i grow',
    'which crop to grow', 'what crop should i grow',
    'help me pick a crop', 'recommend a crop',
    'crop suggestion', 'crop recommend',
    'कौन सी फसल बोएं', 'कौनसी फसल', 'फसल बताओ',
    'फसल सुझाव', 'कौन सी फसल',
    'ఏ పంట వేయాలి', 'పంట సూచించండి',
    'పంట చెప్పండి', 'ఏ పంట సూచిస్తారు',
  ];
  return triggers.some(t => msg.includes(t.toLowerCase()));
}

function extractCropForPrice(text) {
  const msg = text.toLowerCase();
  const hasPriceWord = PRICE_TRIGGERS.some(k => msg.includes(k));
  if (!hasPriceWord) return null;
  for (const [name, englishCrop] of CROP_DICT) {
    const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex   = new RegExp(`(?:^|[^a-zA-Z\u0900-\u097F\u0C00-\u0C7F])${escaped}(?:[^a-zA-Z\u0900-\u097F\u0C00-\u0C7F]|$)`, 'i');
    if (regex.test(msg)) return englishCrop;
  }
  return null;
}

// ── LIVE PRICE FETCHER ────────────────────────────────────────
async function fetchLivePrice(crop, lang) {
  try {
    const res  = await fetch(`${BACKEND_URL}/api/price?crop=${crop}&state=Telangana`, { signal: AbortSignal.timeout(6000) });
    const data = await res.json();
    if (data.success && data.live && data.results?.length > 0) return formatLivePrice(data, lang);
    if (data.success && !data.live && data.msp) return formatMSPPrice(data.commodity, data.msp, data.note, data.message, lang);
    if (!data.success) return formatStaticMSP(crop, lang);
  } catch (_) {}
  return formatStaticMSP(crop, lang);
}

function formatLivePrice(data, lang) {
  const r = data.results[0];
  const name = data.commodity;
  if (lang === 'hi') {
    return `📊 ${name} — आज का लाइव मंडी भाव\n\n🏪 मंडी: ${r.market}, ${r.district}\n📅 तारीख: ${r.date}\n\n💰 न्यूनतम भाव : ₹${r.min_price}/क्विंटल\n💰 अधिकतम भाव : ₹${r.max_price}/क्विंटल\n💰 सामान्य भाव : ₹${r.modal_price}/क्विंटल\n\n📌 स्रोत: Agmarknet — भारत सरकार\n💡 हमेशा MSP पर या उससे ऊपर बेचें।`;
  }
  if (lang === 'te') {
    return `📊 ${name} — నేటి లైవ్ మండీ ధర\n\n🏪 మండీ: ${r.market}, ${r.district}\n📅 తేదీ: ${r.date}\n\n💰 కనిష్ట ధర  : ₹${r.min_price}/క్వింటల్\n💰 గరిష్ట ధర  : ₹${r.max_price}/క్వింటల్\n💰 సాధారణ ధర : ₹${r.modal_price}/క్వింటల్\n\n📌 మూలం: Agmarknet — భారత ప్రభుత్వం\n💡 MSP కంటే తక్కువ ధరకు అమ్మవద్దు.`;
  }
  return `📊 ${name} — Today's Live Mandi Price\n\n🏪 Market : ${r.market}, ${r.district}\n📅 Date   : ${r.date}\n\n💰 Min Price   : ₹${r.min_price}/quintal\n💰 Max Price   : ₹${r.max_price}/quintal\n💰 Modal Price : ₹${r.modal_price}/quintal\n\n📌 Source: Agmarknet — Government of India\n💡 Always sell at or above MSP.`;
}

function formatMSPPrice(commodity, msp, note, message, lang) {
  const n = note ? ` (${note})` : '';
  if (lang === 'hi') return `💰 ${commodity} — सरकारी MSP 2024-25\n\n🏛 न्यूनतम समर्थन मूल्य : ₹${msp}/क्विंटल${n}\n\n⚠️ ${message}\n\n📊 लाइव भाव देखें : agmarknet.gov.in\n💡 MSP से कम दाम पर कभी न बेचें।`;
  if (lang === 'te') return `💰 ${commodity} — ప్రభుత్వ MSP 2024-25\n\n🏛 కనీస మద్దతు ధర : ₹${msp}/క్వింటల్${n}\n\n⚠️ ${message}\n\n📊 లైవ్ ధరలు చూడండి : agmarknet.gov.in\n💡 MSP కంటే తక్కువ ధరకు అమ్మవద్దు.`;
  return `💰 ${commodity} — Government MSP 2024-25\n\n🏛 Minimum Support Price : ₹${msp}/quintal${n}\n\n⚠️ ${message}\n\n📊 Check live prices : agmarknet.gov.in\n💡 Never sell below MSP.`;
}

function formatStaticMSP(crop, lang) {
  const cropLabel = crop.charAt(0).toUpperCase() + crop.slice(1);
  if (NO_MSP_CROPS.includes(crop)) {
    if (lang === 'hi') return `📊 ${cropLabel} पर कोई MSP नहीं है — दाम बाजार पर निर्भर।\n\n📱 लाइव भाव के लिए:\n• agmarknet.gov.in\n• किसान सुविधा ऐप\n\n💡 ग्रेडिंग करें और FPO से जुड़ें — बेहतर दाम मिलेगा।`;
    if (lang === 'te') return `📊 ${cropLabel} కు MSP లేదు — ధర మార్కెట్‌పై ఆధారపడుతుంది.\n\n📱 లైవ్ ధరల కోసం:\n• agmarknet.gov.in\n• కిసాన్ సువిధా యాప్\n\n💡 గ్రేడింగ్ చేయండి మరియు FPO లో చేరండి — మంచి ధర వస్తుంది.`;
    return `📊 ${cropLabel} has no MSP — price is market-driven.\n\n📱 Check live prices at:\n• agmarknet.gov.in\n• Kisan Suvidha app\n\n💡 Grade your produce and join an FPO for better prices.`;
  }
  const msp = STATIC_MSP[crop];
  if (!msp) {
    if (lang === 'hi') return `⚠️ इस फसल का भाव अभी उपलब्ध नहीं। agmarknet.gov.in पर देखें।`;
    if (lang === 'te') return `⚠️ ఈ పంట ధర ఇప్పుడు అందుబాటులో లేదు. agmarknet.gov.in చూడండి.`;
    return `⚠️ Price not available for this crop. Visit agmarknet.gov.in`;
  }
  const note = msp.note ? `\n📝 Note: ${msp.note}` : '';
  if (lang === 'hi') return `💰 ${cropLabel} — सरकारी MSP 2024-25\n\n🏛 न्यूनतम समर्थन मूल्य : ₹${msp.price}/क्विंटल${note}\n\n⚠️ लाइव मंडी डेटा अभी उपलब्ध नहीं।\n📊 लाइव भाव : agmarknet.gov.in\n💡 MSP से कम दाम पर कभी न बेचें।`;
  if (lang === 'te') return `💰 ${cropLabel} — ప్రభుత్వ MSP 2024-25\n\n🏛 కనీస మద్దతు ధర : ₹${msp.price}/క్వింటల్${note}\n\n⚠️ లైవ్ మండీ డేటా ఇప్పుడు అందుబాటులో లేదు.\n📊 లైవ్ ధరలు : agmarknet.gov.in\n💡 MSP కంటే తక్కువ ధరకు అమ్మవద్దు.`;
  return `💰 ${cropLabel} — Government MSP 2024-25\n\n🏛 Minimum Support Price : ₹${msp.price}/quintal${note}\n\n⚠️ Live mandi data currently unavailable.\n📊 Check live prices : agmarknet.gov.in\n💡 Never sell below MSP.`;
}

// ── MESSAGE BUBBLE ────────────────────────────────────────────
let msgCounter = 0;

function addMessage(text, sender) {
  const chatWindow = document.getElementById('chatWindow');
  const msgDiv     = document.createElement('div');
  msgDiv.classList.add('message', sender === 'bot' ? 'bot-message' : 'user-message');
  const linkedText    = text.replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
  const formattedText = linkedText.replace(/\n/g, '<br>');
  const time          = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });

  if (sender === 'bot') {
    const id = 'msg-' + (++msgCounter);
    msgDiv.innerHTML = `
      <span class="bot-avatar">🌾</span>
      <div>
        <div class="message-bubble">${formattedText}</div>
        <div class="message-time">${time}</div>
        <div class="feedback-bar" id="fb-${id}">
          <button class="feedback-btn" onclick="giveFeedback('${id}', 'up')" title="Helpful">👍</button>
          <button class="feedback-btn" onclick="giveFeedback('${id}', 'down')" title="Not helpful">👎</button>
        </div>
      </div>`;
  } else {
    msgDiv.innerHTML = `
      <div>
        <div class="message-bubble">${formattedText}</div>
        <div class="message-time">${time}</div>
      </div>`;
  }

  chatWindow.appendChild(msgDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// ── FEEDBACK HANDLER ──────────────────────────────────────────
function giveFeedback(id, type) {
  const bar  = document.getElementById('fb-' + id);
  if (!bar) return;
  const lang = currentLanguage;
  const thanks = {
    up:   { en: 'Thanks for your feedback! 😊', hi: 'प्रतिक्रिया के लिए धन्यवाद! 😊', te: 'మీ అభిప్రాయానికి ధన్యవాదాలు! 😊' },
    down: { en: "Thanks! We'll improve this. 🙏", hi: 'धन्यवाद! हम इसे बेहतर बनाएंगे। 🙏', te: 'ధన్యవాదాలు! మేము దీన్ని మెరుగుపరుస్తాము. 🙏' }
  };
  bar.innerHTML = `<span class="feedback-thanks">${thanks[type][lang]}</span>`;
}
function showTyping() {
  const chatWindow = document.getElementById('chatWindow');
  const el = document.createElement('div');
  el.classList.add('message', 'bot-message');
  el.id = 'typingIndicator';
  el.innerHTML = `<span class="bot-avatar">🌾</span><div class="typing-dots"><span></span><span></span><span></span></div>`;
  chatWindow.appendChild(el);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function hideTyping() { document.getElementById('typingIndicator')?.remove(); }

// ── SEND MESSAGE ──────────────────────────────────────────────
async function sendMessage() {
  const input = document.getElementById('userInput');
  const text  = input.value.trim();
  if (!text) return;

  addMessage(text, 'user');
  input.value = '';
  showTyping();
  await sleep(800);
  hideTyping();

  if (wizardActive)        { await handleWizard(text); return; }
  if (window.awaitingCity) {
    window.awaitingCity = false;
    showTyping(); await sleep(1000); hideTyping();
    addMessage(await fetchWeatherInLanguage(text, currentLanguage), 'bot');
    return;
  }
  if (isWizardTrigger(text)) { startWizard(); return; }

  const cropForPrice = extractCropForPrice(text);
  if (cropForPrice) {
    showTyping(); await sleep(1000); hideTyping();
    addMessage(await fetchLivePrice(cropForPrice, currentLanguage), 'bot');
    return;
  }

  const intent = detectIntent(text);
  if (intent === 'weather') {
    const city = extractCity(text);
    if (city) { addMessage(await fetchWeatherInLanguage(city, currentLanguage), 'bot'); }
    else { addMessage(uiTranslations[currentLanguage].awaitingCity, 'bot'); window.awaitingCity = true; }
    return;
  }
  addMessage(getResponse(intent, text), 'bot');
}

// ── WEATHER ───────────────────────────────────────────────────
async function fetchWeatherInLanguage(cityName, lang) {
  try {
    const res  = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName},IN&appid=${WEATHER_API_KEY}&units=metric`);
    const data = await res.json();
    if (data.cod !== 200) {
      if (lang === 'hi') return `❌ "${cityName}" का मौसम नहीं मिला। शहर का नाम जांचें।`;
      if (lang === 'te') return `❌ "${cityName}" వాతావరణం దొరకలేదు. నగరం పేరు తనిఖీ చేయండి.`;
      return `❌ Weather not found for "${cityName}". Please check the city name.`;
    }
    return formatWeatherInLanguage(data, lang);
  } catch (_) {
    if (lang === 'hi') return '⚠️ मौसम नहीं मिल पा रहा। इंटरनेट जांचें।';
    if (lang === 'te') return '⚠️ వాతావరణం తీసుకోలేకపోతున్నాం. ఇంటర్నెట్ తనిఖీ చేయండి.';
    return '⚠️ Unable to fetch weather. Check your internet connection.';
  }
}

function formatWeatherInLanguage(data, lang) {
  const temp = Math.round(data.main.temp), feels = Math.round(data.main.feels_like);
  const humidity = data.main.humidity, wind = Math.round(data.wind.speed * 3.6);
  const desc = data.weather[0].description, city = data.name;
  const icon = getWeatherEmoji(data.weather[0].main);
  const advice = getFarmingAdviceInLanguage(data, lang);
  if (lang === 'hi') return `${icon} ${city} में अभी मौसम\n\n🌡 तापमान  : ${temp}°C (महसूस ${feels}°C)\n💧 नमी      : ${humidity}%\n💨 हवा       : ${wind} किमी/घंटा\n🌤 स्थिति  : ${desc}\n\n👨‍🌾 खेती सलाह:\n${advice}`;
  if (lang === 'te') return `${icon} ${city} లో ఇప్పుడు వాతావరణం\n\n🌡 ఉష్ణోగ్రత : ${temp}°C (అనుభవం ${feels}°C)\n💧 తేమ        : ${humidity}%\n💨 గాలి        : ${wind} కి.మీ/గంట\n🌤 స్థితి     : ${desc}\n\n👨‍🌾 వ్యవసాయ సలహా:\n${advice}`;
  return `${icon} Weather in ${city} right now\n\n🌡 Temperature : ${temp}°C (feels ${feels}°C)\n💧 Humidity    : ${humidity}%\n💨 Wind        : ${wind} km/h\n🌤 Condition   : ${desc}\n\n👨‍🌾 Farming Advice:\n${advice}`;
}

function getFarmingAdviceInLanguage(data, lang) {
  const temp = data.main.temp, humidity = data.main.humidity;
  const wind = data.wind.speed * 3.6, main = data.weather[0].main.toLowerCase();
  const adv = { en: [], hi: [], te: [] };
  if (main.includes('rain') || main.includes('drizzle') || main.includes('thunderstorm')) {
    adv.en.push('🌧 Rain detected — avoid spraying pesticides or fertilizers today.');
    adv.en.push('💧 Check field drainage to prevent waterlogging.');
    adv.hi.push('🌧 बारिश — आज कीटनाशक या खाद न डालें।');
    adv.hi.push('💧 जलभराव से बचने के लिए जल निकासी जांचें।');
    adv.te.push('🌧 వర్షం — ఈరోజు పురుగుమందులు లేదా ఎరువులు వేయవద్దు.');
    adv.te.push('💧 నీరు నిలవకుండా కాలువలు తనిఖీ చేయండి.');
  }
  if (temp > 35) { adv.en.push('☀️ Very hot — irrigate early morning or after 6 PM only.'); adv.hi.push('☀️ बहुत गर्मी — सुबह जल्दी या शाम 6 बजे बाद सिंचाई करें।'); adv.te.push('☀️ చాలా వేడి — తెల్లవారు లేదా సాయంత్రం 6 తర్వాత నీరు పెట్టండి.'); }
  if (temp < 12) { adv.en.push('🧊 Cold — protect young seedlings from frost tonight.'); adv.hi.push('🧊 ठंड — छोटे पौधों को पाले से बचाएं।'); adv.te.push('🧊 చలి — చిన్న మొక్కలను మంచు నుండి రక్షించండి.'); }
  if (!main.includes('rain') && wind < 20 && temp >= 15 && temp <= 30) { adv.en.push('✅ Good conditions for spraying pesticides or fertilizers.'); adv.hi.push('✅ आज छिड़काव के लिए अच्छी स्थितियां हैं।'); adv.te.push('✅ ఈరోజు పిచికారీ చేయడానికి మంచి పరిస్థితులు.'); }
  if (wind > 30) { adv.en.push('💨 High winds — avoid spraying today.'); adv.hi.push('💨 तेज हवा — आज छिड़काव न करें।'); adv.te.push('💨 గాలి వేగంగా — ఈరోజు పిచికారీ వద్దు.'); }
  if (humidity > 80) { adv.en.push('🍄 High humidity — watch for fungal disease outbreaks.'); adv.hi.push('🍄 अधिक नमी — फफूंद रोगों पर नजर रखें।'); adv.te.push('🍄 తేమ ఎక్కువ — శిలీంద్ర వ్యాధులు రావచ్చు.'); }
  if (humidity < 30) { adv.en.push('🏜 Low humidity — increase irrigation today.'); adv.hi.push('🏜 नमी कम — आज सिंचाई बढ़ाएं।'); adv.te.push('🏜 తేమ తక్కువ — ఈరోజు నీటి సౌకర్యం పెంచండి.'); }
  const result = adv[lang]?.length ? adv[lang] : adv.en;
  if (result.length) return result.join('\n');
  if (lang === 'hi') return '✅ मौसम सामान्य है। सामान्य खेती के लिए अच्छा दिन।';
  if (lang === 'te') return '✅ వాతావరణం సాధారణంగా ఉంది. వ్యవసాయ పనులకు మంచి రోజు.';
  return '✅ Weather looks normal. Good day for regular farm activities.';
}

function getWeatherEmoji(condition) {
  const map = { Clear: '☀️', Clouds: '⛅', Rain: '🌧', Drizzle: '🌦', Thunderstorm: '⛈', Snow: '❄️', Mist: '🌫', Fog: '🌁', Haze: '🌫' };
  return map[condition] || '🌤';
}

function extractCity(message) {
  const msg = message.toLowerCase().trim();
  const cleaned = msg.replace(/[?!.,]/g, '');
  const cities = ['hyderabad','warangal','nizamabad','karimnagar','khammam','nalgonda','mahbubnagar','adilabad','medak','rangareddy','secunderabad','sangareddy','siddipet','suryapet','jagtial','delhi','mumbai','bangalore','chennai','kolkata','pune','ahmedabad','jaipur','lucknow','nagpur','visakhapatnam','vijayawada','guntur','tirupati','kurnool','rajahmundry','हैदराबाद','वारंगल','निजामाबाद','दिल्ली','मुंबई','హైదరాబాద్','వరంగల్','నిజామాబాద్','విజయవాడ'];
  for (const city of cities) { if (cleaned.includes(city)) return city; }
  const patterns = [/weather\s+(?:in|at|of|for)\s+([a-zA-Z]+)/i,/(?:in|at|for)\s+([a-zA-Z]+)\s+weather/i,/([a-zA-Z]+)\s+weather/i,/([a-zA-Z]+)\s+forecast/i,/(.+?)\s+(?:में|का|के)\s+मौसम/,/मौसम\s+(.+?)\s+(?:में|का)/,/(.+?)\s+(?:లో|లోని)\s+వాతావరణం/];
  for (const pattern of patterns) {
    const match = cleaned.match(pattern);
    if (match) { const c = match[1].trim().toLowerCase(); if (!['is','the','today','now','current','how','what','give','me','check','like','क्या','आज','अभी','ఈరోజు','ఇప్పుడు'].includes(c)) return c; }
  }
  return null;
}

// ── WIZARD ────────────────────────────────────────────────────
function startWizard() {
  wizardActive = true; wizardStep = 1; wizardData = { water: '', season: '' };
  addMessage(responses.wizard.start, 'bot');
}

// ── WIZARD ANSWER PARSER ─────────────────────────────────────
// Understands numbers, full option text, and keywords in all 3 languages
function parseWizardAnswer(input, step) {
  const msg = input.toLowerCase().trim();

  // Always accept plain number first
  const numMatch = msg.match(/\b([1-3])\b/);
  if (numMatch) return numMatch[1];

  if (step === 1) {
    if (/good|bore|canal|irrigat|नहर|बोरवेल|अच्छी सिंचाई|మంచి నీటి|బోర్‌వెల్|కాలువ/.test(msg)) return '1';
    if (/rain|only rain|बारिश|वर्षा|सिर्फ बारिश|వర్షపు నీరు|వర్షం మాత్రమే/.test(msg))           return '2';
    if (/limit|occasio|कम पानी|कभी|తక్కువ నీరు|అప్పుడప్పుడు/.test(msg))                          return '3';
  }

  if (step === 2) {
    if (/kharif|khariff|june|july|monsoon|खरीफ|जून|जुलाई|मानसून|ఖరీఫ్|జూన్|జూలై|మాన్సూన్/.test(msg)) return '1';
    if (/rabi|nov|dec|winter|रबी|नवंबर|दिसंबर|सर्दी|రబీ|నవంబర్|డిసెంబర్|శీతాకాల/.test(msg))            return '2';
    if (/summer|march|april|may|गर्मी|मार्च|अप्रैल|వేసవి|మార్చి|ఏప్రిల్/.test(msg))                     return '3';
  }

  if (step === 3) {
    if (/profit|cash|maximum|अधिकतम|मुनाफा|నఫా|అధిక లాభం|ఎక్కువ లాభం/.test(msg)) return '1';
    if (/family|food|sell|परिवार|खाना|కుటుంబం|ఆహారం|అమ్మకం/.test(msg))             return '2';
    if (/safe|less risk|risk|low|सुरक्षित|कम जोखिम|సురక్షితమైన|తక్కువ నష్టం/.test(msg)) return '3';
  }

  return null;
}

async function handleWizard(input) {
  const val = parseWizardAnswer(input, wizardStep);

  if (wizardStep === 1) {
    if (!val || !responses.wizard.water[val]) { addMessage(responses.wizard.start, 'bot'); return; }
    wizardData.water = responses.wizard.water[val]; wizardStep = 2;
    addMessage(responses.wizard.q2, 'bot'); return;
  }
  if (wizardStep === 2) {
    if (!val || !responses.wizard.season[val]) { addMessage(responses.wizard.q2, 'bot'); return; }
    wizardData.season = responses.wizard.season[val]; wizardStep = 3;
    addMessage(responses.wizard.q3, 'bot'); return;
  }
  if (wizardStep === 3) {
    if (!val) { addMessage(responses.wizard.q3, 'bot'); return; }
    wizardActive = false; wizardStep = 0;
    const key = `${wizardData.water}_${wizardData.season}_${val}`;
    try {
      const enData = await (await fetch('src/data/responses_en.json')).json();
      addMessage(enData.wizard.recommendations[key] || getResponse('crop', ''), 'bot');
    } catch (_) { addMessage(getResponse('crop', ''), 'bot'); }
  }
}

// ── UTILITIES ─────────────────────────────────────────────────
const sleep = ms => new Promise(r => setTimeout(r, ms));

function handleKey(event) { if (event.key === 'Enter') sendMessage(); }

function sendQuick(intent) {
  const labels = {
    en: { weather: 'What is the weather in Hyderabad today?', crop: 'suggest me a crop', market: 'What is the today price for wheat?', pest: 'My crop leaves are turning yellow.' },
    hi: { weather: 'हैदराबाद में आज मौसम कैसा है?', crop: 'कौन सी फसल बोएं', market: 'गेहूं का आज का मंडी भाव क्या है?', pest: 'मेरी फसल के पत्ते पीले हो रहे हैं।' },
    te: { weather: 'హైదరాబాద్‌లో ఈరోజు వాతావరణం ఎలా ఉంది?', crop: 'ఏ పంట వేయాలి', market: 'గోధుమ నేటి మండీ ధర ఎంత?', pest: 'నా పంట ఆకులు పసుపు పడుతున్నాయి.' },
  };
  document.getElementById('userInput').value = labels[currentLanguage][intent];
  sendMessage();
}

async function setLanguage(lang) {
  currentLanguage = lang;
  wizardActive = false; wizardStep = 0; wizardData = { water: '', season: '' };
  window.awaitingCity = false;
  stopVoice();
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
  await loadResponses(lang);
  updateUILanguage(lang);
  // Update voice recognition language
  if (recognition) recognition.lang = VOICE_LANG_MAP[lang] || 'en-IN';
  const chatWindow = document.getElementById('chatWindow');
  chatWindow.innerHTML = '';
  addMessage(uiTranslations[lang].welcomeMsg, 'bot');
}

function clearChat() {
  wizardActive = false; wizardStep = 0; wizardData = { water: '', season: '' };
  window.awaitingCity = false;
  stopVoice();
  const chatWindow = document.getElementById('chatWindow');
  chatWindow.innerHTML = '';
  addMessage(uiTranslations[currentLanguage].welcomeMsg, 'bot');
}

function showChatDate() {
  const el = document.getElementById('chatDate');
  if (!el) return;
  el.textContent = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}