import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWT_Header, MessageConstant } from 'src/utilities/constant';

export class JWTGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest() as Request;
    // Get the JWT token from the request header.
    const JWTHeaderToken = req.headers[JWT_Header];
    if (!JWTHeaderToken) {
      throw new UnauthorizedException(MessageConstant.PleaseLoginToSystem);
    }
    try {
      const tokenData = await this.jwtService.verifyAsync(JWTHeaderToken);
      Object.assign(req, {
        user: tokenData,
      });
      return true;
    } catch (error) {
      console.error(`Unable to verify the token due to ${error.message}`);
      throw new UnauthorizedException(MessageConstant.PleaseLoginToSystem);
    }
  }
}
