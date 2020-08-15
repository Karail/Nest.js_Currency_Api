import { Strategy } from 'passport-http-bearer';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class BearerStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService
    ) {
        super();
    }

    async validate(token: string) {
        console.log(token);
        const user = await this.authService.validateUser(token);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}