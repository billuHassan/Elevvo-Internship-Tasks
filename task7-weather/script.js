/**
 * Task 7: Real-Time Weather Dashboard
 * Features:
 * - Real API integration (Open-Meteo Geocoding & Weather Forecast API)
 * - Real-time metrics: temperature, weather condition, humidity, wind, UV index, air pressure
 * - 3-Day Forecast cards with daily high/low temperatures and weather icons
 * - City search with instant feedback
 * - Popular world cities quick-select chips
 * - User Geolocation support with auto-fetch (Bonus Requirement)
 * - Celsius (°C) and Fahrenheit (°F) dynamic unit conversion
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const searchForm = document.getElementById('searchForm');
  const cityInput = document.getElementById('cityInput');
  const geoBtn = document.getElementById('geoBtn');
  const unitToggle = document.getElementById('unitToggle');
  const unitButtons = unitToggle.querySelectorAll('.unit-btn');
  const cityChips = document.querySelectorAll('.city-chip');

  const loadingState = document.getElementById('loadingState');
  const errorNotice = document.getElementById('errorNotice');
  const weatherDisplay = document.getElementById('weatherDisplay');

  // Display fields
  const cityNameEl = document.getElementById('cityName');
  const currentDateEl = document.getElementById('currentDate');
  const mainWeatherIcon = document.getElementById('mainWeatherIcon');
  const tempValue = document.getElementById('tempValue');
  const weatherCondition = document.getElementById('weatherCondition');
  const feelsLike = document.getElementById('feelsLike');
  const tempMax = document.getElementById('tempMax');
  const tempMin = document.getElementById('tempMin');
  const precipProb = document.getElementById('precipProb');

  const valHumidity = document.getElementById('valHumidity');
  const valWind = document.getElementById('valWind');
  const valUV = document.getElementById('valUV');
  const valPressure = document.getElementById('valPressure');
  const forecastGrid = document.getElementById('forecastGrid');

  // State
  let currentUnit = 'c'; // 'c' or 'f'
  let cachedWeatherData = null;

  // WMO Weather Code Interpreter
  function interpretWmoCode(code) {
    switch (code) {
      case 0:
        return { text: 'Clear Sky', icon: '☀️' };
      case 1:
        return { text: 'Mainly Clear', icon: '🌤️' };
      case 2:
        return { text: 'Partly Cloudy', icon: '⛅' };
      case 3:
        return { text: 'Overcast', icon: '☁️' };
      case 45:
      case 48:
        return { text: 'Foggy Conditions', icon: '🌫️' };
      case 51:
      case 53:
      case 55:
        return { text: 'Drizzle', icon: '🌦️' };
      case 61:
      case 63:
      case 65:
        return { text: 'Rain Showers', icon: '🌧️' };
      case 71:
      case 73:
      case 75:
        return { text: 'Snowfall', icon: '❄️' };
      case 80:
      case 81:
      case 82:
        return { text: 'Heavy Showers', icon: '🌧️' };
      case 95:
      case 96:
      case 99:
        return { text: 'Thunderstorm', icon: '⛈️' };
      default:
        return { text: 'Partly Cloudy', icon: '⛅' };
    }
  }

  function toUnit(celsius) {
    if (currentUnit === 'f') {
      return Math.round((celsius * 9) / 5 + 32);
    }
    return Math.round(celsius);
  }

  function getUnitSymbol() {
    return currentUnit === 'f' ? '°F' : '°C';
  }

  // Set visual states
  function setLoading(isLoading) {
    loadingState.classList.toggle('hidden', !isLoading);
    weatherDisplay.classList.toggle('hidden', isLoading);
    if (isLoading) errorNotice.classList.add('hidden');
  }

  function showError(title, message) {
    document.getElementById('errorTitle').textContent = title;
    document.getElementById('errorDesc').textContent = message;
    errorNotice.classList.remove('hidden');
    loadingState.classList.add('hidden');
    weatherDisplay.classList.add('hidden');
  }

  // Fetch coordinates using Open-Meteo Geocoding API
  async function fetchCoordinates(cityQuery) {
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityQuery)}&count=1&language=en&format=json`;
    const res = await fetch(geoUrl);
    if (!res.ok) throw new Error('Geocoding service unavailable.');
    const data = await res.json();
    if (!data.results || data.results.length === 0) {
      throw new Error(`Location "${cityQuery}" not found. Please try another name.`);
    }
    const loc = data.results[0];
    return {
      name: `${loc.name}, ${loc.country || ''}`,
      lat: loc.latitude,
      lon: loc.longitude,
    };
  }

  // Fetch Weather using Open-Meteo Forecast API
  async function fetchWeatherData(lat, lon, locationLabel) {
    setLoading(true);
    try {
      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,surface_pressure,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,uv_index_max&timezone=auto&forecast_days=4`;

      const response = await fetch(weatherUrl);
      if (!response.ok) throw new Error('Weather data service unavailable.');
      const data = await response.json();

      cachedWeatherData = {
        label: locationLabel,
        current: data.current,
        daily: data.daily,
      };

      renderWeather();
      setLoading(false);
    } catch (err) {
      showError('Weather Request Failed', err.message || 'Unable to retrieve live forecast.');
    }
  }

  // Render Weather to DOM
  function renderWeather() {
    if (!cachedWeatherData) return;
    const { label, current, daily } = cachedWeatherData;

    // Header info
    cityNameEl.textContent = label;
    const now = new Date();
    currentDateEl.textContent = now.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    });

    // Current condition
    const wmo = interpretWmoCode(current.weather_code);
    mainWeatherIcon.textContent = wmo.icon;
    weatherCondition.textContent = wmo.text;

    // Temperatures
    const unit = getUnitSymbol();
    tempValue.textContent = toUnit(current.temperature_2m);
    document.querySelectorAll('.temp-unit').forEach((el) => (el.textContent = unit));
    feelsLike.textContent = `${toUnit(current.apparent_temperature)}${unit}`;
    tempMax.textContent = `${toUnit(daily.temperature_2m_max[0])}${unit}`;
    tempMin.textContent = `${toUnit(daily.temperature_2m_min[0])}${unit}`;
    precipProb.textContent = `${daily.precipitation_probability_max[0] || 0}%`;

    // Metrics
    valHumidity.textContent = `${current.relative_humidity_2m}%`;
    valWind.textContent = `${Math.round(current.wind_speed_10m)} km/h`;
    const uvVal = daily.uv_index_max ? daily.uv_index_max[0] : 4;
    valUV.textContent = `${uvVal} (${uvVal > 6 ? 'High' : 'Moderate'})`;
    valPressure.textContent = `${Math.round(current.surface_pressure)} hPa`;

    // Render 3-Day Forecast
    renderForecast(daily);
  }

  function renderForecast(daily) {
    forecastGrid.innerHTML = '';
    const unit = getUnitSymbol();

    // Render days 1, 2, 3 (skipping index 0 which is today)
    for (let i = 1; i <= 3; i++) {
      const dateStr = daily.time[i];
      const dateObj = new Date(dateStr + 'T00:00:00');
      const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
      const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

      const wmo = interpretWmoCode(daily.weather_code[i]);
      const maxT = toUnit(daily.temperature_2m_max[i]);
      const minT = toUnit(daily.temperature_2m_min[i]);
      const precip = daily.precipitation_probability_max[i] || 0;

      const card = document.createElement('div');
      card.className = 'forecast-card';
      card.innerHTML = `
        <span class="forecast-day">${dayName}</span>
        <span class="forecast-date">${formattedDate}</span>
        <div class="forecast-icon">${wmo.icon}</div>
        <span class="forecast-cond">${wmo.text}</span>
        <div class="forecast-temps">
          <span class="max-temp">${maxT}${unit}</span>
          <span class="min-temp">${minT}${unit}</span>
        </div>
        <div style="font-size: 0.75rem; color: #38bdf8; margin-top: 6px;">💧 ${precip}% rain</div>
      `;
      forecastGrid.appendChild(card);
    }
  }

  // Handle City Search
  searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = cityInput.value.trim();
    if (!query) return;

    cityChips.forEach((c) => c.classList.remove('active'));
    try {
      setLoading(true);
      const loc = await fetchCoordinates(query);
      await fetchWeatherData(loc.lat, loc.lon, loc.name);
    } catch (err) {
      showError('Location Not Found', err.message);
    }
  });

  // Handle Quick City Chips
  cityChips.forEach((chip) => {
    chip.addEventListener('click', async () => {
      cityChips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      const cityName = chip.getAttribute('data-city');
      cityInput.value = cityName;

      try {
        setLoading(true);
        const loc = await fetchCoordinates(cityName);
        await fetchWeatherData(loc.lat, loc.lon, loc.name);
      } catch (err) {
        showError('Fetch Error', err.message);
      }
    });
  });

  // Handle Geolocation (Bonus Requirement)
  geoBtn.addEventListener('click', () => {
    if (!navigator.geolocation) {
      showError('Geolocation Unavailable', 'Your browser does not support HTML5 Geolocation.');
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          // Reverse geocode label
          const revUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
          let locLabel = 'My Current Location';
          try {
            const revRes = await fetch(revUrl);
            if (revRes.ok) {
              const revData = await revRes.json();
              locLabel = `${revData.city || revData.locality || 'Current Location'}, ${revData.countryCode || ''}`;
            }
          } catch (e) {
            // fallback label
          }

          cityChips.forEach((c) => c.classList.remove('active'));
          await fetchWeatherData(latitude, longitude, locLabel);
        } catch (err) {
          showError('Weather Request Failed', err.message);
        }
      },
      (error) => {
        let msg = 'Could not acquire GPS position. Location access was denied or timed out.';
        if (error.code === 1) msg = 'Location permission was denied. Please allow location access in your browser settings.';
        showError('Location Permission Denied', msg);
      },
      { timeout: 10000 }
    );
  });

  // Unit Toggle (°C / °F)
  unitButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      unitButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      currentUnit = btn.getAttribute('data-unit');
      renderWeather();
    });
  });

  // Initial Load: London
  (async () => {
    try {
      const loc = await fetchCoordinates('London');
      await fetchWeatherData(loc.lat, loc.lon, loc.name);
    } catch (e) {
      showError('Network Error', 'Could not load initial weather data.');
    }
  })();
});

