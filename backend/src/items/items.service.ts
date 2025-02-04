import { Injectable } from '@nestjs/common';
import { Item } from './item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import * as moment from 'moment-timezone';  

@Injectable()
export class ItemsService {

    constructor(
            @InjectRepository(Item)
            private readonly itemRepository: Repository<Item>,
            @InjectRepository(User)
            private readonly userRepository: Repository<User>,
            private dataSource: DataSource,
          ) {}
        
          async create(item:Partial<Item>): Promise<Item> {
            const newItem = this.itemRepository.create(item);
            return this.itemRepository.save(newItem);
          }

          async placeBid(itemId: number, userId: number, bidAmount: number): Promise<any> {
            const queryRunner: QueryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
            const item = await queryRunner.manager.findOne(Item,{ where: { id: itemId },
              lock: { mode: 'pessimistic_write' }, });
            if (!item) {
              throw new Error('Item not found');
            }
           
            // const currentTime = new Date();
            
            // const auctionEndTime = new Date(item.auction_end_datetime);
            // const adjustedAuctionEndTime = new Date( auctionEndTime.getTime() + ( auctionEndTime.getTimezoneOffset() * 60000 ) ).getTime();
            
            const auctionEndTime = moment.tz(item.auction_end_datetime,'Asia/Karachi'); // Parse the auction end time
            const currentTime = moment.tz(); // Get the current time
            
            if (currentTime.isAfter(auctionEndTime)) {
              await queryRunner.rollbackTransaction(); // Explicit rollback
                return {
                    statusCode: 999,
                    message: "Auction has ended",
                  };
              //throw new Error('Auction has ended');
            }
        
            if (item.highest_bid && bidAmount <= item.highest_bid) {
              await queryRunner.rollbackTransaction(); // Explicit rollback
                return {
                    statusCode: 998,
                    message: "Bid must be higher than the current highest bid",
                  };
              //throw new Error('Bid must be higher than the current highest bid');
            }

            if (!item.highest_bid && bidAmount <= item.starting_price) {
              await queryRunner.rollbackTransaction(); // Explicit rollback
                return {
                    statusCode: 997,
                    message: "Bid must be higher than the starting price",
                  };
                //throw new Error('Bid must be higher than the starting price');
              }
        
            item.highest_bid = bidAmount;
            item.highest_bid_by = await this.userRepository.findOne({ where: { id: userId } });
            const updatedItem = await queryRunner.manager.save(item);
            
            await queryRunner.commitTransaction();
            return {
                statusCode: 200,
                item: updatedItem,
              };
            } catch (error) {
              await queryRunner.rollbackTransaction();
              return {
                statusCode: 996,
                message: "Bid rejected",
              };
            } finally {
              await queryRunner.release();
            }
            
          }
        
            async findAll(): Promise<Item[]> {
                return this.itemRepository.find();
            }

            async findOne(id: number): Promise<Item> {
                return this.itemRepository.findOne({ where: { id: id } });
            }
}
