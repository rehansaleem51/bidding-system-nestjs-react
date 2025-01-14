import { Body, Controller, Get, HttpCode, HttpStatus, NotFoundException, Param, Post, UseGuards } from '@nestjs/common';
import { ItemsService } from './items.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './item.entity';
import { Repository } from 'typeorm';
import { AuctionGateway } from './auction.gateway';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('items')
export class ItemsController {

constructor(private readonly itemService: ItemsService,@InjectRepository(Item)
        private readonly itemsRepository: Repository<Item>,
        private readonly auctionGateway: AuctionGateway) {}    

    @UseGuards(AuthGuard)
    @Get()   
      findAll(): Promise<Item[]> {     
          return this.itemsRepository.find();
       
    } 

    //get item by id
    @UseGuards(AuthGuard)
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Item> {
        const user = await this.itemService.findOne(id);
        if (!user) {
        throw new NotFoundException('User does not exist!');
        } else {
        return user;
        }
    }

    @UseGuards(AuthGuard)
    @Post()
    async create(@Body() item: Item): Promise<Item> {
      return this.itemService.create(item);
    }

    @UseGuards(AuthGuard)
    @Post('bid')
    @HttpCode(HttpStatus.OK)
    async placeBid(@Body() request: { itemId: number, userId: number, bidAmount: number }) {
        
        const response = (await this.itemService.placeBid(request.itemId, request.userId, request.bidAmount)) as any;
        if(response.statusCode == 200){
            
        const wsResponse: any = {
            itemId: response.item.id,
            highestBid: response.item.highest_bid,
            highestBidBy: response.item.highest_bid_by,
        };
        this.auctionGateway.placeBidToRoom("room"+request.itemId, wsResponse);
        return {
            statusCode: response.statusCode,
            status: "succcess",
            message: "Bid placed successfully"
            };
        }
        else {
            return {
                statusCode: response.statusCode,
                status: "failed",
                message: response.message
            };
        }
        
    }
}
