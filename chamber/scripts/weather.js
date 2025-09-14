const weatherContainer = document.querySelector("#weather");
const forecastContainer = document.querySelector("#forecast");

const apiKey = "YOUR_API_KEY"; // Replace with your real API key
const city = "Accra"; // You can make this dynamic later
const units = "metric"; // Celsius

async function getWeather() {
  try {
    // Current Weather
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    const weatherResponse = await fetch(weatherURL);
    const weatherData = await weatherResponse.json();

    const icon = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
    const temp = Math.round(weatherData.main.temp);
    const desc = weatherData.weather[0].description;

    weatherContainer.innerHTML = `
      <h3>Current Weather</h3>
      <img src="${icon}" alt="${desc}">
      <p><strong>${temp}°C</strong></p>
      <p>${desc}</p>
    `;

    // Forecast (next 3 days at 12:00)
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
    const forecastResponse = await fetch(forecastURL);
    const forecastData = await forecastResponse.json();

    forecastContainer.innerHTML = "<h3>3-Day Forecast</h3>";

    const noonForecasts = forecastData.list.filter(f => f.dt_txt.includes("12:00:00")).slice(0, 3);
    noonForecasts.forEach(day => {
      const date = new Date(day.dt_txt).toLocaleDateString("en-GB", { weekday: "short" });
      const icon = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
      forecastContainer.innerHTML += `
        <div class="forecast-day">
          <p>${date}</p>
          <img src="${icon}" alt="${day.weather[0].description}">
          <p>${Math.round(day.main.temp)}°C</p>
        </div>
      `;
    });

  } catch (err) {
    console.error("Weather API error:", err);
    weatherContainer.innerHTML = "<p>Unable to load weather.</p>";
  }
}

getWeather();


const spotlightContainer = document.querySelector("#spotlight");

async function loadSpotlight() {
  try {
    const response = await fetch("data/members.json");
    const members = await response.json();

    // Filter Gold (3) and Silver (2)
    const filtered = members.filter(m => m.membership >= 2);

    // Shuffle & Pick 2–3
    const selected = filtered.sort(() => 0.5 - Math.random()).slice(0, 3);

    spotlightContainer.innerHTML = "<h2>Member Spotlight</h2>";

    selected.forEach(member => {
      spotlightContainer.innerHTML += `
        <div class="spotlight-card">
          <img src="${member.image}" alt="${member.name}">
          <h3>${member.name}</h3>
          <p>${member.description}</p>
          <a href="${member.website}" target="_blank">Visit Website</a>
        </div>
      `;
    });

  } catch (err) {
    console.error("Spotlight error:", err);
    spotlightContainer.innerHTML = "<p>Unable to load spotlight members.</p>";
  }
}

loadSpotlight();