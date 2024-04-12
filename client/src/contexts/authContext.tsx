'use client'
import { createContext, useContext, useState } from 'react'
import Cookies from 'js-cookie'

interface IAuthContext {
	login: (token: string) => void
	logout: () => void
	authToken?: string
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [authToken, setAuthToken] = useState(Cookies.get('token'))

	const login = (token: string) => {
		Cookies.set('token', token)
		setAuthToken(token)
	}

	const logout = () => {
		Cookies.remove('token')
		setAuthToken(undefined)
	}

	const values = { login, logout, authToken }

	return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => useContext(AuthContext)
