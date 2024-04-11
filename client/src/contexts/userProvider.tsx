'use client'
import { useState, useEffect } from 'react'
import { IUserContext, UserContext } from './userContext'
import { IUser } from '@/interfaces/user.interface'
import { getUserData } from '@/services'

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, SetUser] = useState<IUser | null>()
	useEffect(() => {
		getUserByToken()
	}, [])

	const getUserByToken = async () => {
		const token = window.localStorage.getItem('token')

		if (!token) return

		try {
			const userData = await getUserData(token)
			SetUser(userData.data)
		} catch (error) {
			console.log(error)
			return
		}

		// SetUser({
		// 	id: crypto.randomUUID(),
		// 	username: 'test',
		// 	email: 'test@gamil.com',
		// 	avatarUrl: '/avatar1.jpeg',
		// 	role: 'admin',
		// 	createdAt: new Date(),
		// })
	}

	const setUser = (user: IUser | null) => {
		SetUser(user)
	}

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	)
}
