import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const result = await super.canActivate(context);

    if (typeof result !== 'boolean') {
      throw new Error();
    }

    // Set cookies
    await super.logIn(context.switchToHttp().getRequest());

    return result;
  }
}

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  canActivate(context: ExecutionContext): Promise<any> | boolean {
    const req = context.switchToHttp().getRequest<Request>();
    return req.isAuthenticated();
  }
}
