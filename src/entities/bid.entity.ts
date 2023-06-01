import { Column, Entity } from "typeorm";
import Model from "./model.entity";

@Entity('bids')
export class Bid extends Model{
    @Column()
    userId: string;
    @Column()
    bidItemId: string;
    @Column({
        default: 0
    })
    bidPrice: number
}