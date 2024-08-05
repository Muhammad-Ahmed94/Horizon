//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

export const userSearch = async (cityName) => {
  const API_KEY = "a41392c52ec93c3bb206018aadc814c5";
  const BASE_URL = `https://api.openweathermap.org/data/2.5/weather/`;

    const response = await fetch(`${BASE_URL}?q=${cityName}&appid=${API_KEY}`)
    const data = await response.json();
    return data;
};
