const myApiKey = ''; // Ваш API ключ
const SPbId = '498817'; // ID Санкт-Петербурга в OpenWeatherMap

chrome.runtime.onInstalled.addListener(() => {
  fetchWeather();
  setInterval(fetchWeather, 60 * 1000); // Обновление каждую минуту
});

function fetchWeather() {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?id=${SPbId}&appid=${myApiKey}&units=metric`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const iconMap = {
        '01d': 'clear.png',
        '01n': 'clear_n.png',
        '02d': 'half_clouds.png',
        '02n': 'half_clouds_n.png',
        '03d': 'clouds.png',
        '03n': 'clouds_n.png',
        '04d': 'clouds.png',
        '04n': 'clouds_n.png',
        '09d': 'rain.png',
        '09n': 'rain_n.png',
        '10d': 'rain.png',
        '10n': 'rain_n.png',
        '11d': 'thunderstorm.png',
        '11n': 'thunderstorm_n.png',
        '13d': 'snow.png',
        '13n': 'snow_n.png',
        '50d': 'mist.png',
        '50n': 'mist_n.png'
      };

      const weatherIcon = iconMap[data.weather[0].icon];
      chrome.action.setIcon({ path: `icons/${weatherIcon}` });

      chrome.storage.local.set({
        temperature: Math.round(data.main.temp),
        description: data.weather[0].description,
        icon: weatherIcon
      }, () => {
        if (chrome.runtime.lastError) {
          console.error('Error setting chrome.storage:', chrome.runtime.lastError);
        }
      });
    })
    .catch(error => console.error('Error fetching weather data:', error));
}