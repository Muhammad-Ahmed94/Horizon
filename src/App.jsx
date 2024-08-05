import { useState } from "react";
import { useEffect } from "react";
import { dateFormat } from "./DateFormat";
import { timeStamps } from "./TimeStamps";
import { userSearch } from "./userSearch";
import "./global.css";


//* Icons
import {
  IoLogoGithub,
  IoLogoInstagram,
  IoGitBranch,
} from "react-icons/io5";
import { IoLogoLinkedin } from "react-icons/io";
import { ImPower } from "react-icons/im";
import { AiOutlineLoading } from "react-icons/ai";


const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [cityName, setCityName] = useState("");

  const API_KEY = import.meta.env.VITE_OPENWEATHER_API;   //* Your openweather API key here.
  const BASE_URL = `https://api.openweathermap.org/data/2.5/weather/`;

  //* Get locationn weather data when DOM loads.
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(gotLocation, failure);
    } else {
      alert("Browser is not suported");
    }
  }, []);

  //* Get weather data based on user's location
  const gotLocation = async (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    try {
      const response = await fetch(
        `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );
      if (!response.ok) {
        alert("incorrect info");
      }
      const data = await response.json();
      console.log(data);
      setWeatherData(data);
    } catch (error) {
      console.error(error);
    }
  };
  //* Fail to get user's location. User acces denied.
  const failure = () => {
    alert("Access denied");
  };

  //* Get weather data based on user's search.
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const fetchData = await userSearch(cityName);
      setWeatherData(fetchData);
      setCityName("");
    } catch (error) {
      alert("incorect city name");
      console.error(error);
    }
  };

  //* Displaying data in the DOM
  return (
    <div className="relative">
      {weatherData ? (
        <div className="flex flex-col">
          <div className="bg-color_head h-20 w-full px-10 flex justify-between items-center">
            <header className="bg-slate-600 h-10 rounded px-5 py-2 font-bold text-white text-lg">
              Horizon
            </header>
            <nav className="flex justify-center items-center gap-2">
              <form onSubmit={handleFormSubmit}>
                <input
                  className="p-2 rounded focus-within:outline-none"
                  onChange={(e) => setCityName(e.target.value)}
                  value={cityName}
                  type="text"
                  placeholder="Enter location..."
                />
                <button style={{ display: "none" }} type="submit">
                  search
                </button>
              </form>
            </nav>
          </div>

          <main className="bg-color_main2 h-full rounded">
            <div className="h-[80vh] w-full flex flex-col items-center justify-center gap-4">
              <div className="text-2xl font-bold">
                <p>{dateFormat()}</p>
                <p>
                  <span>
                    {weatherData.name}, <span>{weatherData.sys.country}</span>
                  </span>
                </p>
              </div>
              <div className="bg-stone-500 flex flex-col mt-4 justify-center items-center h-48 w-48 rounded z-40 shadow-2xl text-3xl font-bold">
                <div className="">
                  {(weatherData.main.temp - 273.5).toFixed(2)}°C
                </div>
                <img
                  className=""
                  src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                  alt="weather-icon"
                />
                <div className="bg-white flex flex-col items-end p-2 rounded">
                  <p>{weatherData.weather[0].main}</p>
                  <p className="text-sm">
                    {weatherData.weather[0].description}
                  </p>
                </div>
              </div>

              <div className="shadow-xl z-10 rounded text-2xl border border-stone-700 p-2 flex justify-center items-center gap-4">
                <div className="flex flex-col gap-1 justify-center items-center">
                  <p>Humidity: {weatherData.main.humidity}</p>
                  <p>
                    Air Speed: {(weatherData.wind.speed * 3.6).toFixed(1)}Km/h
                  </p>
                </div>
                <div className="flex flex-col gap-1 justify-center items-center">
                  <p>
                    sunrise:
                    {timeStamps(weatherData.sys.sunrise, weatherData.timezone)}
                  </p>
                  <p>
                    sunset:
                    {timeStamps(weatherData.sys.sunset, weatherData.timezone)}
                  </p>
                </div>
              </div>
            </div>
          </main>

          <footer className="bg-color_foot py-5 h-25 text-3xl">
            <div className="flex gap-4 justify-center items-center hover-button">
              <a href="https://github.com/Muhammad-Ahmed94" target="_blank">
                <IoLogoGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/muneeb-ahmed-544a01254/"
                target="_blank"
              >
                <IoLogoLinkedin />
              </a>
              <a
                href="https://github.com/Muhammad-Ahmed94/Horizon"
                target="_blank"
              >
                <IoGitBranch />
              </a>
              <a
                href="https://www.instagram.com/muneeb_ahmed._/"
                target="_blank"
              >
                <IoLogoInstagram />
              </a>
            </div>
            <div className="flex justify-center items-center">
              <span>
                Powered by <ImPower className="inline mr-1" />
                <a
                  className="underline font-bold"
                  href="https://openweathermap.org/"
                  target="_blank"
                >
                  Open Weather API
                </a>
              </span>
            </div>
          </footer>
        </div>
      ) : (
        <p className="flex bg-color_main2 h-screen w-screen text-5xl justify-center my-auto items-center">
          <span>
            <AiOutlineLoading className="animate-spin mr-2" />
          </span>{" "}
          Loading...
        </p>
      )}
    </div>
  );
};

export default App;
