<div align="center">

# 🌾 Farmer Assistant
### AI-Powered Multilingual Agricultural Advisory Chatbot

**Empowering 140 Million Indian Farmers with Artificial Intelligence**

[![Made with Python](https://img.shields.io/badge/Backend-Python%203.11%20%2B%20Flask-2e7d32?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![Frontend](https://img.shields.io/badge/Frontend-Vanilla%20JS%20%2B%20HTML5%20%2B%20CSS3-1565c0?style=for-the-badge&logo=javascript&logoColor=white)](https://developer.mozilla.org)
[![Languages](https://img.shields.io/badge/Languages-English%20%7C%20Hindi%20%7C%20Telugu-ff6f00?style=for-the-badge)](https://github.com)
[![License](https://img.shields.io/badge/License-MIT-4caf50?style=for-the-badge)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Production%20Ready-2e7d32?style=for-the-badge)](https://github.com)
[![Budget](https://img.shields.io/badge/Budget-%E2%82%B90%20%E2%80%94%20Free%20Forever-gold?style=for-the-badge)](https://github.com)

<br/>

> *"Real-time weather · Live mandi prices · AI disease detection · Voice input · In your language"*

<br/>

[🚀 Live Demo](#-live-demo) · [✨ Features](#-features) · [🏗 Architecture](#-architecture) · [⚙️ Installation](#%EF%B8%8F-installation) · [📖 Usage](#-usage) · [🔌 API Reference](#-api-reference) · [🛠 Tech Stack](#-tech-stack) · [📊 Screenshots](#-screenshots) · [🤝 Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

1. [Project Overview](#-project-overview)
2. [The Problem We Solve](#-the-problem-we-solve)
3. [Live Demo](#-live-demo)
4. [Features](#-features)
5. [Tech Stack](#-tech-stack)
6. [System Architecture](#-system-architecture)
7. [Project Structure](#-project-structure)
8. [Installation & Setup](#%EF%B8%8F-installation--setup)
9. [Running the Application](#-running-the-application)
10. [API Reference](#-api-reference)
11. [Knowledge Base Structure](#-knowledge-base-structure)
12. [AI & NLP Engine](#-ai--nlp-engine)
13. [Multilingual Support](#-multilingual-support)
14. [Disease Scanner](#-disease-scanner)
15. [Voice Assistant](#-voice-assistant)
16. [Market Price Module](#-market-price-module)
17. [Soil Health Calculator](#-soil-health-calculator)
18. [Dark Mode & UI Design](#-dark-mode--ui-design)
19. [PDF Export](#-pdf-export)
20. [Crop Wizard](#-crop-wizard)
21. [Environment Variables](#-environment-variables)
22. [Deployment](#-deployment)
23. [Known Limitations](#-known-limitations)
24. [Future Roadmap](#-future-roadmap)
25. [Challenges & Solutions](#-challenges--solutions)
26. [Contributing](#-contributing)
27. [License](#-license)
28. [Author](#-author)
29. [Acknowledgements](#-acknowledgements)

---

## 🌟 Project Overview

**Farmer Assistant** is a full-stack, production-grade AI chatbot built specifically for Indian farmers. It delivers intelligent agricultural advisory services — completely free — in three languages: **English, Hindi (हिंदी), and Telugu (తెలుగు)**.

The application was built in **15 working days** with a budget of **₹0**, using exclusively free tools, open-source libraries, and free API tiers. It demonstrates how cutting-edge AI technology can be made accessible to underserved rural communities without any financial investment.

### Key Highlights

| Metric | Value |
|--------|-------|
| 🌍 Languages Supported | 3 (English, Hindi, Telugu) |
| 🌾 Crops Covered | 20+ major Indian crops |
| 🦠 Diseases Detectable | 548 plant diseases (PlantNet AI) |
| 💰 Market Queries | 20+ crop price rules per language |
| 🌦 Weather Cities | 30+ Indian cities pre-configured |
| 🎯 Wizard Recommendations | 27 personalised crop suggestions |
| 🪴 Soil Parameters | pH, N, P, K, Organic Carbon |
| ⚡ Total Features | 32 complete features |
| 💸 Total Cost | ₹0 |
| 📅 Build Time | 15 working days |

---

## 🎯 The Problem We Solve

Indian farmers — particularly smallholder farmers in rural Telangana and Andhra Pradesh — face three critical information gaps that cost them money every single season:

### 1. 💰 Market Price Information Gap
Farmers sell their produce at harvest time without knowing real-time mandi prices. Without price information, they often accept 20–30% below market rate from local middlemen. **The MSP (Minimum Support Price) system exists to protect farmers, but most don't know the current rates.**

### 2. 🦠 Crop Disease Identification Gap
When a disease appears on crops, traditional expert visits take **days to weeks** and cost money most smallholder farmers cannot afford. By the time the disease is identified, it may have spread across the entire field. **Early detection saves crops — and livelihoods.**

### 3. 🗣 Language & Accessibility Gap
Agricultural advisory services, government websites, and farming apps are predominantly available in English. **The vast majority of Indian farmers speak Hindi or regional languages like Telugu.** Language barriers prevent access to critical farming information.

### Our Solution
Farmer Assistant bridges all three gaps through a single, conversational AI interface that farmers can access from any browser — **without installation, registration, or payment** — in their own language.

---

## 🚀 Live Demo

> 🌐 **[Try Farmer Assistant Live](https://yourusername.github.io/farmer-chatbot)**

### Quick Demo Scenarios

```
🌦 Weather:     "What is the weather in Hyderabad today?"
💰 Market:      "Today price for paddy"
🌱 Crop Wizard: "suggest me a crop"
🐛 Pest:        "My tomato leaves have brown spots"
🪴 Soil:        Click "Soil Health" → Enter NPK values
📷 Disease:     Click "Scan Crop" → Upload leaf photo
🎤 Voice:       Click 🎤 → Speak in English, Hindi or Telugu
```

---

## ✨ Features

### 🤖 Core AI & Chat
- **Intelligent Intent Detection** — Keyword-scoring NLP engine that classifies user messages into 5 intents: weather, crop, market, pest, greeting
- **Rule-Based Response System** — 200+ curated responses across 3 languages covering weather, crops, market, pest, and greeting scenarios
- **Fuzzy Fallback Handling** — Graceful fallback when intent is unclear, with helpful suggestions
- **Context-Aware Responses** — Different responses based on language, season, and user inputs
- **Typing Indicator** — Animated three-dot indicator while bot processes response
- **Message Timestamps** — Every message shows exact time sent
- **Feedback System** — 👍 👎 buttons on every bot response with multilingual thank-you messages
- **Clear Chat** — Full state reset including wizard, city await, and voice

### 🌦 Weather Module
- **Live Weather Data** — Real-time weather for any Indian city via OpenWeatherMap API
- **30+ Pre-configured Cities** — Hyderabad, Warangal, Nizamabad, Delhi, Mumbai, and more
- **Smart City Extraction** — Extracts city name from natural language in all 3 languages
- **Farming-Specific Advice** — Weather conditions mapped to specific farming actions:
  - Rain → Avoid pesticide spraying
  - High humidity → Watch for fungal diseases
  - Temperature > 35°C → Irrigate early morning only
  - Wind > 30 km/h → Avoid spraying
  - Low humidity → Increase irrigation frequency
- **Awaiting City Flow** — If no city mentioned, bot asks for city name and remembers context

### 💰 Market Price Module
- **Live Agmarknet Integration** — Real-time mandi prices from Government of India's data.gov.in
- **Static MSP Fallback** — Accurate 2024-25 Minimum Support Price data for 15 crops when live API unavailable
- **Smart Crop Extraction** — Longest-match algorithm prevents wrong crop detection (e.g., "rice" vs "price")
- **20+ Query Rules Per Language** — Natural language price queries in English, Hindi, and Telugu
- **Crop-Specific Selling Tips** — Best time to sell, storage advice, government procurement info
- **FPO & Export Guidance** — Information on Farmer Producer Organisations and export opportunities
- **Word-Boundary Regex Matching** — Prevents false positives in crop name detection

**Crops with MSP data:**
Paddy, Wheat, Maize, Cotton, Soybean, Groundnut, Mustard, Arhar/Tur, Moong, Urad, Bajra, Jowar, Sunflower, Chickpea, Barley, Sugarcane

### 🌱 Crop Wizard
- **3-Question Guided Flow** — Personalised crop recommendation based on:
  - Water availability (Irrigated / Rainfed / Limited)
  - Season (Kharif / Rabi / Summer)
  - Goal (Maximum profit / Family + selling / Safe low-risk)
- **27 Unique Recommendations** — Every combination of 3×3×3 gives a different answer
- **Smart Answer Parser** — Accepts answers in multiple formats:
  - Plain numbers: `1`, `2`, `3`
  - Full option text: `good irrigation`, `kharif season`, `maximum profit`
  - Keywords in all 3 languages: `बोरवेल`, `మంచి నీటి`, `rainfed`
- **Always reads English recommendations** — Wizard results fetched from English JSON regardless of language for consistency

### 🐛 Pest & Disease Guide
- **20+ Symptom-Based Rules** per language covering:
  - Yellow/brown leaves → Nitrogen deficiency, iron deficiency, mosaic virus
  - Wilting plants → Fusarium wilt, bacterial wilt, root knot nematode
  - Aphid infestations → Organic and chemical control methods
  - Whitefly attacks → Trap-based and chemical management
  - Fungal diseases → Blight, rust, powdery mildew, downy mildew
- **Organic Treatment Options** — Neem oil, Trichoderma, garlic-chilli spray for every pest
- **Chemical Treatment Options** — Specific chemical names with dosages
- **KVK Referral** — Serious cases redirected to nearest Krishi Vigyan Kendra

### 🔬 AI Crop Disease Scanner
- **Powered by PlantNet API** — French National Research Institute (INRAE) — 500 free calls/day
- **Two-Step AI Analysis:**
  1. Plant identification — Identifies crop species with confidence percentage
  2. Disease detection — Scans for 548 known plant diseases
- **Photo Upload Options** — Click to browse, drag & drop, or mobile camera
- **Image Preview** — Shows uploaded image before analysis
- **Multilingual Results** — Disease name, confidence, organic treatment, chemical treatment, prevention in EN/HI/TE
- **Local Treatment Database** — 10 disease category fallbacks (blight, rust, mosaic, wilt, rot, spot, mildew, aphid, caterpillar, deficiency)
- **Photo Tips** — Guidance for best results displayed before upload
- **File Validation** — Max 5MB, JPG/PNG only, with clear error messages

### 🎤 Voice Assistant
- **Web Speech API** — Browser-native, completely free, no external API needed
- **3 Language Voice Modes:**
  - English: `en-IN` (Indian English accent optimized)
  - Hindi: `hi-IN`
  - Telugu: `te-IN`
- **Real-time Transcription** — Text appears in input box as user speaks
- **Auto-Send** — Automatically sends message when speech ends
- **Visual Feedback** — Pulsing microphone animation while listening
- **Status Bar** — "Listening... speak now" in current language
- **Error Handling** — Clear messages for microphone denied, no speech, network errors
- **Language Sync** — Voice language automatically updates when UI language changes

### 🪴 Soil Health Calculator
- **5 Input Parameters:** pH, Nitrogen (kg/ha), Phosphorus (kg/ha), Potassium (kg/ha), Organic Carbon (%)
- **Crop Selection** — 8 major crops: Paddy, Wheat, Cotton, Maize, Soybean, Tomato, Groundnut, Chickpea
- **Colour-Coded Status:**
  - 🔴 Red — Very low / very acidic / very alkaline
  - 🟡 Amber — Medium / slightly off
  - ✅ Green — Ideal levels
- **Specific Fertiliser Recommendations** — Urea, DAP, MOP dosages per nutrient deficiency
- **pH Correction Advice** — Lime for acidic soils, gypsum/sulphur for alkaline
- **Crop-Specific Tips** — Unique advice per crop (e.g., Rhizobium for soybean, zinc for paddy)
- **KVK Referral** — Recommends professional soil testing for precise results

### 🌟 Splash / Landing Screen
- **Cinematic Opening Animation** — Dark forest green background with radial gold glow effects
- **Grain Texture Overlay** — Subtle SVG noise for premium material feel
- **Animated Statistics Counter** — Numbers count up on load: Languages, Crops, Diseases, Districts, Availability
- **Feature Cards** — 5 hover-animated feature cards with icons and descriptions
- **Farmer Success Stories** — 4 realistic testimonials with colored avatars:
  - Ramaiah K. (Warangal) — Saved ₹8,000 on paddy pricing
  - Padmavathi D. (Nizamabad) — Saved soybean crop with disease scanner
  - Suresh K. (Karimnagar) — Earned ₹1.2L with crop wizard
  - Lakshmi B. (Khammam) — Saved ₹3,500 with weather timing advice
- **Language Pre-selection** — Choose EN/HI/TE before entering app
- **Smooth Exit Animation** — Scale + fade transition into main app

### 🎨 UI / UX
- **Premium Design System** — Apple-level aesthetics with CSS custom properties
- **Typography** — Playfair Display (serif headlines) + Inter (body text)
- **Color Palette** — Deep Forest `#0A3D1F` + Gold `#C9A84C` + Ivory `#FAFAF7`
- **Dark Mode** — Complete dark green theme with localStorage persistence
- **Scrolling Stats Ticker** — Continuous marquee banner showing all features
- **Message Animations** — Smooth fade-in for every new message
- **Responsive Design** — Works on mobile (375px) to desktop (1440px+)
- **Custom Scrollbar** — Thin green scrollbar in chat window
- **Hover Micro-interactions** — Every button has precise hover states
- **Gold Accent Line** — Subtle gold gradient under header
- **Panel Animations** — Scan panel and soil panel slide in smoothly

### 📄 PDF Export
- **jsPDF Integration** — CDN-loaded, no installation required
- **Professional Layout** — Dark green header with project name and date
- **Full Conversation Export** — Every message with sender label and timestamp
- **Page Breaks** — Automatic new pages when content overflows
- **Color-Coded Senders** — Bot messages in green, farmer messages in grey
- **Footer** — Page number and project credit on every page

---

## 🛠 Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| HTML5 | Semantic | Page structure, accessibility, SEO meta tags |
| CSS3 | Custom Properties | Complete design system, animations, dark mode |
| JavaScript | ES6+ Vanilla | All app logic — no framework overhead |
| Google Fonts | Inter + Playfair Display | Premium typography |
| jsPDF | 2.5.1 (CDN) | Chat-to-PDF export functionality |
| Web Speech API | Browser native | Voice input — free, no API key needed |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Python | 3.11.5 | Runtime environment |
| Flask | 3.1.3 | Lightweight REST API framework |
| Flask-CORS | 6.0.5 | Cross-origin resource sharing |
| Requests | 2.32.4 | HTTP client for external API calls |
| Tempfile | Built-in | Temporary image file handling |
| Base64 | Built-in | Image encoding/decoding |

### External APIs
| API | Provider | Free Tier | Purpose |
|-----|----------|-----------|---------|
| OpenWeatherMap | OpenWeather | 1,000 calls/day | Live weather data |
| PlantNet v2 | INRAE France | 500 calls/day | Plant + disease identification |
| Agmarknet | data.gov.in | Open Government | Live mandi market prices |
| Web Speech API | Google (browser) | Unlimited | Voice-to-text |

### Development Tools
| Tool | Purpose |
|------|---------|
| VS Code | Primary IDE |
| Live Server (VS Code) | Local development server |
| Git | Version control |
| GitHub | Repository hosting + Pages deployment |
| Chrome DevTools | Debugging and responsive testing |

---

## 🏗 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    FARMER ASSISTANT                          │
│                  System Architecture                         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────┐
│         Browser / Farmer Device     │
│                                     │
│  ┌─────────────────────────────┐   │
│  │     index.html (Entry)      │   │
│  └─────────────────────────────┘   │
│                 │                   │
│  ┌──────────────┼──────────────┐   │
│  │   JavaScript Modules        │   │
│  │                             │   │
│  │  chatbot.js  ← Core Engine  │   │
│  │  disease.js  ← AI Scanner   │   │
│  │  translate.js← i18n System  │   │
│  │  weather.js  ← API Key Conf │   │
│  └─────────────────────────────┘   │
│                 │                   │
│  ┌──────────────┼──────────────┐   │
│  │   JSON Knowledge Base       │   │
│  │  responses_en.json          │   │
│  │  responses_hi.json          │   │
│  │  responses_te.json          │   │
│  └─────────────────────────────┘   │
└──────────────┬──────────────────────┘
               │
               │ HTTP REST (localhost:5001)
               │
┌──────────────▼──────────────────────┐
│       Flask Backend (server.py)     │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  POST /api/disease          │   │──► PlantNet API
│  │  GET  /api/price            │   │──► Agmarknet API
│  │  GET  /api/health           │   │
│  └─────────────────────────────┘   │
│                                     │
│  Static MSP Fallback (offline)      │
│  Disease Treatment Database         │
└─────────────────────────────────────┘

Direct from Browser (no backend):
  OpenWeatherMap API ◄── Weather queries
  Web Speech API     ◄── Voice input
```

---

## 📁 Project Structure

```
farmer-chatbot/
│
├── 📄 index.html              # Main application entry point
├── 🐍 server.py               # Flask backend API server
├── 📖 README.md               # This file
├── 🔒 .gitignore              # Git ignore rules
│
└── 📂 src/
    ├── 📂 css/
    │   └── 🎨 style.css       # Complete design system (900+ lines)
    │                            # Dark/light mode, all components,
    │                            # animations, responsive breakpoints
    │
    ├── 📂 js/
    │   ├── 🤖 chatbot.js      # Core AI engine (700+ lines)
    │   │                        # Intent detection, NLP, wizard,
    │   │                        # market prices, voice assistant,
    │   │                        # weather helpers, crop dictionary
    │   │
    │   ├── 🔬 disease.js      # AI Disease scanner module
    │   │                        # PlantNet API integration,
    │   │                        # drag-drop upload, result display
    │   │
    │   ├── 🌐 translate.js    # Multilingual UI strings
    │   │                        # All UI text in EN/HI/TE,
    │   │                        # updateUILanguage() function
    │   │
    │   └── 🌦 weather.js      # Weather API key configuration
    │                            # WEATHER_API_KEY constant
    │
    └── 📂 data/
        ├── 📊 responses_en.json  # English knowledge base
        ├── 📊 responses_hi.json  # Hindi knowledge base
        └── 📊 responses_te.json  # Telugu knowledge base
```

---

## ⚙️ Installation & Setup

### Prerequisites

| Requirement | Version | Check Command |
|-------------|---------|---------------|
| Python | 3.9+ | `python3 --version` |
| pip | 24+ | `pip3 --version` |
| Node.js | Optional (for dev) | `node --version` |
| Git | Any | `git --version` |
| VS Code | Latest | — |

### Step 1 — Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/farmer-chatbot.git
cd farmer-chatbot
```

### Step 2 — Install Python Dependencies

```bash
pip3 install flask flask-cors requests
```

### Step 3 — Get Your Free API Keys

#### 🌦 OpenWeatherMap (Weather)
1. Go to [openweathermap.org](https://openweathermap.org)
2. Sign up free → Go to **API Keys**
3. Copy your key
4. Open `src/js/weather.js` and replace:
```javascript
const WEATHER_API_KEY = 'YOUR_KEY_HERE';
```

#### 🔬 PlantNet (Disease Scanner)
1. Go to [my.plantnet.org](https://my.plantnet.org)
2. Sign up free → Go to **Settings** → Copy API key
3. Open `server.py` and replace:
```python
PLANTNET_API_KEY = 'YOUR_PLANTNET_KEY_HERE'
```

#### 💰 Agmarknet (Market Prices) — Optional
1. Go to [data.gov.in](https://data.gov.in)
2. Sign up → Generate API key
3. Open `server.py` and replace:
```python
DATA_GOV_API_KEY = 'YOUR_KEY_HERE'
```
> ⚠️ **Note:** If you skip this, the app automatically falls back to static MSP 2024-25 prices. The chatbot still works perfectly.

### Step 4 — Install VS Code Live Server Extension
1. Open VS Code
2. Press `Ctrl+Shift+X`
3. Search "Live Server" by Ritwick Dey
4. Install

---

## 🚀 Running the Application

### Terminal 1 — Start Backend

```bash
cd farmer-chatbot
python3 server.py
```

Expected output:
```
* Serving Flask app 'server'
* Debug mode: on
* Running on http://127.0.0.1:5001
* Debugger PIN: XXX-XXX-XXX
```

### Terminal 2 — Start Frontend

Open `index.html` in VS Code → Right click → **Open with Live Server**

Or navigate to:
```
http://127.0.0.1:5500/index.html
```

### Verify Backend is Running

```bash
curl http://127.0.0.1:5001/api/health
```

Expected response:
```json
{
  "message": "Farmer Assistant backend is running",
  "status": "ok",
  "time": "29 Jun 2026 16:00:00"
}
```

### If Port 5001 is Busy

```bash
lsof -ti:5001 | xargs kill -9
python3 server.py
```

---

## 🔌 API Reference

### Backend Routes (Flask — localhost:5001)

#### `POST /api/disease`
Analyzes a crop photo for plant identification and disease detection.

**Request Body:**
```json
{
  "image": "base64_encoded_image_string",
  "language": "en"
}
```

**Response (Disease Found):**
```json
{
  "success": true,
  "healthy": false,
  "plant": "Tomato",
  "score": 89,
  "diseases": [
    {
      "name": "Early Blight",
      "probability": 76,
      "description": "Early Blight detected. Confidence: 76%.",
      "cause": "Solanaceae",
      "symptoms": [],
      "treatment": {
        "biological": ["Spray Trichoderma viride 5g/L"],
        "chemical": ["Mancozeb 2.5g/L"],
        "prevention": ["Avoid overhead irrigation. Ensure good drainage."]
      }
    }
  ]
}
```

**Response (Healthy):**
```json
{
  "success": true,
  "healthy": true,
  "plant": "Tomato",
  "score": 92
}
```

---

#### `GET /api/price`
Fetches live mandi price or MSP for a given crop.

**Query Parameters:**

| Parameter | Type | Required | Example |
|-----------|------|----------|---------|
| crop | string | Yes | `wheat`, `paddy`, `cotton` |
| state | string | No | `Telangana` (default) |

**Example Request:**
```
GET /api/price?crop=wheat&state=Telangana
```

**Response (Live Data):**
```json
{
  "success": true,
  "live": true,
  "commodity": "Wheat",
  "state": "Telangana",
  "results": [
    {
      "market": "Hyderabad",
      "district": "Ranga Reddy",
      "state": "Telangana",
      "commodity": "Wheat",
      "min_price": "2200",
      "max_price": "2400",
      "modal_price": "2275",
      "date": "29/06/2026"
    }
  ]
}
```

**Response (MSP Fallback):**
```json
{
  "success": true,
  "live": false,
  "commodity": "Wheat",
  "msp": "2275",
  "unit": "quintal",
  "note": "",
  "message": "Live mandi data unavailable. Showing Government MSP 2024-25."
}
```

---

#### `GET /api/health`
Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "message": "Farmer Assistant backend is running",
  "time": "29 Jun 2026 16:00:00"
}
```

---

## 📚 Knowledge Base Structure

Each language JSON file (`responses_en.json`, `responses_hi.json`, `responses_te.json`) follows this structure:

```json
{
  "weather": {
    "keywords": ["rain", "weather", "temperature", ...],
    "rules": [
      {
        "triggers": ["rain", "raining"],
        "response": "Advice about rain..."
      }
    ],
    "responses": ["Generic weather response 1", ...]
  },
  "crop": { ... },
  "market": { ... },
  "pest": { ... },
  "greeting": { ... },
  "fallback": ["Response when no intent matched"],
  "wizard": {
    "start": "Question 1 text...",
    "water": { "1": "irrigated", "2": "rainfed", "3": "limited" },
    "q2": "Question 2 text...",
    "season": { "1": "kharif", "2": "rabi", "3": "summer" },
    "q3": "Question 3 text...",
    "recommendations": {
      "irrigated_kharif_1": "Cotton recommendation...",
      "irrigated_kharif_2": "Paddy recommendation...",
      ...
    }
  }
}
```

---

## 🧠 AI & NLP Engine

### Intent Detection Algorithm

```javascript
function detectIntent(message) {
  // Keyword scoring — longer keywords weighted higher
  for each intent in ['weather', 'crop', 'market', 'pest', 'greeting']:
    score = sum of keyword.length for each keyword found in message
  return intent with highest score (or 'fallback')
}
```

### Crop Extraction Algorithm (Longest Match First)

```javascript
// CROP_DICT sorted by key length descending
// Prevents 'rice' matching inside 'price'
// Uses word-boundary regex for clean matching
const CROP_DICT = Object.entries({...}).sort((a,b) => b[0].length - a[0].length)

for (const [name, englishCrop] of CROP_DICT) {
  const regex = new RegExp(`(?:^|[^a-zA-Z])${name}(?:[^a-zA-Z]|$)`, 'i')
  if (regex.test(msg)) return englishCrop
}
```

### Message Processing Pipeline

```
User Input
    │
    ▼
1. Is wizard active?          → Handle wizard step
    │
    ▼
2. Awaiting city for weather? → Fetch weather for city
    │
    ▼
3. Is wizard trigger?         → Start wizard flow
    │
    ▼
4. Is price query?            → Fetch live/MSP price
    │
    ▼
5. Normal intent detection    → Get response from JSON
    │
    ▼
6. Weather intent + city?     → Fetch live weather
    │
    ▼
Bot Response
```

---

## 🌐 Multilingual Support

### Language Coverage

| Component | English | Hindi | Telugu |
|-----------|---------|-------|--------|
| UI Labels | ✅ | ✅ | ✅ |
| Welcome Message | ✅ | ✅ | ✅ |
| Weather Response | ✅ | ✅ | ✅ |
| Farming Advice | ✅ | ✅ | ✅ |
| Market Prices | ✅ | ✅ | ✅ |
| Crop Wizard | ✅ | ✅ | ✅ |
| Pest Guide | ✅ | ✅ | ✅ |
| Disease Results | ✅ | ✅ | ✅ |
| Voice Input | ✅ | ✅ | ✅ |
| Soil Calculator | ✅ | — | — |
| Feedback Messages | ✅ | ✅ | ✅ |
| Error Messages | ✅ | ✅ | ✅ |

### Adding a New Language

1. Create `src/data/responses_xx.json` following the existing structure
2. Add language button in `index.html`
3. Add translations to `translate.js` uiTranslations object
4. Add voice language code to `VOICE_LANG_MAP` in `chatbot.js`

---

## 🔬 Disease Scanner

### How It Works

```
User uploads photo
        │
        ▼
Frontend (disease.js)
→ Reads file as base64
→ Sends to Flask backend via POST /api/disease
        │
        ▼
Backend (server.py)
→ Decodes base64 to temp file
→ Step 1: POST to PlantNet /v2/identify/all
  → Get plant name + confidence
→ Step 2: POST to PlantNet /v2/diseases/identify
  → Get disease name + probability
→ Match disease to local treatment database
→ Return structured JSON response
        │
        ▼
Frontend (disease.js)
→ Display plant name
→ Display disease name + confidence
→ Display organic treatment
→ Display chemical treatment
→ Display prevention advice
→ Show other possible diseases
```

### Supported Disease Categories

| Category | Example | Treatment |
|----------|---------|-----------|
| Blight | Early/Late Blight | Trichoderma / Mancozeb |
| Rust | Yellow/Brown Rust | Neem oil / Propiconazole |
| Mosaic | Yellow Mosaic Virus | Remove plants / Control vectors |
| Rot | Root/Stem Rot | Trichoderma / Carbendazim |
| Spot | Leaf Spot | Bordeaux mixture / Chlorothalonil |
| Wilt | Fusarium/Bacterial Wilt | Trichoderma / Carbendazim |
| Mildew | Powdery/Downy Mildew | Baking soda / Sulphur |
| Aphid | Green/Black Aphids | Neem oil / Imidacloprid |
| Whitefly | Tobacco Whitefly | Yellow traps / Thiamethoxam |
| Caterpillar | Fruit/Stem Borers | Bt spray / Emamectin |

---

## 🎤 Voice Assistant

### Browser Support

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome | ✅ Full | Best accuracy |
| Edge | ✅ Full | Good accuracy |
| Safari | ✅ Partial | iOS supported |
| Firefox | ❌ Not supported | Web Speech API not available |

### Voice Language Codes

```javascript
const VOICE_LANG_MAP = {
  en: 'en-IN',  // Indian English
  hi: 'hi-IN',  // Hindi
  te: 'te-IN'   // Telugu
}
```

---

## 📊 MSP Data (2024-25)

| Crop | MSP (₹/Quintal) | Notes |
|------|-----------------|-------|
| Paddy (Common) | 2,183 | Grade A: ₹2,203 |
| Wheat | 2,275 | |
| Maize | 2,090 | |
| Cotton (Long Staple) | 7,521 | Medium: ₹7,121 |
| Soybean | 4,892 | |
| Groundnut | 6,783 | |
| Mustard | 5,950 | |
| Arhar/Tur | 7,550 | |
| Moong | 8,682 | |
| Urad | 7,400 | |
| Bajra | 2,625 | |
| Jowar (Hybrid) | 3,371 | |
| Sunflower | 7,280 | |
| Chickpea | 5,440 | |
| Barley | 1,735 | |
| Sugarcane | 340 | |

*Source: CACP (Commission for Agricultural Costs and Prices), Government of India*

---

## 🌙 Dark Mode & UI Design

### Design Tokens

```css
:root {
  --forest:       #0a3d1f;   /* Primary dark green */
  --forest-mid:   #1a5c34;   /* Mid green */
  --forest-light: #2d7a4f;   /* Light green */
  --gold:         #c9a84c;   /* Premium gold accent */
  --ivory:        #fafaf7;   /* Warm white background */
}
```

### Dark Mode Implementation

Dark mode uses CSS custom properties override:

```css
[data-theme="dark"] {
  --bg:         #0c1410;
  --surface:    #121f16;
  --text-primary: #eef2ee;
  /* ... all tokens overridden */
}
```

Toggled via:

```javascript
document.documentElement.setAttribute('data-theme', 'dark')
localStorage.setItem('fa-theme', 'dark')
```

---

## 📄 PDF Export

The chat export uses **jsPDF 2.5.1** loaded from CDN:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
```

Features:
- Dark green header with project name and generation date
- All messages with sender labels (🌾 Assistant / 👨‍🌾 Farmer)
- Timestamps on each message
- Automatic page breaks at 272mm
- Color-coded sender identification
- Professional footer with page numbers

---

## 🌱 Crop Wizard

### Decision Matrix (27 Combinations)

| Water | Season | Goal | Top Recommendation |
|-------|--------|------|-------------------|
| Irrigated | Kharif | Max Profit | Cotton |
| Irrigated | Kharif | Family + Sell | Paddy |
| Irrigated | Kharif | Safe Crop | Paddy |
| Irrigated | Rabi | Max Profit | Wheat |
| Irrigated | Rabi | Family + Sell | Wheat + Mustard |
| Irrigated | Rabi | Safe Crop | Wheat |
| Irrigated | Summer | Max Profit | Tomato / Chilli |
| Rainfed | Kharif | Max Profit | Soybean |
| Rainfed | Kharif | Family + Sell | Jowar + Arhar |
| Rainfed | Kharif | Safe Crop | Bajra |
| Limited | Kharif | Max Profit | Soybean |
| Limited | Rabi | Max Profit | Mustard |
| Limited | Summer | Max Profit | Sunflower |
| *...and 14 more* | | | |

---

## 🔐 Environment Variables

| Variable | File | Description | Required |
|----------|------|-------------|----------|
| `WEATHER_API_KEY` | `src/js/weather.js` | OpenWeatherMap API key | ✅ Yes |
| `PLANTNET_API_KEY` | `server.py` | PlantNet disease API key | ✅ Yes |
| `DATA_GOV_API_KEY` | `server.py` | data.gov.in Agmarknet key | ❌ Optional |

> ⚠️ **Security Note:** Never commit real API keys to GitHub. Add `server.py` to `.gitignore` or use environment variables in production.

---

## 🚢 Deployment

### GitHub Pages (Frontend)

```bash
# 1. Push to GitHub
git add .
git commit -m "Deploy Farmer Assistant"
git push origin main

# 2. Enable GitHub Pages
# Repository → Settings → Pages → main branch → root → Save

# 3. Your live URL
https://YOUR_USERNAME.github.io/farmer-chatbot
```

### Backend Deployment Options

| Platform | Free Tier | Setup Time |
|----------|-----------|------------|
| Render.com | ✅ 750 hrs/month | 10 mins |
| Railway.app | ✅ $5 credit/month | 5 mins |
| PythonAnywhere | ✅ 1 web app | 15 mins |
| Fly.io | ✅ 3 shared VMs | 20 mins |

### Backend Environment Variables (Production)

```bash
export PLANTNET_API_KEY="your_key_here"
export DATA_GOV_API_KEY="your_key_here"
```

---

## ⚠️ Known Limitations

| Limitation | Impact | Workaround |
|------------|--------|------------|
| PlantNet 500 calls/day limit | Disease scanner stops after 500 uses/day | Create new free account for fresh 500 calls |
| Voice input needs Chrome/Edge | Firefox users cannot use voice | Use text input instead |
| Backend runs locally | Disease scanner and live prices unavailable without running server.py | MSP fallback works without backend |
| Agmarknet data availability | Some crops/regions may have no live data | Static MSP fallback always available |
| PlantNet accuracy | Not 100% accurate for all crop diseases | Use clear, close-up, well-lit photos |
| No user authentication | No conversation history between sessions | Use PDF export to save conversations |

---

## 🔮 Future Roadmap

### Phase 2 — Enhanced AI (Q3 2026)
- [ ] Typing animation — character-by-character response rendering
- [ ] Suggested follow-up chips — contextual next question suggestions
- [ ] Seasonal crop calendar — 12-month visual sowing/harvest guide
- [ ] MSP price comparison chart — bar chart for top 8 crops

### Phase 3 — Scale & Reach (Q4 2026)
- [ ] WhatsApp bot integration via Twilio API
- [ ] Offline PWA support with service workers
- [ ] Government scheme finder — match farmer profile to PM schemes
- [ ] Multi-district soil health map for Telangana

### Phase 4 — Intelligence Upgrade (2027)
- [ ] Vector database for semantic search (replace JSON knowledge base)
- [ ] Fine-tuned regional language model for better Telugu/Hindi NLP
- [ ] Farmer profile and conversation history
- [ ] Community forum integration for peer-to-peer advice

---

## 🧩 Challenges & Solutions

| # | Challenge | Root Cause | Solution |
|---|-----------|------------|---------|
| 1 | Disease API CORS error | Browsers block cross-origin requests | Routed through Flask backend proxy |
| 2 | plant.id 429 error | 100 free credits exhausted | Switched to PlantNet (500/day free) |
| 3 | Always detecting paddy | `Object.entries()` has no order guarantee | Sorted by key length desc, word-boundary regex |
| 4 | Wizard only accepting numbers | Regex only matched leading digits | Built `parseWizardAnswer()` with keyword matching |
| 5 | data.gov.in API key issue | Portal UI inconsistency | Static MSP fallback with 2024-25 data |
| 6 | Chat window not scrolling | `overflow:hidden` trapped flex children | Added `min-height:0` + `#mainApp` wrapper fix |
| 7 | Wrong crop detected in price query | Short names matching inside longer words | Longest-match algorithm with `\b` boundaries |

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

```bash
# 1. Fork the repository
# 2. Create your feature branch
git checkout -b feature/AmazingFeature

# 3. Make your changes
# 4. Commit your changes
git commit -m 'Add some AmazingFeature'

# 5. Push to the branch
git push origin feature/AmazingFeature

# 6. Open a Pull Request
```

### Contribution Ideas

- Add a new Indian language (Tamil, Kannada, Marathi, Bengali)
- Expand the knowledge base with more crops or pest scenarios
- Improve PlantNet result accuracy with better image preprocessing
- Add unit tests for the chatbot logic
- Improve mobile UI for low-end Android devices

---

## 📜 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

```
MIT License — Free to use, modify, and distribute.
Just give credit where it's due. 🌾
```

---

## 👨‍💻 Author

**Santosh Abhishek Pendyala**

- 🌐 GitHub: [@yourusername](https://github.com/yourusername)
- 💼 LinkedIn: [linkedin.com/in/yourprofile](https://linkedin.com/in/yourprofile)
- 📧 Email: your.email@example.com

---

## 🙏 Acknowledgements

| Resource | Purpose |
|----------|---------|
| [OpenWeatherMap](https://openweathermap.org) | Free weather API for Indian cities |
| [PlantNet / INRAE](https://plantnet.org) | Free plant and disease identification AI |
| [data.gov.in / Agmarknet](https://data.gov.in) | Open Government mandi price data |
| [Google Fonts](https://fonts.google.com) | Inter + Playfair Display typography |
| [jsPDF](https://github.com/parallax/jsPDF) | PDF generation library |
| [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) | Browser-native voice recognition |
| [Flask](https://flask.palletsprojects.com) | Lightweight Python web framework |
| [CACP India](https://cacp.dacnet.nic.in) | MSP data for 2024-25 crop season |

---

<div align="center">

**Built with ❤️ for Indian Farmers**

*"Technology should serve those who feed us."*

⭐ **Star this repo if you found it useful!** ⭐

[![GitHub stars](https://img.shields.io/github/stars/yourusername/farmer-chatbot?style=social)](https://github.com/yourusername/farmer-chatbot)
[![GitHub forks](https://img.shields.io/github/forks/yourusername/farmer-chatbot?style=social)](https://github.com/yourusername/farmer-chatbot)

</div>
