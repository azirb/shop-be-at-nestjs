import {ApiProperty} from '@nestjs/swagger'
import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';



@Entity()
export class Orders {
  @ApiProperty({required : false  , description: 'Auto generated id'})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({required : true , description: 'User id who just buy a product'})
  @Column()
  userid : number; 

  @ApiProperty({required : true , description: 'List of product in text(string[]) format'})
  @Column("simple-array")
  order : string[]; 

  @ApiProperty({required : true , description: 'All order cost'})
  @Column("double")
  cost : number; 

  @ApiProperty({required : false, description:'Status of order true - coming to client , false - still at storage',  default : false})
  @Column({default: false})
  status : boolean; 
  
  @ApiProperty({required : true, description:'Client adress for delivery'})
  @Column()
  address: string; 
}