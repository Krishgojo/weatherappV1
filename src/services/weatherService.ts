import axios from 'axios';
import {WEATHER_API_KEY} from '../config/apiKeys';

export const fetchWeather = async (location: any) => {
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${location}&days=5&aqi=no&alerts=no`;
  const {data} = await axios.get(url);
  return data;
};
