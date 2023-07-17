import axios from 'axios'

export const baseApi = axios.create({
  // baseURL: 'http://localhost:80/',
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const apiKeyParams: string = 'b678645635d51670b818796f8ecbf6ef'