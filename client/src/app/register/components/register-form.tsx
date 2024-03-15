'use client'
import { useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Input, Button, Card, CardHeader, CardBody, Avatar } from '@nextui-org/react'
import { createUser, uploadAvatar } from '@/services'
import { useForm } from 'react-hook-form'
import { PUBLIC_ROUTES } from '@/routes'

export type RegisterFormValues = {
	username: string
	email: string
	avatarUrl: FileList
	password: string
}

export const RegisterForm = () => {
	const router = useRouter()
	const [avatar, setAvatar] = useState('')
	const avatarRef = useRef<HTMLInputElement>(null)
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<RegisterFormValues>()

	const onSubmit = async (data: RegisterFormValues) => {
		console.log(data)
		const userData = await createUser(data)
		console.log(userData)
		localStorage.setItem('token', userData.data.token)
		const res = await uploadAvatar(data.avatarUrl[0], userData.data.token)
		console.log(res)
		router.push('/')
	}

	const onChangeFile = () => {
		const file = avatarRef.current?.files
		if (!file) return
		const avatarUrl = URL.createObjectURL(file[0])
		console.log(avatarUrl)
		setAvatar(avatarUrl)
	}

	return (
		<Card className='max-w-sm w-full'>
			<CardHeader>
				<h2 className='text-2xl text-center'>Registrarse</h2>
			</CardHeader>
			<CardBody>
				<form
					className='flex gap-5 flex-col'
					onSubmit={handleSubmit(onSubmit)}>
					<Input
						type='text'
						{...register('username', { required: true, minLength: 4 })}
						variant='bordered'
						label='Username'
						color='primary'
						required
						errorMessage={!!errors.username && 'Ingrese un username'}
					/>
					<Input
						type='text'
						{...register('email', {
							required: true,
							minLength: 4,
							pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/,
						})}
						variant='bordered'
						label='Email'
						color='primary'
						required
						errorMessage={!!errors.email && 'Ingrese un email'}
					/>
					<Input
						type='password'
						{...register('password', { required: true, minLength: 4 })}
						variant='bordered'
						label='Contraseña'
						color='primary'
						required
						errorMessage={!!errors.password && 'Ingrese un username'}
					/>
					<div>
						<label htmlFor='avatar' className='flex gap-3 items-center cursor-pointer'>
							<Avatar src={avatar} size='lg' />
							<span className='text-sm text-blue-400'>Imagen de Perfil</span>
						</label>
						<input
							{...register('avatarUrl', { required: true, minLength: 4 })}
							type='file'
							accept='image/*'
							className='hidden'
							id='avatar'
							ref={avatarRef}
							onChange={onChangeFile}
						/>
					</div>
					<Button
						type='submit'
						color='primary'
						onClick={handleSubmit(onSubmit)}>
						Registrarse
					</Button>
					<Link
						href={PUBLIC_ROUTES.LOGIN}
						className='text-xs text-blue-500 text-center'>
						Ya Tengo Cuenta
					</Link>
				</form>
			</CardBody>
		</Card>
	)
}
