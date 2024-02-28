import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from '../../entities/users/users.entity';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            usernameField: 'login',
        });
    }

    async validate(login: string, password: string): Promise<User> {
        console.log(login + " " + password);
        return await this.authService.validateUser(login, password);
    }
}