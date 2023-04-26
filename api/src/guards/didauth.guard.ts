// my-custom.guard.ts
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class DidAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    console.log('checking the guard...');

    const request = context.switchToHttp().getRequest();
    // Checking if the header key is === to env header key
    if (request.headers['x-did-key']) {
      if (request.headers['x-did-key'] !== process.env.ADMIN_DID_KEY) {
        throw new UnauthorizedException();
      }

      // Return true if access is allowed, false otherwise
      return true;
    }
    throw new HttpException(
      'x-did-key headers is required',
      HttpStatus.UNAUTHORIZED,
    );
  }
}
