import {ApiProperty} from '@nestjs/swagger'
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity()
export class User {
  @ApiProperty({required : false  , description: 'Auto generated id'})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({description: 'User name'})
  @Column()
  firstName: string;

  @ApiProperty({description: 'User last name'})
  @Column()
  lastName: string;

  @ApiProperty({description: 'User mobile phone'})
  @Column()
  phone: string; 

  @ApiProperty({description: 'User email'})
  @Column()
  email: string; 

  @ApiProperty({required : false, description : 'Sum that user spend in our shop'})
  @Column({default : 0})
  purchasesSum: number;

  @ApiProperty({description: 'User sex'})
  @Column()
  sex: boolean;
  
  @ApiProperty({description: 'User bithday date in 2021-01-03 00:00:00 format'})
  @Column()
  bithDate: Date;
  
  @ApiProperty({description: 'User password to login md5 encryption'})
  @Column()
  password: string; 

  @ApiProperty({required : false , description : 'User is approved acc by phone or email' , default: false})
  @Column({ default: false })
  isActive: boolean;

  @ApiProperty({required : false , description: 'Role user - default purchaser , moderator - can add products and edit anything , admin - have a admin panel access', default : 'user'})
  @Column({default:'user'})
  role:string; 
}