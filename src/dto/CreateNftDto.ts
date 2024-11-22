import { IsNotEmpty, IsNumber, IsString, IsUrl, IsEnum, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import {NFT} from "@/entities/nft.entity";

export enum NftType {
    IMAGE = 'image',
    VIDEO = 'video',
}

export class CreateNftDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsString()
    @IsNotEmpty()
    currency: string;

    @IsUrl()
    @IsNotEmpty()
    image: string;

    @IsEnum(NftType)
    @IsNotEmpty()
    type: NftType;

    @IsDate()
    @Type(() => Date)
    createdAt: Date;
}

export class UpdateNftDto implements Partial<NFT> {
    title?: string;
    price?: number;
    currency?: string;
    image?: string;
    type?: NftType;
}
