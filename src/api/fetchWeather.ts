const API_KEY = "bf8222826b2d283f9679d2cb46f16673"


export const getWeatherByCoords =async (LAT:number,LON:number):Promise<any> => {
  const API_COORDS = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${API_KEY}`;
  const response = await fetch(API_COORDS);
  const data = response.json();
  return data;
}

export const getWeatherByCity =async (CITY:string):Promise<any> => {
  const API_CITY = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}`;
  const response = await fetch(API_CITY);
  const resData = response.json();
  return resData;
}