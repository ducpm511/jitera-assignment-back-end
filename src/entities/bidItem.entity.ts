import { BeforeInsert, Column, CreateDateColumn, Entity } from "typeorm";
import Model from "./model.entity";

export enum StatusEnumType {
    DRAFT = 'draft',
    PUBLISHED = 'published',
    ONGOING = 'on_going',
    COMPLETED = 'completed'
}
@Entity('bidItems')
export class BidItem extends Model{
    @Column({
        unique: true,
    })
    name: string;

    @Column({
        default: 0,
        type: 'float'
    })
    startedPrice: number;

    @Column({
        default: 0,
        type: 'float'
    })
    currentPrice: number;

    @Column({
        default: 0,
        type: 'float'
    })
    timeWindow: number;

    @Column({
        nullable: true
    })
    publishedAt: string
   
    @Column({
        type: 'enum',
        enum: StatusEnumType,
        default: StatusEnumType.DRAFT,
    })
    status: StatusEnumType;
    @BeforeInsert()
    setCurrentPrice(){
        this.currentPrice = this.startedPrice;
    }
}