import { Injectable, NotFoundException, Type } from "@nestjs/common";
import { CrudService } from "@/base/crud.service";
import { NFT } from "@/entities/nft.entity";
import { BaseEntity } from "@/base/base.entity";
import { NftType, UpdateNftDto } from "@/dto/CreateNftDto";

interface FindNftsQuery {
    priceMin?: number;
    priceMax?: number;
    type?: NftType;
    sortBy?: 'price' | 'createdAt';
    order?: 'ASC' | 'DESC';
    page?: number;
    limit?: number;
}

@Injectable()
export class NftService extends CrudService(NFT as Type<BaseEntity>) {
    async findAll(query: FindNftsQuery) {
        const { priceMin, priceMax, type, sortBy = 'createdAt', order = 'ASC', page = 1, limit = 10 } = query;

        const queryBuilder = this.repo.createQueryBuilder('nft');

        if (priceMin) {
            queryBuilder.andWhere('nft.price >= :priceMin', { priceMin });
        }

        if (priceMax) {
            queryBuilder.andWhere('nft.price <= :priceMax', { priceMax });
        }

        if (type) {
            queryBuilder.andWhere('nft.type = :type', { type });
        }

        queryBuilder.orderBy(`nft.${sortBy}`, order);

        queryBuilder.skip((page - 1) * limit).take(limit);

        const [nfts, total] = await queryBuilder.getManyAndCount();

        return {
            data: nfts,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }

    async update(id: string, UpdateNftDto: UpdateNftDto) {
        const nft = await this.repo.preload({
            id,
            ...UpdateNftDto,
        });

        if (!nft) {
            throw new NotFoundException(`NFT not found`);
        }

        return this.repo.save(nft);
    }
}
