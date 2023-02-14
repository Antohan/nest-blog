import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [UsersService, PassportModule],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
