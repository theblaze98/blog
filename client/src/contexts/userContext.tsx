'use client'
import { IUser } from '@/interfaces/user.interface'
import { createContext } from 'react'

export interface IUserContext {
	user?: IUser | null
	setUser: (user: IUser | null) => void
}

export const UserContext = createContext<IUserContext>({} as IUserContext)
