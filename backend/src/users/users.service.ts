import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
      ) {}
    
      async seedUsers() {
        const users = Array.from({ length: 100 }, (_, i) => {
          const user = new User();
          user.username = `user${i + 1}`;
          return user;
        });
    
        await this.userRepository.save(users);
      }

      async findOne(username: string): Promise<User | undefined> {
        return this.userRepository.findOne({ where: { username } });
      }
      
}
