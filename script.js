// API keyes and URL
const apiKey = "9fb049715e9c6a02fc508d93328a4c78";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

// Check weather function with the fetch API
async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    // Checks for valid searches by city
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        var data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp * 9 / 5 + 32) + " ᴼF";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = Math.round(data.wind.speed * 2) + " mph";

        // Changes the images based on the weather data for each city or country
        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "clouds.png";
        }
        else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "clear.png";
        }
        else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "rain.png";
        }
        else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "drizzle.png";
        }
        else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "mist.png";
        }
        document.querySelector(".error").style.display = "none";
        document.querySelector(".weather").style.display = "block";
    }
}
// Search button click function
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

// Allows users to press enter instead of the search button
searchBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const city = searchBox.value.trim();
        checkWeather(city);
    }
});