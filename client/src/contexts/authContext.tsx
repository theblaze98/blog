'use client'
import {
	createContext,
	useContext,
	useCallback,
	useMemo,
} from 'react'
import Cookies from 'js-cookie'

interface IAuthContext {
	login: (authToken: string) => void
	logout: () => void
	authToken?: string
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const login = useCallback((authToken: string) => {
		Cookies.set('token', authToken)
	}, [])

	const logout = useCallback(() => {
		Cookies.remove('token')
	}, [])

	const values = useMemo(
		() => ({ login, logout, authToken: Cookies.get('token') }),
		[login, logout]
	)

	return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => (useContext(AuthContext))
