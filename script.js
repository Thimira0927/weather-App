const apiKey = "e9cef5ca570c169a2ef91d3a4b0e3916";

/* CHANGE BACKGROUND BASED ON WEATHER */

function changeBackground(weather){

const video = document.getElementById("bg-video");

if(weather.includes("cloud")){
video.src = "clouds.mp4";
}

else if(weather.includes("rain")){
video.src = "rain.mp4";
}

else if(weather.includes("clear")){
video.src = "sunny.mp4";
}

else{
video.src = "background.mp4";
}

}


/* CITY WEATHER */

async function getWeather(){

const city = document.getElementById("city").value;
const result = document.getElementById("result");

if(city === ""){
result.innerHTML = "Please enter a city";
return;
}

result.innerHTML = "Loading...";

try{

const response = await fetch(
`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
);

const data = await response.json();

if(response.status !== 200){
result.innerHTML = "City not found";
return;
}

const icon = data.weather[0].icon;

/* CHANGE BACKGROUND */

changeBackground(data.weather[0].main.toLowerCase());

result.innerHTML = `
<h2>${data.name}</h2>

<img id="weatherIcon"
src="https://openweathermap.org/img/wn/${icon}@2x.png">

<p>Temperature: ${data.main.temp} °C</p>

<p>${data.weather[0].description}</p>
`;

getForecast(city);

}catch(error){

result.innerHTML = "Error loading weather";

}

}


/* 5 DAY FORECAST */

async function getForecast(city){

const forecastDiv = document.getElementById("forecast");

try{

const response = await fetch(
`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
);

const data = await response.json();

forecastDiv.innerHTML = "";

for(let i=0;i<5;i++){

const day = data.list[i*8];
const icon = day.weather[0].icon;

forecastDiv.innerHTML += `

<div class="forecast-card">

<p>${new Date(day.dt_txt).toDateString()}</p>

<img src="https://openweathermap.org/img/wn/${icon}.png">

<p>${day.main.temp} °C</p>

</div>

`;

}

}catch(error){

forecastDiv.innerHTML = "Forecast error";

}

}


/* LOCATION WEATHER */

function getLocationWeather(){

const result = document.getElementById("result");

if(!navigator.geolocation){
result.innerHTML = "Geolocation not supported";
return;
}

result.innerHTML = "Getting location...";

navigator.geolocation.getCurrentPosition(async position => {

const lat = position.coords.latitude;
const lon = position.coords.longitude;

try{

const response = await fetch(
`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
);

const data = await response.json();

const icon = data.weather[0].icon;

/* CHANGE BACKGROUND */

changeBackground(data.weather[0].main.toLowerCase());

result.innerHTML = `

<h2>${data.name}</h2>

<img id="weatherIcon"
src="https://openweathermap.org/img/wn/${icon}@2x.png">

<p>Temperature: ${data.main.temp} °C</p>

<p>${data.weather[0].description}</p>

`;

getForecast(data.name);

}catch(error){

result.innerHTML = "Location weather error";

}

}, function(){

result.innerHTML = "Location permission denied";

});

}


/* DARK MODE */

function toggleDarkMode(){

document.body.classList.toggle("dark-mode");

}


/* AUTO WEATHER LOAD */

window.onload = function(){

getLocationWeather();

};
