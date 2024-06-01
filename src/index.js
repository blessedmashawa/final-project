function dateTime(timestamp) {
   let now = new Date(timestamp);
   let date = now.getDate();
   let hours = now.getHours();
   let minutes = now.getMinutes();
   let year = now.getFullYear();
   let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
   let day = days[now.getDay()];
   let months = [
     "Jan",
     "Feb",
     "Mar",
     "Apr",
     "May",
     "Jun",
     "Jul",
     "Aug",
     "Sep",
     "Oct",
     "Nov",
     "Dec",
   ];
   let month = months[now.getMonth()];
   let formattedDate = ${day} ${month} ${date}, ${hours}:${minutes}, ${year};
   return formattedDate;
 }
 
 function displayForecast(response) {
   let forecastElement = document.querySelector("#forecast");
   let forecastHTML = ``;
   response.data.daily.forEach(function (day, index) {
     if (index < 5) {
       forecastHTML += `
          <div class="col-2">
            <div class="weather-forecast-date">${formatDay(day.time)}</div>
            <div id="weather-forecast-icon"><img src="${
              day.condition.icon_url
            }" alt="Weather icon" /></div>
            <div class="weather-forecast-temp">
              <span class="weather-forecast-temp-max">${Math.round(
                day.temperature.maximum
              )}°</span>
              <span class="weather-forecast-temp-min">${Math.round(
                day.temperature.minimum
              )}°</span>
            </div>
          </div>
        `;
     }
   });
   forecastElement.innerHTML = forecastHTML;
 }
 
 function formatDay(timestamp) {
   let date = new Date(timestamp * 1000);
   let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
   return days[date.getDay()];
 }
 
 function getForecast(coordinates) {
   let apiKey = "b2a5adcct04b33178913oc335f405433";
   let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
   axios.get(apiUrl).then(displayForecast);
 }
 
 function showWeatherTemp(response) {
   let temperatureElement = document.querySelector("#temperature");
   let cityElement = document.querySelector("#city");
   let humidityElement = document.querySelector("#humidity");
   let windElement = document.querySelector("#wind-speed");
   let dateElement = document.querySelector("#time");
   let descriptionElement = document.querySelector("#description");
   let icon = document.querySelector("#icon");
 
   cityElement.innerHTML = response.data.city;
   temperatureElement.innerHTML = Math.round(response.data.temperature.current);
   humidityElement.innerHTML = response.data.temperature.humidity;
   descriptionElement.innerHTML = response.data.condition.description;
   windElement.innerHTML = ${response.data.wind.speed} Km/h;
   dateElement.innerHTML = dateTime(response.data.time * 1000);
   icon.innerHTML = <img src="${response.data.condition.icon_url}" alt="Weather icon" />;
 
   getForecast(response.data.coordinates);
 }
 
 function searchCity(city) {
   let apiKey = "b2a5adcct04b33178913oc335f405433";
   let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
   axios.get(apiUrl).then(showWeatherTemp);
 }
 
 function submit(event) {
   event.preventDefault();
   let city = document.querySelector("#search-form-input").value;
   document.querySelector("#city").innerHTML = city;
   searchCity(city);
 }
 
 function searchLocation(position) {
   let apiKey = "b2a5adcct04b33178913oc335f405433";
   let latitude = position.coords.latitude;
   let longitude = position.coords.longitude;
   let apiUrl = `https://api.shecodes.io/weather/v1/current?lat=${latitude}&lon=${longitude}&key=${apiKey}&units=metric`;
   axios.get(apiUrl).then(showWeatherTemp);
 }
 
 function getCurrentLocation(event) {
   event.preventDefault();
   navigator.geolocation.getCurrentPosition(searchLocation);
 }
 
 let date = document.querySelector("#time");
 date.innerHTML = dateTime(new Date().getTime());
 let searchForm = document.querySelector(".search-form");
 searchForm.addEventListener("submit", submit);
 // let currentButton = document.querySelector("#current-location-button");
 // currentButton.addEventListener("click", getCurrentLocation);
 searchCity("Gweru");
