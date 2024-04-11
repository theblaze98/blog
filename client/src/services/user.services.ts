import { RegisterFormValues } from '@/app/register/components/register-form'
import { axiosConfig } from '@/helpers'
import { ICreateUserResponse, IUser } from '@/interfaces/user.interface'

export const createUser = async ({
	email,
	password,
	username,
	avatarUrl,
}: RegisterFormValues) => {
	const body = new FormData()
	body.append('username', username)
	body.append('email', email)
	body.append('password', password)
	body.append('role', 'user')
	body.append('file', avatarUrl[0])

	const res = await axiosConfig.post<ICreateUserResponse>(
		'auth/register',
		body,
		{
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		}
	)

	return res
}

export const updateAvatar = async (avatar: File, token: string) => {
	const body = new FormData()
	body.append('file', avatar)
	const res = await axiosConfig.patch<IUser>('user/upload_avatar', body, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})

	return res
}

export const login = async ({
	email,
	password,
}: {
	email: string
	password: string
}) => {
	const res = await axiosConfig.post<ICreateUserResponse>('auth/login', {
		email,
		password,
	})
	return res
}

export const getUserData = async (token: string) => {
	const res = await axiosConfig.get<IUser>('user/get_user_data', {
		headers: { Authorization: `Bearer ${token}` },
	})
	return res
}
