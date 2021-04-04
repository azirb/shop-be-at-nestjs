import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'; 
import { UsersService } from '../users/users.service'
import { User } from 'src/entitys/user.entity';




@Injectable()
export class AuthService {
   
    constructor (
    private UsersService : UsersService, 
    private jwtService: JwtService
    ) {}

    async validateUser(phone:string, pass: string): Promise<any>{
        const user : User[] = await this.UsersService.findByPhone(phone); 
        if (user[0] && user[0].password === pass){
            const {password, ...secureUser} = user[0]; 
            return secureUser; 
        }
        return null; 
    }

    async login(user : User) {
       const payload = { id : user.id} ; 
       return {
           accessToken : this.jwtService.sign(payload)
       }
    }
}
