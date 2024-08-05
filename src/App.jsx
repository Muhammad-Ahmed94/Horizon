//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
//https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

import { useState } from "react";
import { useEffect } from "react";
import { dateFormat } from "./DateFormat";
import './global.css';

//* Icons
import {
  IoLocationOutline,
  IoLogoGithub,
  IoLogoInstagram,
  IoGitBranch,
} from "react-icons/io5";
import { IoLogoLinkedin } from "react-icons/io";
import { ImPower } from "react-icons/im";


const App = () => {
  const [ weatherData, setWeatherData ] = useState();

  const API_KEY = "a41392c52ec93c3bb206018aadc814c5";
  const BASE_URL = `https://api.openweathermap.org/data/2.5/weather/`;

  //* Location weather data
  useEffect(() => {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, failure)
    } else {
      alert("Browser is not suported");
    }
  }, []);

  const success = async (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    const response = await fetch(`${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
    const data = await response.json();
    console.log(data);
    setWeatherData(data);
  }
  const failure = () => {
    alert("Access denied");
  }

  return (
    <div>
      {weatherData ? (
        <div className="flex flex-col">
          <div className="bg-color_head h-20 w-full px-10 flex justify-between items-center">
            <header className="bg-slate-600 h-10 rounded px-5 py-2 font-bold text-white text-lg">
              Horizon
            </header>
            <nav className="flex justify-center items-center gap-2">
              <input
                className="p-2 rounded focus-within:outline-none "
                type="text"
                placeholder="Enter location..."
              />
              <button className="rounded p-2 bg-slate-600 text-white font-bold text-xl">
                <IoLocationOutline />
              </button>
            </nav>
          </div>

          <main className="bg-color_main2">
            <div className="h-[80vh] w-full flex flex-col items-center justify-center gap-4">
              <div className="">
                <p>{dateFormat()}</p>
                <p>
                  <span>
                    {weatherData.name}, <span>{weatherData.sys.country}</span>
                  </span>
                </p>
              </div>
              <div>
                <div className="bg-white h-48 w-48 rounded shadow-2xl z-10 flex justify-center items-center text-4xl font-bold">
                  {(weatherData.main.temp - 273.5).toFixed(2)}°C
                </div>
              </div>

              <div className="bg-slate-500 w-[22rem] flex justify-between gap-10">
                <div className="flex flex-col gap-1 justify-center items-center">
                  <p>Humidity: {weatherData.main.humidity}</p>
                  <p>
                    Air Speed: {(weatherData.wind.speed * 3.6).toFixed(1)}Km/h
                  </p>
                </div>
                <div className="flex flex-col gap-1 justify-center items-center">
                  <p>sunrise:{weatherData.sys.sunrise}</p>
                  <p>sunset:{weatherData.sys.sunset}</p>
                </div>
              </div>
            </div>
          </main>

          <footer className="bg-color_foot py-5 h-25 absolute w-full bottom-0 text-3xl">
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
        <p>Loading...</p>
      )}
    </div>
  );
};

export default App;
