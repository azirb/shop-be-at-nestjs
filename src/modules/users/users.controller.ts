import { Controller, Get, Post, Param, Put, Delete, Body, HttpException, HttpStatus } from '@nestjs/common';
import { User } from 'src/entitys/user.entity';
import { CreateUsersDto, UpdateUsersDto } from './users.dto';
import { UsersService } from './users.service';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { NotFoundResponse } from '../type'; 

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

    @ApiTags('GET')
    @ApiResponse({status : 200 , description: 'Return a array of users', type : [User]})
    @Get()
    getAllUsers() : Promise<User[]>{
        return this.UsersService.findAll(); 
    }
    
    @ApiTags('GET')
    @ApiResponse({status : 200 , description: 'Return a json format user by id', type : User})
    @ApiResponse({status : 404 , description: 'Not Found', type : NotFoundResponse})
    @Get(':id')
    async getUserbyId(@Param('id') id:number) : Promise<User> {
        const temp =  await this.UsersService.findOne(id); 
        if ( temp  === undefined) 
        {
            throw new HttpException(`Can not get User id = ${id}`,HttpStatus.NOT_FOUND); 
        }
        return temp; 
    }

    @ApiTags('POST/PUT')
    @ApiBody({type: CreateUsersDto})
    @ApiResponse({status : 200 , description: 'Return a message : "User is created everything is OK!" and status code'})
    @Post()
    addUsertoDB(@Body() CreateUsersDto: CreateUsersDto): HttpException{ 
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
        this.UsersService.create(newUser); 
        return new HttpException('User is created everything is OK!',HttpStatus.OK);
        
    }

    @ApiTags('POST/PUT')
    @ApiBody({type: UpdateUsersDto})
    @ApiResponse({status : 200 , description: 'Return a message : "User is updated everything is OK!" and status code'})
    @ApiResponse({status : 404 , description: 'Not Found', type : NotFoundResponse})
    @Put(':id')
    async updateUserInfo(
        @Param('id') id:number, 
        @Body() {firstName,lastName,phone,email,purchasesSum,sex,bithDate,password,isActive,role}: UpdateUsersDto
        ) :Promise<HttpException> {
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
        this.UsersService.update(upUser); 
        return new HttpException('User is updated everything is OK!',HttpStatus.OK);
        
    }

    @ApiTags('DELETE')
    @ApiResponse({status : 200 , description: 'Return a message : "User is deleted everything is OK!" and status code'})
    @Delete(':id')
    userInfoDelete(@Param('id') id:string) : HttpException { 
        this.UsersService.remove(id); 
        return new HttpException('User is deleted everything is OK!',HttpStatus.OK);
        
    }
}
