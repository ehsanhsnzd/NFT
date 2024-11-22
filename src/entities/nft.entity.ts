import { BaseEntity } from "@/base/base.entity";
import { Entity, Column } from "typeorm";
import {NftType} from "@/dto/CreateNftDto";

@Entity('nft')
export class NFT extends BaseEntity {
    @Column()
    title: string;

    @Column()
    price: Number;

    @Column()
    currency: string;

    @Column({
        type: 'enum',
        enum: NftType,
        default: NftType.IMAGE,
    })
    type: NftType;

    @Column()
    image: string;
}
