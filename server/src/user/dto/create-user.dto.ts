import { z } from 'zod'

export enum ROLE {
  ADMIN = 'admin',
  USER = 'user',
}

export interface CreateUserDto {
  username: string
  email: string
  password: string
  avatarUrl?: string
  role: ROLE
}

export const createUserSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
  avatarUrl: z.string().optional(),
  role: z.enum([ROLE.ADMIN, ROLE.USER]),
})
