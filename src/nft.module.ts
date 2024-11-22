import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NFT } from "@/entities/nft.entity";
import { NftService } from "./services/nft.service";
import { NFTController } from "./app.controller";

@Module({
  imports: [TypeOrmModule.forFeature([NFT])],
  controllers: [NFTController],
  providers: [NftService],
  exports: [NftService],
})
export class NftModule {}
