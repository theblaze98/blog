import axios from 'axios'
import Toastify from 'toastify-js'

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL

export const axiosConfig = axios.create({
	baseURL: BASE_URL,
})

axiosConfig.interceptors.response.use(
	response => {
		return response
	},
	error => {
		Toastify({
			text: error.response.data.message,
			duration: 5000,
			gravity: 'bottom',
			position: 'right',
			close: true,
			style: {
				position: 'fixed',
				bottom: '0.5rem',
				right: '1rem',
				padding: '0.75rem 1rem',
				'border-radius': '0.375rem',
				border: '2px solid #991B1B',
				'background-color': '#EF4444',
				transition: 'all cubic-bezier(0.4, 0, 0.2, 1) 300ms'
			},
		}).showToast()

		return Promise.reject(error)
	}
)
