'use client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useContext } from 'react'
import {
	Avatar,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	ButtonGroup,
	Button
} from '@nextui-org/react'
import { PUBLIC_ROUTES } from '@/routes'
import { UserContext } from '@/contexts/userContext'
import { IUser } from '@/interfaces/user.interface'

export const Header = () => {
	const router = useRouter()
	const { user, setUser } = useContext(UserContext)
	return (
		<header className='flex justify-between h-20 py-3 px-5'>
			<Link
				href='/'
				className='text-2xl font-medium'>
				Blog
			</Link>
			<div className='flex gap-5'>
				{user ? (
					<Popover>
						<PopoverTrigger>
							<button>
								<Avatar
									size='lg'
									src={user.avatarUrl}
									className='profile-img-button'
								/>
							</button>
						</PopoverTrigger>
						<PopoverContent>
							<Card>
								<CardHeader>
									<Avatar
										className='w-20 h-20 mx-auto'
										src={user.avatarUrl}
									/>
								</CardHeader>
								<CardBody>
									<h2 className='text-xl'>{user.username}</h2>
									<span className='text-foreground-400'>{user.email}</span>
								</CardBody>
								<CardFooter>
									<ButtonGroup>
										<Button>Editar Perfil</Button>
										<Button onClick={() => {
											localStorage.removeItem('token')
											router.push(PUBLIC_ROUTES.LOGIN)
											setUser(null)
										}}>Cerrar Sesion</Button>
									</ButtonGroup>
								</CardFooter>
							</Card>
						</PopoverContent>
					</Popover>
				) : (
					<>
						<Link
							href={PUBLIC_ROUTES.REGISTER}
							className='text-lg'>
							Registrarse
						</Link>
						<Link
							href={PUBLIC_ROUTES.LOGIN}
							className='text-lg'>
							Iniciar Sesion
						</Link>
					</>
				)}
			</div>
		</header>
	)
}
