// Declare Constants
const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");

// My OpenWeather API Key
const apiKey = "81fa7bd3f8b116b86e02e9aa61114adc";

// When the "Get Weather" button is clicked...
weatherForm.addEventListener("submit", async (event) => {
  // Prevent automatic page refresh
  event.preventDefault();
  // Get the city from the input
  const city = cityInput.value;
  // If there is a valid city...
  if (city) {
    try {
      // Get the weather data
      const weatherData = await getWeatherData(city);
      // Call the displayWeatherInfo function to take care of the rest
      displayWeatherInfo(weatherData);
      // If there was an error in fetching data...
    } catch (error) {
      // Display the error in the console
      console.error(error);
      // Display the error in the HTML
      displayError(error);
    }
    // If not, display error message
  } else {
    displayError("Please Enter a City!");
  }
});

async function getWeatherData(city) {
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  // Wait for the data to be fetched before proceeding
  const response = await fetch(apiURL);

  // If the response came back invalid, throw error
  if (!response.ok) {
    throw new Error("Could not fetch weather data");
    // If it was successful, return it in JSON format
  } else {
    return await response.json();
  }
}

function displayWeatherInfo(data) {
  // Destructure the data from the response object
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }],
  } = data;

  // Get rid of any previous text
  card.textContent = "";
  // Make the card visible by changing its display
  card.style.display = "flex";

  // Assign new variables that we will fill in with the data
  const cityDisplay = document.createElement("h1");
  const temperatureDisplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");
  const descriptionDisplay = document.createElement("p");
  const weatherEmoji = document.createElement("p");

  // Add the weather data
  cityDisplay.textContent = city;
  temperatureDisplay.textContent = `${((temp - 273.15) * (9 / 5) + 32).toFixed(1)}°F`;
  humidityDisplay.textContent = `Humidity: ${humidity}%`;
  descriptionDisplay.textContent = description;
  weatherEmoji.textContent = getWeatherEmoji(id);

  // Add the CSS class
  cityDisplay.classList.add("cityDisplay");
  temperatureDisplay.classList.add("temperatureDisplay");
  humidityDisplay.classList.add("humidityDisplay");
  descriptionDisplay.classList.add("descriptionDisplay");
  weatherEmoji.classList.add("weatherEmoji");

  // Append it to the card
  card.appendChild(cityDisplay);
  card.appendChild(temperatureDisplay);
  card.appendChild(humidityDisplay);
  card.appendChild(descriptionDisplay);
  card.appendChild(weatherEmoji);
}

// Weather codes from OpenWeather
function getWeatherEmoji(weatherId) {
  if (weatherId >= 200 && weatherId <= 232) {
    return "⛈️";
  } else if (weatherId >= 300 && weatherId <= 321) {
    return "☔";
  } else if (weatherId >= 500 && weatherId <= 531) {
    return "🌧️";
  } else if (weatherId >= 600 && weatherId <= 622) {
    return "❄️";
  } else if (weatherId >= 700 && weatherId <= 781) {
    return "🌫️";
  } else if (weatherId === 800) {
    return "☀️";
  } else if (weatherId >= 801 && weatherId <= 804) {
    return "☁️";
  } else {
    return "❔";
  }
}

function displayError(message) {
  // Create a "p" element
  const errorDisplay = document.createElement("p");
  // Make it display the specific mnessage content
  errorDisplay.textContent = message;
  // Add the CSS class of "errorDisplay"
  errorDisplay.classList.add("errorDisplay");

  // Make the entire card have nothing to display, other than the error message
  card.textContent = "";
  // This could be "block" or any other display type, just not "none", which is what it previously had
  card.style.display = "flex";
  // Finally, add the element to the card
  card.appendChild(errorDisplay);
}
