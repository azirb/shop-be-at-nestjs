import { Controller, UseGuards, Post,Request,Get} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {

    constructor(private authService : AuthService) {}

    @ApiTags('jwt login system')
    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user); 
    }

    @ApiTags('jwt login system')
    @UseGuards(AuthGuard('jwt'))
    @Get('info')
    async getInfo(@Request() req) {
        return req.user; 
    }

}
