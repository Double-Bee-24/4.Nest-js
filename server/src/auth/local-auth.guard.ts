import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext) {
    const result = (await super.canActivate(context)) as boolean;
    const request = context
      .switchToHttp()
      .getRequest<
        Request & { logIn: (err: any, user: any, info: any) => void }
      >();
    await super.logIn(request);

    return result;
  }
}

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  canActivate(context: ExecutionContext): Promise<any> | boolean {
    const req = context
      .switchToHttp()
      .getRequest<Request & { isAuthenticated: () => boolean }>();
    return req.isAuthenticated();
  }
}
