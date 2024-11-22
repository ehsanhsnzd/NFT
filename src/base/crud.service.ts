import {Injectable, Logger, NotFoundException, Type} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {DeepPartial, Repository} from "typeorm";
import { BaseEntity } from "./base.entity";

type CreateEntityInput<EntityCls extends BaseEntity> = DeepPartial<EntityCls>;

export interface ICrudService<EntityCls extends BaseEntity> {
    repo: Repository<EntityCls>;
    create(input: CreateEntityInput<EntityCls>): Promise<EntityCls>;
    findOne(id: string): Promise<EntityCls>;
    remove(id: string): Object;
}

export const CrudService = <EntityCls extends BaseEntity>(entityCls: Type<EntityCls>) => {
    @Injectable()
    class CrudServiceHost implements ICrudService<EntityCls> {
        public readonly logger = new Logger(`${entityCls.name}CrudService`);

        constructor(
            @InjectRepository(entityCls as any)
            public readonly repo: Repository<EntityCls>,
        ) {}

        create(input: CreateEntityInput<EntityCls>) {
            console.error(input)
            return this.repo.save(input);
        }

        async findOne(id: string) {
            const nft = await this.repo.findOne({
                where: { id: id as any },
            });

            if (!nft) {
                throw new NotFoundException(`NFT with ID ${id} not found`);
            }

            return nft;
        }

        async remove(id: string) {
            const nft = await this.repo.findOne({
                where: { id: id as any },
            });

            if (!nft) {
                throw new NotFoundException(`NFT with ID ${id} not found`);
            }

            await this.repo.remove(nft);
            return { message: `NFT with ID ${id} deleted successfully` };
        }
    }

    return CrudServiceHost;
};

