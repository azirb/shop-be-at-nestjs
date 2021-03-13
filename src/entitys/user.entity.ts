import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  phone: string; 

  @Column()
  email: string; 

  @Column()
  purchasesSum: number;

  @Column()
  sex: boolean;
  
  @Column()
  bithDate: Date;
  
  @Column()
  passsword: string; 

  @Column({ default: false })
  isActive: boolean;

  @Column({default:'user'})
  role:string; 
}