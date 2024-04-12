'use client'
import { useState, useEffect, createContext, useContext } from 'react'
import { IUser } from '@/interfaces/user.interface'
import { useAuthContext } from './authContext'

export interface IUserContext {
	user?: IUser | null
	setUser: (user: IUser | null) => void
}

export const UserContext = createContext<IUserContext>({} as IUserContext)

import { getUserData } from '@/services'

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, SetUser] = useState<IUser | null>()
	const { authToken } = useAuthContext()

	useEffect(() => {
		const getUserByToken = async () => {
			try {
				const userData = await getUserData(authToken || '')
				SetUser(userData.data)
			} catch (error) {
				SetUser(null)
			}
		}
		getUserByToken()
	}, [authToken])

	const setUser = (user: IUser | null) => {
		SetUser(user)
	}

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	)
}

export const useUserContext = () => useContext(UserContext)
