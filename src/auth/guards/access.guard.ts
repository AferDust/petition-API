import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../entities/users/user.service';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = this.extractJwtFromHeaders(request);
    if (!token)
      throw new UnauthorizedException();

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      request["user"] = payload;

    } catch {
      throw new UnauthorizedException();
    }

    const user = await this.userService.findOneById(request.user.id);
    if (!user)
      throw new BadRequestException("User with this id not found in database");


    return true;
  }

  private extractJwtFromHeaders(request: any): string | null {
    const authHeader = request.headers.authorization;
    if (!authHeader)
      return null;


    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return null;
    }

    const token = parts[1];
    return token;
  }
}