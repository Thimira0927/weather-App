const apiKey = "e9cef5ca570c169a2ef91d3a4b0e3916"

/* Search weather by city */

async function getWeather(){

const city = document.getElementById("city").value
const result = document.getElementById("result")
const forecastDiv = document.getElementById("forecast")

result.innerHTML="Loading..."

const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)

if(!response.ok){
result.innerHTML="City not found"
forecastDiv.innerHTML=""
return
}

const data = await response.json()

  const icon = data.weather[0].icon;
const iconUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

document.getElementById("icon").src = iconUrl;

/* Current Weather */

result.innerHTML=`
<h2>${data.name}</h2>

<img id="weatherIcon"
src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">

<p>Temperature: ${data.main.temp} °C</p>
<p>Weather: ${data.weather[0].description}</p>
`

/* 5 Day Forecast */

const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`)

const forecastData = await forecastResponse.json()

let forecastHTML="<h3>5 Day Forecast</h3>"

for(let i=0;i<5;i++){

const day = forecastData.list[i*8]

forecastHTML += `
<p>
${day.dt_txt.split(" ")[0]} :
${day.main.temp} °C
</p>
`

}

forecastDiv.innerHTML=forecastHTML

}

/* Enter key search */

document.getElementById("city").addEventListener("keypress",function(e){

if(e.key==="Enter"){
getWeather()
}

})

/* GPS Location Weather */

function getLocationWeather(){

const result=document.getElementById("result")
const forecastDiv=document.getElementById("forecast")

if(navigator.geolocation){

navigator.geolocation.getCurrentPosition(async function(position){

const lat=position.coords.latitude
const lon=position.coords.longitude

result.innerHTML="Loading location weather..."

const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)

const data=await response.json()

result.innerHTML=`
<h2>${data.name}</h2>

<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">

<p>Temperature: ${data.main.temp} °C</p>
<p>Weather: ${data.weather[0].description}</p>
`

forecastDiv.innerHTML=""

})

}
else{

alert("Geolocation not supported")

}

}

/* Dark Mode */

function toggleDarkMode(){

document.body.classList.toggle("dark-mode")

}
