const WEATHER_API_KEY = '09179345e28286633131f41799e2780c'; // ← paste your key here

// ── FETCH WEATHER BY CITY NAME ──
async function fetchWeather(cityName) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName},IN&appid=${WEATHER_API_KEY}&units=metric`
    );
    const data = await res.json();

    if (data.cod !== 200) {
      return `❌ Could not find weather for "${cityName}". Please check the city name and try again.`;
    }

    const temp     = Math.round(data.main.temp);
    const feels    = Math.round(data.main.feels_like);
    const humidity = data.main.humidity;
    const wind     = Math.round(data.wind.speed * 3.6); // m/s to km/h
    const desc     = data.weather[0].description;
    const city     = data.name;
    const icon     = getWeatherEmoji(data.weather[0].main);

    // Farming advice based on conditions
    const advice = getFarmingAdvice(data);

    return `${icon} Weather in ${city} right now:\n\n` +
           `🌡 Temperature: ${temp}°C (feels like ${feels}°C)\n` +
           `💧 Humidity: ${humidity}%\n` +
           `💨 Wind Speed: ${wind} km/h\n` +
           `🌤 Condition: ${desc}\n\n` +
           `👨‍🌾 Farming Advice:\n${advice}`;

  } catch (err) {
    return '⚠️ Unable to fetch weather right now. Please check your internet connection.';
  }
}

// ── FARMING ADVICE BASED ON WEATHER ──
function getFarmingAdvice(data) {
  const temp     = data.main.temp;
  const humidity = data.main.humidity;
  const wind     = data.wind.speed * 3.6;
  const main     = data.weather[0].main.toLowerCase();
  const advice   = [];

  // Rain advice
  if (main.includes('rain') || main.includes('drizzle') || main.includes('thunderstorm')) {
    advice.push('🌧 Rain detected — avoid spraying pesticides or fertilizers today.');
    advice.push('💧 Check field drainage to prevent waterlogging.');
  }

  // Hot weather
  if (temp > 35) {
    advice.push('☀️ Very hot today — water crops early morning or after 6 PM only.');
    advice.push('🌿 Mulch soil to retain moisture in this heat.');
  }

  // Cold weather
  if (temp < 12) {
    advice.push('🧊 Cold weather — protect young seedlings from frost tonight.');
    advice.push('💡 Wet soil before cold night — retains heat better.');
  }

  // Pleasant — good for spraying
  if (!main.includes('rain') && wind < 20 && temp >= 15 && temp <= 30) {
    advice.push('✅ Good conditions for spraying pesticides or fertilizers today.');
  }

  // High wind
  if (wind > 30) {
    advice.push('💨 High winds — avoid spraying today, chemicals will drift.');
  }

  // High humidity
  if (humidity > 80) {
    advice.push('🍄 High humidity — watch for fungal disease outbreaks on crops.');
  }

  // Low humidity
  if (humidity < 30) {
    advice.push('🏜 Low humidity — increase irrigation frequency today.');
  }

  return advice.length > 0
    ? advice.join('\n')
    : '✅ Weather looks normal. Good day for regular farm activities.';
}

// ── WEATHER EMOJI BASED ON CONDITION ──
function getWeatherEmoji(condition) {
  const map = {
    Clear:        '☀️',
    Clouds:       '⛅',
    Rain:         '🌧',
    Drizzle:      '🌦',
    Thunderstorm: '⛈',
    Snow:         '❄️',
    Mist:         '🌫',
    Fog:          '🌁',
    Haze:         '🌫',
    Dust:         '🌪',
    Wind:         '💨'
  };
  return map[condition] || '🌤';
}