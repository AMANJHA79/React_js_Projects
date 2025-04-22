
import axios from "axios";

const API_KEY = "2122c379f4ab075570681bc963270c82";

export const fetchWeather = async (cityName) => {
    const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`;
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${API_KEY}`;

    try {
        const [currentRes, forecastRes] = await Promise.all([
            axios.get(currentWeatherURL),
            axios.get(forecastURL)
        ]);

        return {
            current: currentRes.data,
            forecast: forecastRes.data
        };
    } catch (error) {
        console.error("Error fetching weather data:", error);
        throw error;
    }
};
