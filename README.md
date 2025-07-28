# AI Weather App

An intelligent and visually appealing weather forecast application that provides real-time weather data and generates a helpful, AI-powered summary. This project demonstrates the integration of multiple third-party APIs, asynchronous JavaScript for data fetching, and a modern, responsive user interface built with Tailwind CSS.

## Features

* **Real-time Weather Data**: Fetches current weather information from [WeatherAPI.com](https://www.weatherapi.com).
* **Multiple Search Options**:
    * Search for weather by any city name.
    * Use the "Use My Location" button to get forecasts based on your device's geolocation.
* **AI-Powered Summaries**: Features a "Get AI Summary" button that sends the current weather data to the Google Gemini API to generate a friendly, actionable summary, including advice on attire and activities.
* **Dynamic UI**:
    * The background gradient of the entire application changes dynamically to match the current weather conditions (e.g., sunny, cloudy, rainy).
    * Displays detailed information including temperature, humidity, wind speed, visibility, and pressure.
    * A clean, "glassmorphism" effect is used for the main card for a modern aesthetic.
* **User Experience**:
    * Includes loading spinners and clear error messages for API calls and location services.
    * Fully responsive design that works seamlessly on desktop and mobile devices.
    * Smooth fade-in animations for displaying content.

## Technologies Used

* **HTML5**: Structures the application layout.
* **CSS3**: Provides custom styling, animations, and the glassmorphism card effect.
* **Tailwind CSS**: A utility-first CSS framework for rapid and responsive UI development.
* **Vanilla JavaScript**: Handles all logic, including API calls, event handling, and DOM manipulation.
* **APIs**:
    * **WeatherAPI.com**: For sourcing real-time weather data.
    * **Google Gemini API**: For generating intelligent weather summaries.

## Setup and Usage

To run this project locally, you will need to provide your own API keys for both WeatherAPI and Google Gemini.

1.  **Clone the Repository**:
    ```bash
    git clone [https://github.com/your-username/ai-weather-app.git](https://github.com/your-username/ai-weather-app.git)
    ```
2.  **Navigate to the Directory**:
    ```bash
    cd ai-weather-app
    ```
3.  **Add API Keys**:
    * Open the `script.js` file.
    * On the first line, replace `'YOUR_API_KEY_HERE'` with your actual **WeatherAPI.com** key.
    * On the second line, replace `'YOUR_GEMINI_API_KEY_HERE'` with your **Google Gemini** API key.
    ```javascript
    const WEATHER_API_KEY = 'YOUR_WEATHER_API_KEY'; // Replace with your key
    const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY';   // Replace with your key
    ```

4.  **Open in Browser**:
    * Open the `index.html` file in any modern web browser.

## File Structure
  ├── index.html:     The main HTML file containing the structure of the game.

  ├── style.css:    Custom CSS for styling, animations, and responsive design.

  └── script.js:      The core JavaScript file with all game logic and functionality.
