const apiKey = "e9cef5ca570c169a2ef91d3a4b0e3916";

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

const icon = data.weather[0].icon;

result.innerHTML = `
<h2>${data.name}</h2>
<img src="https://openweathermap.org/img/wn/${icon}@2x.png">
<p>Temperature: ${data.main.temp} °C</p>
<p>${data.weather[0].description}</p>
`;

getForecast(city);

}catch(error){

result.innerHTML = "Error loading weather";

}

}


async function getForecast(city){

const forecastDiv = document.getElementById("forecast");

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

}


function getLocationWeather(){

navigator.geolocation.getCurrentPosition(async position=>{

const lat = position.coords.latitude;
const lon = position.coords.longitude;

const response = await fetch(
`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
);

const data = await response.json();

document.getElementById("result").innerHTML = `
<h2>${data.name}</h2>
<p>${data.main.temp} °C</p>
<p>${data.weather[0].description}</p>
`;

});

}


function toggleDarkMode(){

document.body.classList.toggle("dark");

}
