import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { BearerStrategy } from 'src/auth/strategies/bearer.strategy';

@Module({
  imports: [UserModule, PassportModule],
  providers: [AuthService, BearerStrategy]
})
export class AuthModule {}
