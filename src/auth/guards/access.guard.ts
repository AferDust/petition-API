import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserService } from '../../entities/users/user.service';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log("I'm here");
    const request = context.switchToHttp().getRequest();

    console.log("Step 1");
    const token = this.extractJwtFromHeaders(request);
    if (!token)
      throw new UnauthorizedException();
    console.log("Step 2");
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      request["user"] = payload;

      console.log("Step 3");
    } catch {
      throw new UnauthorizedException();
    }
    console.log("Step 4");
    const user = await this.userService.findOneById(request.user.id);
    if (!user)
      throw new BadRequestException("User with this id not found in database");

    console.log("Step 5");
    return true;
  }

  private extractJwtFromHeaders(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }

}