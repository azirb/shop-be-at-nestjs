import { Injectable } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { AuthService } from "./auth.service";

@Injectable()
export class JWTStrategy  extends PassportStrategy(Strategy, 'jwt'){

    constructor(private AuthService:AuthService, private configService : ConfigService) {
        super({
        secretOrKey : configService.get<string>('JWT_SECRET'), 
        jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration : true
        });  
    }

    async validate(payload : any) : Promise<any>{
        const {iat, exp, ...res} = payload; 
        return res; 
    }
}