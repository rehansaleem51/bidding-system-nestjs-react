import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { Item } from './item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuctionGateway } from './auction.gateway';
import { User } from 'src/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Item,User])],
  controllers: [ItemsController],
  providers: [ItemsService,AuctionGateway]
})
export class ItemsModule {}
