import {Body, Controller, Delete, Get, Param, Post, Put, Query} from '@nestjs/common';
import { NftService } from './services/nft.service';
import {CreateNftDto, NftType} from "@/dto/CreateNftDto";

@Controller('nft')
export class NFTController {
  constructor(private readonly service: NftService) {}

  @Post('create')
  create(@Body() createUserDto: CreateNftDto) {
    return this.service.create(createUserDto);
  }

  @Get()
  async findAll(
      @Query('priceMin') priceMin: number,
      @Query('priceMax') priceMax: number,
      @Query('type') type: NftType,
      @Query('sortBy') sortBy: 'price' | 'createdAt',
      @Query('order') order: 'ASC' | 'DESC',
      @Query('page') page: number = 1,
      @Query('limit') limit: number = 10,
  ) {
    const query = {
      priceMin,
      priceMax,
      type,
      sortBy,
      order,
      page,
      limit,
    };

    return this.service.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Put(':id')
  update(
      @Param('id') id: string,
      @Body() CreateNftDto: CreateNftDto,
  ) {
    return this.service.update(id, CreateNftDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
