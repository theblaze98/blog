import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ROLES_KEY } from '@/helpers'
import { ROLE } from '@/user/dto/create-user.dto'

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRole = this.reflector.getAllAndOverride<ROLE[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (!requiredRole) return true

    const { user } = context.switchToHttp().getRequest()

    const isRoleValid = requiredRole.some((role) => user.role?.includes(role))

    if (!isRoleValid) throw new UnauthorizedException('USER_UNAUTHORIZED')

    return true
  }
}
