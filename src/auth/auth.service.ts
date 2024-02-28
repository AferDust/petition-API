import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserCreateDto } from 'src/entities/users/dto/user.create.dto';
import { UserService } from '../entities/users/user.service';
import { User } from '../entities/users/users.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(login: string, password: string): Promise<User> {
        const user: User = await this.userService.findOneByLogin(login);
        this.isNotUserExists(user);

        this.isMatch(password, user.password);
        return user;
    }

    async signIn(user: User) {
        return this.getAccessRefreshToken(user);
    }

    async register(userCreateDto: UserCreateDto) {
        const existsUser: User = await this.userService.findOneByLogin(userCreateDto.login);
        this.areUserExists(existsUser);

        const hashedPassword = await bcrypt.hash(userCreateDto.password, 10);
        userCreateDto.password = hashedPassword;

        const user: User = await this.userService.create(userCreateDto);
        return this.signIn(user);
    }

    private async getAccessRefreshToken(user: User) {
        const payload = { pk: user.id, login: user.login };
        console.log("get-tokens", user);

        return {
            access: await this.jwtService.signAsync(payload),
            refresh: await this.jwtService.signAsync(payload, {
                expiresIn: "24h",
            }),
        };
    }

    async refreshJWTToken(refreshToken: string) {
        const decodedToken = await this.jwtService.verify(refreshToken);
        const payload = { pk: decodedToken.pk, login: decodedToken.login };

        return {
            access: await this.jwtService.signAsync(payload),
        };
    }

    areUserExists(instance: User) {
        if (instance)
            throw new BadRequestException('User already exists');
    }

    isNotUserExists(instance: User) {
        if (!instance)
            throw new BadRequestException('User not found');
    }

    isMatch(userPassword: string, typedPassword: string) {
        if (!bcrypt.compareSync(userPassword, typedPassword))
            throw new UnauthorizedException('Login or password incorrect');
    }
}