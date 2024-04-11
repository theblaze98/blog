'use client'
import { useRouter } from 'next/navigation'
import { NextUIProvider } from '@nextui-org/react'
import { UserProvider } from '@/contexts/userProvider'

export const Providers = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter()

	return (
		<NextUIProvider navigate={router.push}>
			<UserProvider>{children}</UserProvider>
		</NextUIProvider>
	)
}
