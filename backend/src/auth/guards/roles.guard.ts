import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../roles.enum'
import { ROLES_KEY } from '../decorators/roles.decorators';

@Injectable()

export class RoleGuard implements CanActivate{
    constructor(private reflector: Reflector){}

    canActivate(context: ExecutionContext): boolean {
        const requieredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requieredRoles) return true;

        const  {user} = context.switchToHttp().getRequest();
        if (!user || !user.roles) {
            return false; 
        }
        return requieredRoles.some((role) => user.roles?.includes(role));
    }
}