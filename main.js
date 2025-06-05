const apiKey = '56106e6a203241bdb5791940251101';
const apiUrl = 'https://api.weatherapi.com/v1/forecast.json';

let input = document.querySelector("#input");
let searchBtn = document.querySelector("#searchBtn");
let icon = document.querySelector("#image-icon");
let tempC = document.querySelector("#tempC");
let tempF = document.querySelector("#tempF");
let city = document.querySelector(".city");
let country = document.querySelector("#country");
let uv = document.querySelector("#uv");
let heatC = document.querySelector("#heatC");
let heatF = document.querySelector("#heatF");
let windDir = document.querySelector("#wind-dir");
let windKm = document.querySelector("#wind-km");
let windMile = document.querySelector("#wind-mile");
let visKm = document.querySelector("#vis-km");
let visMile = document.querySelector("#vis-mile");
let time = document.querySelector("#time");
let forCastDaysCon = document.querySelector(".forCastDays-con");

const fetchWeather = async (location) => {
    try {
        const response = await fetch(`${apiUrl}?key=${apiKey}&q=${location}&days=7&aqi=yes&alerts=yes`);
        const data = await response.json();

        // Update Weather Details
        icon.src = `https:${data.current.condition.icon}`;
        tempC.textContent = `${data.current.temp_c}°C`;
        tempF.textContent = `${data.current.temp_f}°F`;
        city.textContent = data.location.name;
        country.textContent = data.location.country;
        uv.textContent = `UV: ${data.current.uv}`;
        heatC.textContent = `Heat Index: ${data.current.feelslike_c}°C`;
        heatF.textContent = `${data.current.feelslike_f}°F`;
        windDir.textContent = `Direction: ${data.current.wind_dir}`;
        windKm.textContent = `Kilometers per hour: ${data.current.wind_kph}`;
        windMile.textContent = `Miles per hour: ${data.current.wind_mph}`;
        visKm.textContent = `Kilometers: ${data.current.vis_km}`;
        visMile.textContent = `Miles: ${data.current.vis_miles}`;
        time.textContent = `${data.location.localtime.split(' ')[1]}`;

       
        forCastDaysCon.innerHTML = "";
        data.forecast.forecastday.forEach((day) => {
            const dayElement = document.createElement("div");
            dayElement.className = "days";
            dayElement.innerHTML = `
                <span>${new Date(day.date).toLocaleDateString("en-US", { weekday: 'short' })}</span>
                <span>${day.day.avgtemp_c}°C</span>
                <img style="width: 25%;" src="https:${day.day.condition.icon}" alt="Weather Icon">
            `;
            forCastDaysCon.appendChild(dayElement);
        });
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
};


searchBtn.addEventListener("click", () => {
    const location = input.value.trim();
    if (location) fetchWeather(location);
});


fetchWeather("London");
