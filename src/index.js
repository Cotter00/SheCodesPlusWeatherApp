let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let timeZone = now.toLocaleTimeString([], {
  hour: "numeric",
  minute: "2-digit",
  timeZoneName: "short",
});
let day = days[now.getDay()];
let date = now.getDate();
let year = now.getFullYear();
let months = [
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
  "December",
];
let month = months[now.getMonth()];

function formatDate() {
  let newDates = `${day}, ${month} ${date}, ${year}`;
  return newDates;
}
function formatTime() {
  let newTimes = `${timeZone}`;
  return newTimes;
}
function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#mainCity");
  let cityInput = document.getElementById("city-input");
  return (cityElement.innerHTML = cityInput.value);
}

//Feature #1 Week 4

let todaysDate = document.querySelector("h3");
todaysDate.innerHTML = formatDate();

let todaysTime = document.querySelector("h4");
todaysTime.innerHTML = formatTime();

//Feature #2 Week 4
let searchForms = document.querySelector("#search-form");
searchForms.addEventListener("submit", search);

//Week 5 HW

function displayWeatherCondition(response) {
  let iconElement = document.querySelector("#icon");

  fahrenheitTemperature = response.data.main.temp;

  document.querySelector("#mainCity").innerHTML = response.data.name;
  document.querySelector("#mainTemp").innerHTML = `${Math.round(
    response.data.main.temp
  )}°`;

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#high-temp").innerHTML = `${Math.round(
    response.data.main.temp_max
  )}°`;
  document.querySelector("#low-temp").innerHTML = `${Math.round(
    response.data.main.temp_min
  )}°`;
  document.querySelector("#weatherDescription").innerHTML =
    response.data.weather[0].description;

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function searchCity(city) {
  let apiKey = "2a2eaa51d996796495bf456e5b58adf4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "2a2eaa51d996796495bf456e5b58adf4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Provincetown");

function displayCelciusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperatureUnit");

  fahrenheitLink.classList.remove("active");
  celciusLink.classList.add("active");
  let celciusTemperature = (fahrenheitTemperature - 32) * (5 / 9);
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  fahrenheitLink.classList.add("active");
  celciusLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
