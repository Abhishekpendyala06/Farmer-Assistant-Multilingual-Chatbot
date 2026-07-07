// ╔══════════════════════════════════════════════════════════════╗
// ║     CROP DISEASE SCANNER — disease.js                       ║
// ║     Powered by PlantNet API (500 free/day)                  ║
// ╚══════════════════════════════════════════════════════════════╝

const CROP_HEALTH_API_URL = 'http://127.0.0.1:5001/api/disease';

let selectedImageBase64 = null;
let selectedImageFile   = null;

// ── OPEN / CLOSE SCAN PANEL ───────────────────────────────────
function openScanPanel() {
  const panel = document.getElementById('scanPanel');
  panel.classList.add('active');
  panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function closeScanPanel() {
  document.getElementById('scanPanel').classList.remove('active');
  clearScan();
}

// ── DRAG & DROP ───────────────────────────────────────────────
function handleImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  processImageFile(file);
}

function handleDragOver(event) {
  event.preventDefault();
  document.getElementById('dropZone').classList.add('dragover');
}

function handleDragLeave(event) {
  document.getElementById('dropZone').classList.remove('dragover');
}

function handleDrop(event) {
  event.preventDefault();
  document.getElementById('dropZone').classList.remove('dragover');
  const file = event.dataTransfer.files[0];
  if (file && file.type.startsWith('image/')) processImageFile(file);
}

function processImageFile(file) {
  if (file.size > 5 * 1024 * 1024) {
    alert('Image too large. Please use an image under 5MB.');
    return;
  }

  selectedImageFile = file;
  const reader = new FileReader();

  reader.onload = (e) => {
    selectedImageBase64 = e.target.result.split(',')[1];

    const preview = document.getElementById('previewImage');
    preview.src = e.target.result;
    preview.style.display = 'block';

    document.getElementById('dropZoneContent').style.display = 'none';
    document.getElementById('scanActions').style.display     = 'flex';
    document.getElementById('scanTips').style.display        = 'none';

    openScanPanel();
  };

  reader.readAsDataURL(file);
}

// ── CLEAR SCAN ────────────────────────────────────────────────
function clearScan() {
  selectedImageBase64 = null;
  selectedImageFile   = null;

  const preview = document.getElementById('previewImage');
  preview.src = '';
  preview.style.display = 'none';

  document.getElementById('dropZoneContent').style.display = 'flex';
  document.getElementById('scanActions').style.display     = 'none';
  document.getElementById('scanTips').style.display        = 'block';
  document.getElementById('cropImageInput').value          = '';

  const btn    = document.getElementById('analyzeBtn');
  btn.disabled  = false;
  btn.innerHTML = '🔬 Analyze Crop';
}

// ── ANALYZE CROP ──────────────────────────────────────────────
async function analyzeCrop() {
  if (!selectedImageBase64) return;

  const btn    = document.getElementById('analyzeBtn');
  btn.disabled  = true;
  btn.innerHTML = '<span class="analyzing-spinner"></span> Analyzing...';

  try {
    const response = await fetch(CROP_HEALTH_API_URL, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({
        image:    selectedImageBase64,
        language: currentLanguage
      })
    });

    const data = await response.json();
    closeScanPanel();

    if (!data.success) {
      addMessage(getErrorMessage(data.error, currentLanguage), 'bot');
      return;
    }

    displayDiseaseResult(data);

  } catch (err) {
    console.error('Disease analysis error:', err);
    closeScanPanel();
    addMessage(getNetworkErrorMessage(currentLanguage), 'bot');
  } finally {
    btn.disabled  = false;
    btn.innerHTML = '🔬 Analyze Crop';
  }
}

// ── DISPLAY RESULTS ───────────────────────────────────────────
function displayDiseaseResult(data) {
  const lang      = currentLanguage;
  const plantName = data.plant || '';
  const score     = data.score || 0;

  // ── Plant identified header ──
  if (plantName && plantName !== 'Unknown Plant') {
    const plantMsg = lang === 'hi'
      ? `🌿 पहचानी गई फसल: ${plantName} (${score}% सटीकता)`
      : lang === 'te'
        ? `🌿 గుర్తించిన పంట: ${plantName} (${score}% ఖచ్చితత్వం)`
        : `🌿 Plant Identified: ${plantName} (${score}% confidence)`;
    addMessage(plantMsg, 'bot');
  }

  // ── Healthy crop ──
  if (data.healthy === true) {
    addMessage(getHealthyMessage(lang, plantName), 'bot');
    return;
  }

  const diseases = data.diseases || [];

  if (diseases.length === 0) {
    addMessage(getNoResultMessage(lang), 'bot');
    return;
  }

  // ── Top disease ──
  const top         = diseases[0];
  const name        = top.name        || 'Unknown Disease';
  const probability = `${top.probability || 0}%`;
  const description = top.description || '';
  const bio         = (top.treatment?.biological || []).join('\n• ');
  const chem        = (top.treatment?.chemical   || []).join('\n• ');
  const prevention  = (top.treatment?.prevention || []).join('\n• ');

  addMessage(
    formatDiseaseMessage(name, probability, description, bio, chem, prevention, lang),
    'bot'
  );

  // ── Other possible diseases ──
  if (diseases.length > 1) {
    const others = diseases.slice(1).map(d => `• ${d.name} (${d.probability || 0}%)`).join('\n');
    const otherMsg = lang === 'hi'
      ? `📋 अन्य संभावित रोग:\n${others}`
      : lang === 'te'
        ? `📋 ఇతర సాధ్యమైన వ్యాధులు:\n${others}`
        : `📋 Other possible issues detected:\n${others}`;
    addMessage(otherMsg, 'bot');
  }
}

// ── MESSAGE FORMATTERS ────────────────────────────────────────
function formatDiseaseMessage(name, prob, desc, bio, chem, prev, lang) {
  if (lang === 'hi') {
    return `🔬 फसल रोग विश्लेषण परिणाम\n\n` +
           `🦠 रोग का नाम : ${name}\n` +
           `📊 संभावना    : ${prob}\n\n` +
           (desc ? `📝 विवरण:\n${desc}\n\n` : '') +
           (bio  ? `🌿 जैविक उपचार:\n• ${bio}\n\n` : '') +
           (chem ? `💊 रासायनिक उपचार:\n• ${chem}\n\n` : '') +
           (prev ? `🛡 रोकथाम:\n• ${prev}\n\n` : '') +
           `⚠️ गंभीर मामलों में नजदीकी KVK से संपर्क करें।`;
  }
  if (lang === 'te') {
    return `🔬 పంట వ్యాధి విశ్లేషణ ఫలితం\n\n` +
           `🦠 వ్యాధి పేరు  : ${name}\n` +
           `📊 సంభావ్యత    : ${prob}\n\n` +
           (desc ? `📝 వివరణ:\n${desc}\n\n` : '') +
           (bio  ? `🌿 జీవ చికిత్స:\n• ${bio}\n\n` : '') +
           (chem ? `💊 రసాయన చికిత్స:\n• ${chem}\n\n` : '') +
           (prev ? `🛡 నివారణ:\n• ${prev}\n\n` : '') +
           `⚠️ తీవ్రమైన సందర్భాల్లో దగ్గరలోని KVK ని సంప్రదించండి.`;
  }
  return `🔬 Crop Disease Analysis Result\n\n` +
         `🦠 Disease Detected : ${name}\n` +
         `📊 Confidence       : ${prob}\n\n` +
         (desc ? `📝 Description:\n${desc}\n\n` : '') +
         (bio  ? `🌿 Organic Treatment:\n• ${bio}\n\n` : '') +
         (chem ? `💊 Chemical Treatment:\n• ${chem}\n\n` : '') +
         (prev ? `🛡 Prevention:\n• ${prev}\n\n` : '') +
         `⚠️ For severe cases contact your nearest KVK immediately.`;
}

function getHealthyMessage(lang, plant) {
  const p = plant ? ` (${plant})` : '';
  if (lang === 'hi') return `✅ अच्छी खबर! आपकी फसल${p} स्वस्थ दिखती है।\n\nकोई रोग या कीट समस्या नहीं मिली।\n\n💡 स्वस्थ फसल बनाए रखने के लिए:\n• नियमित सिंचाई करें\n• सही समय पर खाद डालें\n• फसल की नियमित निगरानी करें`;
  if (lang === 'te') return `✅ శుభవార్త! మీ పంట${p} ఆరోగ్యంగా కనిపిస్తోంది.\n\nఏ వ్యాధి లేదా పురుగు సమస్య కనుగొనబడలేదు.\n\n💡 మంచి పంట ఆరోగ్యం కాపాడుకోవడానికి:\n• క్రమంగా నీరు పెట్టండి\n• సరైన సమయంలో ఎరువులు వేయండి\n• పంటను క్రమంగా పరిశీలించండి`;
  return `✅ Great news! Your crop${p} looks healthy.\n\nNo disease or pest issues detected.\n\n💡 To maintain good crop health:\n• Water regularly\n• Apply fertilizers on time\n• Monitor your crop weekly`;
}

function getNoResultMessage(lang) {
  if (lang === 'hi') return `⚠️ रोग की पहचान नहीं हो सकी।\n\nकृपया:\n• बेहतर रोशनी में फोटो लें\n• प्रभावित पत्ते की क्लोज़-अप फोटो लें\n• साफ, फोकस्ड फोटो अपलोड करें\n\nया लक्षण टाइप करें — मैं मदद करूंगा!`;
  if (lang === 'te') return `⚠️ వ్యాధిని గుర్తించలేకపోయాం.\n\nదయచేసి:\n• మంచి వెలుతురులో ఫోటో తీయండి\n• సోకిన ఆకు క్లోజ్-అప్ తీయండి\n• స్పష్టమైన ఫోటో అప్‌లోడ్ చేయండి\n\nలేదా లక్షణాలు టైప్ చేయండి!`;
  return `⚠️ Could not detect any disease.\n\nPlease:\n• Take photo in good lighting\n• Take a close-up of the affected leaf or stem\n• Upload a clear, focused photo\n\nOr type your symptoms — I can still help!`;
}

function getErrorMessage(error, lang) {
  if (lang === 'hi') return `⚠️ ${error || 'विश्लेषण में समस्या आई।'}\n\nया लक्षण टाइप करें — मैं मदद करूंगा!`;
  if (lang === 'te') return `⚠️ ${error || 'విశ్లేషణలో సమస్య వచ్చింది.'}\n\nలేదా లక్షణాలు టైప్ చేయండి!`;
  return `⚠️ ${error || 'Analysis failed.'}\n\nOr type your symptoms — I can still help!`;
}

function getNetworkErrorMessage(lang) {
  if (lang === 'hi') return '⚠️ बैकएंड सर्वर से कनेक्ट नहीं हो पाया।\n\nटर्मिनल में चलाएं: python3 server.py\n\nया लक्षण टाइप करें!';
  if (lang === 'te') return '⚠️ బ్యాకెండ్ సర్వర్‌కు కనెక్ట్ అవ్వలేదు.\n\nటెర్మినల్‌లో రన్ చేయండి: python3 server.py\n\nలేదా లక్షణాలు టైప్ చేయండి!';
  return '⚠️ Could not connect to backend server.\n\nMake sure to run: python3 server.py\n\nOr type your symptoms — I can still help!';
}