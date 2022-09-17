import { useState, useEffect, FormEvent } from "react";
import { WeatherContainer } from "./components/WeatherContainer";
import { getWeatherByCoords, getWeatherByCity } from "./api/fetchWeather";
import { SearchBox } from "./components/SearchBox";

function App() {
  const [fetchData, setFetchData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const LAT = position.coords.latitude;
      const LON = position.coords.longitude;

      try {
        const data = await getWeatherByCoords(LAT, LON);
        setFetchData(data);
      } catch (err) {
        setError("Por favor revise su conexión a internet");
      }
    });
  }, []);

  // buscador
  const handleSearch = async (e: FormEvent<HTMLFormElement>, CITY: string) => {
    e.preventDefault();
    setError("");
    try {
      const data = await getWeatherByCity(CITY);
      console.log(data)

      if (data.cod === "404") {
        setError("No se encontró la ciudad 😥, vuelva a escribirla por favor");
      } else if (data === "400") {
        setError("Escriba una ciudad 😁");
      } else {
        setFetchData(data);
      }
    } catch (err) {
      setError("Por favor revise su conexión a internet");
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center mt-12">
      <div>
        <SearchBox handleSearch={handleSearch} />
        <WeatherContainer fetchData={fetchData} error={error} />
      </div>
    </div>
  );
}

export default App;
