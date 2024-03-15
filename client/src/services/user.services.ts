import { RegisterFormValues } from '@/app/register/components/register-form'
import { axiosConfig } from '@/helpers'

export const createUser = async ({
	email,
	password,
	username,
}: RegisterFormValues) => {
	const res = await axiosConfig.post('auth/register', {
		email,
		username,
		password,
		role: 'user',
	})

	return res
}

export const uploadAvatar = async (avatar: File, token: string) => {
	const body = new FormData()
	body.append('file', avatar)
	const res = await axiosConfig.patch('user/upload_avatar', body, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})

	return res
}
