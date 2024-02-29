import { Body, Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from "@nestjs/swagger";
import { UserCreateDto } from "src/entities/users/dto/user.create.dto";
import { AuthService } from "./auth.service";
import { JwtRefreshDto } from "./dto/auth.refresh.dto";
import { SignInDto } from "./dto/auth.signIn.dto";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard('local'))
    @Post('sign-in')
    async signIn(@Body() signInDto: SignInDto, @Request() req) {
        return this.authService.signIn(req.user);
    }

    @Post("sign-up")
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
