'use client'
import { useContext, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Input, Button, Card, CardHeader, CardBody } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import { PUBLIC_ROUTES } from '@/routes'
import { UserContext } from '@/contexts/userContext'
import { login } from '@/services'

export type LoginFormValues = {
	email: string
	password: string
}

export const LoginForm = () => {
	const router = useRouter()
	const { setUser } = useContext(UserContext)
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<LoginFormValues>()

	const onSubmit = async (data: LoginFormValues) => {
		console.log(data)
		setUser({
			id: crypto.randomUUID(),
			username: 'test',
			email: 'test@gamil.com',
			avatarUrl: '/avatar1.jpeg',
			role: 'admin',
			createdAt: new Date(),
		})
		router.push('/')
		try {
			const userData = await login(data)
			console.log(userData)
			localStorage.setItem('token', userData.data.token)
			setUser(userData.data.user)
			router.push('/')
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<Card className='max-w-sm w-full'>
			<CardHeader>
				<h2 className='text-2xl text-center w-full'>Iniciar Sesion</h2>
			</CardHeader>
			<CardBody>
				<form
					className='flex gap-5 flex-col'
					onSubmit={handleSubmit(onSubmit)}>
					<Input
						type='email'
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
					<Button
						type='submit'
						color='primary'>
						Iniciar Sesion
					</Button>
					<Link
						href={PUBLIC_ROUTES.REGISTER}
						className='text-xs text-blue-500 text-center'>
						No Tengo Cuenta
					</Link>
				</form>
			</CardBody>
		</Card>
	)
}
