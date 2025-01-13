import { User } from 'src/users/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  starting_price: number;

  @Column({ nullable: true })
  highest_bid: number;

  @ManyToOne(() => User)
  highest_bid_by: User

  @Column({type: 'datetime'})
  auction_end_datetime: string;

  
}