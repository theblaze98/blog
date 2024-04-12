'use client'
import { useRouter } from 'next/navigation'
import { NextUIProvider } from '@nextui-org/react'
import { UserProvider } from '@/contexts/userContext'
import { AuthProvider } from '@/contexts/authContext'

export const Providers = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter()

	return (
		<NextUIProvider navigate={router.push}>
			<AuthProvider>
				<UserProvider>{children}</UserProvider>
			</AuthProvider>
		</NextUIProvider>
	)
}
