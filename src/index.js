let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let timeZone = now.toLocaleTimeString([], {
  hour: "numeric",
  minute: "2-digit",
  timeZoneName: "short"
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
  "December"
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
  let cityElement = document.querySelector("h1");
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
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("h5").innerHTML = `${Math.round(
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
