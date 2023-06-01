import {
    FindOptionsRelations,
    FindOptionsSelect,
    FindOptionsWhere,
} from 'typeorm';
import { BidItem } from '../entities/bidItem.entity';
import { AppDataSource } from '../utils/data-source';

const bidItemRepository = AppDataSource.getRepository(BidItem);

export const createBidItem = async (input: Partial<BidItem>) => {
    return await bidItemRepository.save(bidItemRepository.create({ ...input }));
};

export const getBidItem = async (postId: string) => {
    return await bidItemRepository.findOneBy({ id: postId });
};

export const findBidItems = async (
    where: FindOptionsWhere<BidItem> = {},
    select: FindOptionsSelect<BidItem> = {},
    relations: FindOptionsRelations<BidItem> = {}
) => {
    return await bidItemRepository.find({
        where,
        select,
        relations,
    });
};

