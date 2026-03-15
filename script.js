const apiKey = "e9cef5ca570c169a2ef91d3a4b0e3916";

async function getWeather() {

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

if(!response.ok){
result.innerHTML = "City not found";
return;
}

const data = await response.json();

const icon = data.weather[0].icon;
const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

result.innerHTML = `
<h2>${data.name}</h2>

<img src="${iconUrl}">

<p>Temperature: ${data.main.temp} °C</p>

<p>Weather: ${data.weather[0].description}</p>
`;

}catch(error){

result.innerHTML = "Error loading weather data";

}

}
