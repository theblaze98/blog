import { compare, hash } from 'bcryptjs'

export const encryptPassword = async (password: string): Promise<string> => {
  return await hash(password, 8)
}

export const comparePassword = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  return await compare(password, hashedPassword)
}
