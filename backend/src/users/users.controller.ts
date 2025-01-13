import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Controller('users')
export class UsersController {

constructor(private readonly usersService: UsersService,@InjectRepository(User)
        private readonly userRepository: Repository<User>) {}    

@Get('seed')   
seedUsers(): Promise<void> {     
    return this.usersService.seedUsers();   
  }
  
@Get()   
  findAll(): Promise<User[]> {     
      return this.userRepository.find();
   
    } 
}
