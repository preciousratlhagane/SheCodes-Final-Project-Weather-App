function searchQuery(event) {
  event.preventDefault();
  searchInput = document.querySelector("#search-input-value").value;
  searchCity(searchInput);
}

function searchCity(city) {
  let apiKey = "0b8004f43d4a372b990e09e3241c3to7";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherConditionsAndCity);
}

function displayWeatherConditionsAndCity(response) {
  let cityElement = document.querySelector("#current-city");
  currentCity = response.data.city;
  cityElement.innerHTML = currentCity;

  let dateElement = document.querySelector("#current-date");
  let date = new Date(response.data.time * 1000);
  dateElement.innerHTML = currentDate(date);

  let weatherConditionElement = document.querySelector("#weather-condition");
  let weatherCondition = response.data.condition.description;
  weatherConditionElement.innerHTML = weatherCondition;

  let humidityElement = document.querySelector("#humidity-condition");
  let humidity = response.data.temperature.humidity;
  humidityElement.innerHTML = `${humidity}%`;

  let windSpeedElement = document.querySelector("#wind-condition");
  let windSpeed = response.data.wind.speed;
  windSpeedElement.innerHTML = `${windSpeed}km/h`;

  let weatherIconElement = document.querySelector("#weather-icon");
  weatherIconElement.innerHTML = `<img src="${response.data.condition.icon_url}"/>`;

  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.temperature.current);
  temperatureElement.innerHTML = temperature;
  forecastQuery(currentCity);
}

function forecastQuery(city) {
  let apiKey = "0b8004f43d4a372b990e09e3241c3to7";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCurrentForecast);
  console.log(apiUrl);
}

function formatDayOfTheWeek(time) {
  let date = new Date(time * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function displayCurrentForecast(response) {
  console.log(response);
  let forecastHtml = " ";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div class="weather-forecast-dates">
        <div class="weather-forecast-day">${formatDayOfTheWeek(day.time)}</div>
        <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
        <div class="weather-forecast-temperatures">
        <strong id="max-temp">${Math.round(day.temperature.maximum)}°</strong>
        <strong id="min-temp">${Math.round(day.temperature.minimum)}°</strong>
        </div>
        </div>`;
    }
  });

  let forecastElement = document.querySelector("#weather-forecast-details");
  forecastElement.innerHTML = forecastHtml;
}

function currentDate(date) {
  let daysOfTheWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = daysOfTheWeek[date.getDay()];
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (hours < 10) {
    hours = `0${hours}`;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchQuery);

searchCity("Johannesburg");
