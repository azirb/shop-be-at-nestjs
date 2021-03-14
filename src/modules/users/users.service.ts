import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; 
import { Repository } from 'typeorm'; 
import { User } from 'src/entitys/user.entity';


@Injectable()
export class UsersService {
    constructor ( 
        @InjectRepository(User)
        private readonly usersRepository : Repository<User>
    ) {}
    
    findAll(): Promise<User[]> {
        return this.usersRepository.find();
      }
    
      findOne(id: number): Promise<User> {
        return this.usersRepository.findOne(id);
      }
    
      async remove(id: string): Promise<void> {
        await this.usersRepository.delete(id);
      }

       create(User : User) : Promise<User>{
          delete User.id; 
            return this.usersRepository.save(User); 
      }

      update(User : User) : Promise<User>{
        return this.usersRepository.save(User); 
    }
}

