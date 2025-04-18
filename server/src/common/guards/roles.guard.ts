import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorators/roles.decorator';
import { Request } from 'express';
import { User } from '@database/entities';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const role = this.reflector.get(Roles, context.getHandler());

    if (!role) {
      return true;
    }
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as User | null;

    if (!user || !user.role) {
      return false;
    }
    return this.matchRoles(role, user.role);
  }

  private matchRoles(requiredRole: string, userRole: string): boolean {
    return requiredRole === userRole;
  }
}
