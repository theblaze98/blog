'use client'
import { useForm } from 'react-hook-form'

type RegisterFormValues = {
	username: string
	email: string
	avatarUrl: FileList
	password: string
}

export const RegisterForm = () => {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<RegisterFormValues>()

	const onSubmit = async (data: RegisterFormValues) => {
		console.log(data)
		const imgUrl = URL.createObjectURL(data.avatarUrl[0])
		console.log(imgUrl)
	}

	return (
		<div>
			<form
				className=''
				onSubmit={handleSubmit(onSubmit)}>
				<div>
					<label htmlFor=''>Username</label>
					<input {...register('username', { required: true, minLength: 4 })} />
				</div>
				<div>
					<label htmlFor=''>Email</label>
					<input
						{...register('email', { required: true, minLength: 4 })}
						type='email'
					/>
				</div>
				<div>
					<label htmlFor=''>Password</label>
					<input
						{...register('password', { required: true, minLength: 4 })}
						type='password'
					/>
				</div>
				<div>
					<label htmlFor=''>Password</label>
					<input
						{...register('avatarUrl', { required: true, minLength: 4 })}
						type='file'
						accept='image/*'
					/>
				</div>
				<button type='submit'>Registrarse</button>
			</form>
		</div>
	)
}
