const WEATHER_API_KEY = 'YOUR_WEATHER_API_KEY_HERE'; // WeatherAPI.com Key
        const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY_HERE'; // Get your key from Google AI Studio

        let currentWeatherData = null;

        // DOM Elements
        const cityInput = document.getElementById('cityInput');
        const searchBtn = document.getElementById('searchBtn');
        const locationBtn = document.getElementById('locationBtn');
        const weatherDisplay = document.getElementById('weatherDisplay');
        const errorDisplay = document.getElementById('errorDisplay');
        const errorMessage = document.getElementById('errorMessage');
        const loader = document.getElementById('loader');
        const weatherContent = document.getElementById('weatherContent');
        const cityNameEl = document.getElementById('cityName');
        const weatherIconEl = document.getElementById('weatherIcon');
        const temperatureEl = document.getElementById('temperature');
        const descriptionEl = document.getElementById('description');
        const humidityEl = document.getElementById('humidity');
        const windSpeedEl = document.getElementById('windSpeed');
        const visibilityEl = document.getElementById('visibility');
        const pressureEl = document.getElementById('pressure');
        const geminiBtn = document.getElementById('geminiBtn');
        const geminiLoader = document.getElementById('geminiLoader');
        const geminiSummary = document.getElementById('geminiSummary');

        // Set a default background on load
        window.onload = () => {
            document.body.style.background = 'linear-gradient(to top, #1e3a8a, #111827)';
        };

        // --- Event Listeners ---
        searchBtn.addEventListener('click', () => {
            const city = cityInput.value.trim();
            if (city) getWeatherByQuery(city);
            else showError('Please enter a city name.');
        });

        cityInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') searchBtn.click();
        });

        locationBtn.addEventListener('click', () => {
            if (navigator.geolocation) {
                showLoading();
                navigator.geolocation.getCurrentPosition(
                    pos => getWeatherByQuery(`${pos.coords.latitude},${pos.coords.longitude}`),
                    () => showError('Unable to retrieve your location. Please allow access.')
                );
            } else {
                showError('Geolocation is not supported by your browser.');
            }
        });

        geminiBtn.addEventListener('click', () => {
            if (currentWeatherData) {
                getGeminiSummary(currentWeatherData);
            }
        });

        // --- API Fetching ---
        async function fetchWeather(url) {
            showLoading();
            try {
                if (WEATHER_API_KEY === 'YOUR_API_KEY_HERE') {
                    throw new Error("Invalid WeatherAPI Key. Please add your key.");
                }
                const response = await fetch(url);
                const data = await response.json();
                if (!response.ok) throw new Error(data.error.message || 'An error occurred.');
                currentWeatherData = data;
                displayWeather(data);
            } catch (error) {
                showError(error.message);
            }
        }

        function getWeatherByQuery(query) {
            const url = `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${query}`;
            fetchWeather(url);
        }

        async function getGeminiSummary(weatherData) {
            geminiSummary.classList.add('hidden');
            geminiLoader.classList.remove('hidden');
            geminiBtn.disabled = true;

            if (GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY_HERE') {
                showGeminiError('Please add your Gemini API key to the code.');
                return;
            }

            const { location, current } = weatherData;
            const prompt = `Based on the following weather data for ${location.name}, provide a short, friendly, and helpful summary (3-4 sentences). Include advice on what to wear or what activities might be suitable. Weather: ${current.condition.text}, Temperature: ${current.temp_c}°C, Wind: ${current.wind_kph} km/h, Humidity: ${current.humidity}%.`;
            
            try {
                const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] };
                const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
                
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    throw new Error('AI response error. Please check your API key and try again.');
                }

                const result = await response.json();
                if (result.candidates && result.candidates.length > 0) {
                    const text = result.candidates[0].content.parts[0].text;
                    geminiSummary.innerHTML = text.replace(/\n/g, '<br>');
                    geminiSummary.classList.remove('hidden');
                } else {
                    throw new Error('Could not get an AI summary.');
                }
            } catch (error) {
                showGeminiError(error.message);
            } finally {
                geminiLoader.classList.add('hidden');
                geminiBtn.disabled = false;
            }
        }

        // --- UI Updates ---
        function showLoading() {
            errorDisplay.classList.add('hidden');
            weatherDisplay.classList.add('hidden');
            loader.classList.remove('hidden');
        }

        function showError(message) {
            loader.classList.add('hidden');
            weatherDisplay.classList.add('hidden');
            errorMessage.textContent = message;
            errorDisplay.classList.remove('hidden');
        }

        function showGeminiError(message) {
            geminiLoader.classList.add('hidden');
            geminiBtn.disabled = false;
            geminiSummary.innerHTML = `<p class="text-red-400">Error: ${message}</p>`;
            geminiSummary.classList.remove('hidden');
        }

        function displayWeather(data) {
            const { location, current } = data;
            cityNameEl.textContent = location.name;
            weatherIconEl.src = `https:${current.condition.icon}`;
            temperatureEl.textContent = `${Math.round(current.temp_c)}°C`;
            descriptionEl.textContent = current.condition.text;
            humidityEl.textContent = `${current.humidity}%`;
            windSpeedEl.textContent = `${current.wind_kph.toFixed(1)} km/h`;
            visibilityEl.textContent = `${current.vis_km.toFixed(1)} km`;
            pressureEl.textContent = `${current.pressure_mb} mb`;
            
            updateBackgroundGradient(current.condition.code);

            loader.classList.add('hidden');
            errorDisplay.classList.add('hidden');
            weatherDisplay.classList.remove('hidden');
            geminiSummary.classList.add('hidden');
        }
        
        function updateBackgroundGradient(code) {
            let gradient = '';
            // Weather condition codes from WeatherAPI.com documentation
            if ([1000].includes(code)) { // Sunny
                gradient = 'linear-gradient(to top, #facc15, #f97316)';
            } else if ([1003, 1006, 1009].includes(code)) { // Cloudy
                gradient = 'linear-gradient(to top, #94a3b8, #334155)';
            } else if ([1063, 1180, 1183, 1186, 1189, 1192, 1195, 1240, 1243, 1246].includes(code)) { // Rainy
                gradient = 'linear-gradient(to top, #3b82f6, #1e293b)';
            } else if ([1066, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258].includes(code)) { // Snowy
                gradient = 'linear-gradient(to top, #e0f2fe, #7dd3fc)';
            } else if ([1087, 1273, 1276, 1279, 1282].includes(code)) { // Thunder
                gradient = 'linear-gradient(to top, #4c1d95, #1e1b4b)';
            } else { // Default (mist/fog)
                gradient = 'linear-gradient(to top, #d1d5db, #6b7280)';
            }
            document.body.style.background = gradient;
        }
