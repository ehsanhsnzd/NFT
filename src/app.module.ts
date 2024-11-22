import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NftModule } from "@/nft.module";
import {NFT} from "@/entities/nft.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'mydb',
      entities: [NFT],
      synchronize: true,
    }),
    NftModule,
  ],
})
export class AppModule {}
