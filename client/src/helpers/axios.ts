import axios from 'axios'

// const BASE_URL = process.env.BACKEND_URL

export const axiosConfig = axios.create({
	baseURL: 'https://blog-1leb.onrender.com/api/',
})
