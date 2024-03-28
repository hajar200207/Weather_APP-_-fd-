const timeElement = document.querySelector(".time");
const dateElement = document.querySelector(".date");

/**
 * @param {Date} date
 */
function formatTime(date) {
  const hours12 = date.getHours() % 12 || 12;
  const minutes = date.getMinutes();
  const isAm = date.getHours() < 12;

  return `${hours12.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")} ${isAm ? "AM" : "PM"}`;
}

/**
 * @param {Date} date
 */
function formatDate(date) {
  const DAYS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  return `${DAYS[date.getDay()]}, ${
    MONTHS[date.getMonth()]
  } ${date.getDate()} ${date.getFullYear()}`;
}

setInterval(() => {
  const now = new Date();

  timeElement.textContent = formatTime(now);
  dateElement.textContent = formatDate(now);
}, 200);

// fetch API


const apiKey = 'ab03b5e53ed6729813441746fccbbae7'; 

const cities = ["Meknes", "Rabat", "Fes", "Afourer","kasba tadla"];


async function getWeatherData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=fr`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur :', error);
    }
}

function displayWeather(city, data) {
    const weatherContainer = document.getElementById('weather-container');
    const weatherCard = document.createElement('div');
    weatherCard.classList.add('weather-card');


    const locationElement = document.createElement('div');

    locationElement.classList.add('location');
    locationElement.textContent = data.name;

    const temperatureElement = document.createElement('div');

    temperatureElement.textContent = `Température: ${data.main.temp} °C`;

    const conditionsElement = document.createElement('div');
    conditionsElement.textContent = `Conditions: ${data.weather[0].description}`;

    const image = document.createElement('img');
    switch (data.weather[0].description){
        case 'clear':
            image.src = 'Animation - 1711640709381.gif';
            break;
        case 'nuageux':
            image.src = './wind.png';
            break;
        case 'partiellement nuageux':
            image.src = './Animation - 1711640709381.gif';
            
            break;
        case 'ciel dégagé':
            image.src = './weather.png';
            break;
        default:
            image.src = './weather.png';
            break;
    }

    const humidityElement = document.createElement('div');
    humidityElement.textContent = `Humidité: ${data.main.humidity}%`;

    const windSpeedElement = document.createElement('div');
    windSpeedElement.textContent = `Vitesse du vent: ${data.wind.speed} m/s`;

    weatherCard.appendChild(locationElement);
    weatherCard.appendChild(image);
    weatherCard.appendChild(temperatureElement);
    weatherCard.appendChild(conditionsElement);
    weatherCard.appendChild(humidityElement);
    weatherCard.appendChild(windSpeedElement);

    weatherContainer.appendChild(weatherCard);
}

// Fonction principale pour obtenir et afficher les données météorologiques de chaque ville
async function fetchAndDisplayWeather() {
    for (const city of cities) {
        const data = await getWeatherData(city);
        displayWeather(city, data);
        console.log(data);
    }
}

// Appel de la fonction pour obtenir et afficher les données météorologiques
fetchAndDisplayWeather();