import Link from 'next/link'
import { PUBLIC_ROUTES } from '@/routes'

export const Header = () => {
  return (
    <header className='flex justify-between py-3 px-5'>
      <Link href='/' className='text-2xl font-medium'>Blog</Link>
      <div className='flex gap-5'>
        <Link href={PUBLIC_ROUTES.REGISTER} className='text-lg' >Registrarse</Link>
        <Link href={PUBLIC_ROUTES.LOGIN} className='text-lg' >Iniciar Sesion</Link>
      </div>
    </header>
  )
}
