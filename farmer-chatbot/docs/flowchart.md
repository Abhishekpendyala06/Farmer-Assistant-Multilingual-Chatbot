# Farmer Chatbot — Conversation Flow

## Main Flow

USER OPENS CHATBOT
        │
        ▼
[Language Selection]
  EN / हिं / తె
        │
        ▼
[Welcome Message]
"Hello Farmer! How can I help you today?"
        │
        ▼
[User Types a Query]
        │
        ▼
[Intent Detection — keyword matching]
        │
   ┌────┴─────────────────────────┐
   │         │          │         │
   ▼         ▼          ▼         ▼
WEATHER   CROP       MARKET    PEST
          ADVICE     PRICE     CONTROL
   │         │          │         │
   ▼         ▼          ▼         ▼
Fetch     JSON       JSON      JSON
API       lookup     lookup    lookup
   │         │          │         │
   └────┬────┘──────────┘─────────┘
        │
        ▼
[Display Response in selected language]
        │
        ▼
[User types again?] ──► Loop back to Intent Detection

## Intent Keywords

WEATHER:
  English : rain, weather, temperature, forecast, humidity
  Hindi   : बारिश, मौसम, तापमान
  Telugu  : వర్షం, వాతావరణం, ఉష్ణోగ్రత

CROP ADVICE:
  English : crop, grow, plant, soil, season, sow, harvest
  Hindi   : फसल, बोना, मिट्टी, खेती
  Telugu  : పంట, నాటు, మట్టి, వ్యవసాయం

MARKET PRICE:
  English : price, market, sell, rate, mandi, cost
  Hindi   : भाव, मंडी, बेचना, दाम
  Telugu  : ధర, మార్కెట్, అమ్మకం, మండి

PEST CONTROL:
  English : pest, insect, disease, leaves, yellow, spray
  Hindi   : कीट, बीमारी, पत्ते, पीले, दवाई
  Telugu  : పురుగు, రోగం, ఆకులు, పసుపు, మందు

## Fallback
If no intent matched →
"Sorry, I didn't understand. Please try asking about
weather, crops, market prices, or pest control."