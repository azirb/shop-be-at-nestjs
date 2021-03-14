import { Controller, Get, Post, Param, Put, Delete, Body, BadRequestException, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { User } from 'src/entitys/user.entity';
import { CreateUsersDto, UpdateUsersDto } from './users.dto';
import { UsersService } from './users.service';

/* 
TODO: 
1. Get(One/Many)
2. Post(One/Many)
3. Put
4. Delete
*/

@Controller('users')
export class UsersController {
    constructor(private readonly UsersService : UsersService) {}

    @Get()
    getAllUsers() : Promise<User[]>{
        return this.UsersService.findAll(); 
    }
    
    @Get(':id')
    async getUserbyId(@Param('id') id:number) : Promise<User> {
        if ( await this.UsersService.findOne(id) === undefined) 
        {
            throw new HttpException(`Can not get User id = ${id}`,HttpStatus.NOT_FOUND); 
        }
        return this.UsersService.findOne(id); 
    }

    @Post()
    addUsertoDB(@Body() CreateUsersDto: CreateUsersDto): Promise<User>{ 
        const newUser = new User() ; 
        newUser.firstName = CreateUsersDto.firstName ; 
        newUser.lastName= CreateUsersDto.lastName ; 
        newUser.phone = CreateUsersDto.phone ; 
        newUser.email = CreateUsersDto.email ; 
        newUser.purchasesSum = CreateUsersDto.purchasesSum ; 
        newUser.sex = CreateUsersDto.sex ; 
        newUser.bithDate = CreateUsersDto.bithDate; 
        newUser.password = CreateUsersDto.password ;
        newUser.isActive = CreateUsersDto.isActive ; 
        newUser.role = CreateUsersDto.role ;
        return this.UsersService.create(newUser); 
    }

    @Put(':id')
    async updateUserInfo(
        @Param('id') id:number, 
        @Body() {firstName,lastName,phone,email,purchasesSum,sex,bithDate,password,isActive,role}: UpdateUsersDto
        ) :Promise<User> {
        const upUser = await this.UsersService.findOne(id); 
        if (upUser === undefined) {
            throw new HttpException(`Can not get User id = ${id}`,HttpStatus.NOT_FOUND); 
        }
        upUser.firstName = firstName ; 
        upUser.lastName= lastName ; 
        upUser.phone = phone ; 
        upUser.email = email ; 
        upUser.purchasesSum = purchasesSum ; 
        upUser.sex = sex ; 
        upUser.bithDate = bithDate; 
        upUser.password = password ;
        upUser.isActive = isActive ; 
        upUser.role = role ;    
        return this.UsersService.update(upUser); 
    }

    @Delete(':id')
    userInfoDelete(@Param('id') id:string) : Promise<void> { 
        return this.UsersService.remove(id); 
    }
}
