import { SetMetadata } from '@nestjs/common'
import { ROLE } from '@/user/dto/create-user.dto'
import { ROLES_KEY } from '@/helpers'

export const Roles = (...roles: ROLE[]) => SetMetadata(ROLES_KEY, roles)
