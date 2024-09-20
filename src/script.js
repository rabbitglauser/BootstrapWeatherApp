document.getElementById('weather-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const city = document.getElementById('city').value;
    const apiKey = '0fc842512fbabfce10fcb31079322c80'; // Replace with your OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('City not found');
        const data = await response.json();

        const weatherResult = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <p>Temperature: ${data.main.temp} °C</p>
            <p>Weather: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
        `;
        document.getElementById('weather-result').innerHTML = weatherResult;
    } catch (error) {
        document.getElementById('weather-result').innerHTML = `<p class="text-danger">${error.message}</p>`;
    }
});

const cloudContainer = document.querySelector('.clouds');

// Function to create a cloud
function createCloud() {
    const cloud = document.createElement('div');
    cloud.classList.add('cloud');
    cloud.classList.add(`cloud${Math.floor(Math.random() * 4) + 1}`); // Random class from cloud1 to cloud4
    cloud.style.left = `${Math.random() * 100}vw`; // Random horizontal position
    cloud.style.top = `${Math.random() * 100}vh`; // Random vertical position
    cloudContainer.appendChild(cloud);

    // Remove the cloud after it moves off-screen
    setTimeout(() => cloud.remove(), 16000); // Adjust time to match animation duration
}

// Create a cloud every 3 seconds
setInterval(createCloud, 3000);

