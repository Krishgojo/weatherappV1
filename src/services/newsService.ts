import axios from 'axios';
import { NEWS_API_KEY } from '../config/apiKeys';

export const fetchNews = async (category = 'general') => {
  const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${NEWS_API_KEY}`;
  const { data } = await axios.get(url);
  return data.articles;
};
