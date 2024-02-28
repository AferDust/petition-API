import { Body, Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from "@nestjs/swagger";
import { UserCreateDto } from "src/entities/users/dto/user.create.dto";
import { AuthService } from "./auth.service";
import { JwtRefreshDto } from "./dto/auth.refresh.dto";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req) {
        return this.authService.signIn(req.user);
    }

    @Post("register")
    @HttpCode(HttpStatus.CREATED)
    register(@Body() userData: UserCreateDto) {
        return this.authService.register(userData);
    }

    @HttpCode(HttpStatus.OK)
    @Post("login/refresh")
    refreshToken(@Body() refreshTokenDto: JwtRefreshDto) {
        return this.authService.refreshJWTToken(refreshTokenDto.refresh);
    }
}
