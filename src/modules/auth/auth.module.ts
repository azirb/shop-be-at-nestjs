import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule,ConfigService } from '@nestjs/config';
import { JWTStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule, 
    PassportModule, 
    ConfigModule,
    JwtModule.registerAsync( {
      imports: [ConfigModule], 
      useFactory: (ConfigService : ConfigService) => ({
        secret : ConfigService.get<string>('JWT_SECRET'), 
        signOptions : { expiresIn: ConfigService.get<string>('JWT_EXPIRES'), }
      }),
      inject : [ConfigService]
    })
], 
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JWTStrategy],
})
export class AuthModule {}
