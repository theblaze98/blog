export interface IUser {
	id: string
	avatarUrl: string | undefined
	username: string
	email: string
	role: 'admin' | 'user'
	createdAt: Date
}

export interface ICreateUserResponse {
	user: IUser
	token: string
}
