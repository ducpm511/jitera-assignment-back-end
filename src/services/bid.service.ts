import { AppDataSource } from '../utils/data-source';
import { Bid } from '../entities/bid.entity';

const bidRepository = AppDataSource.getRepository(Bid);
export const createBid = async (input: Partial<Bid>) => {
    return await bidRepository.save(bidRepository.create({ ...input }));
};

export const findLatestBidByUserAndBidItem = async(bidItemId: string, userId: string) => {
    return await bidRepository.findOne({
        where: {
            bidItemId: bidItemId, userId: userId
        },
        order:{
            created_at: "DESC"
        }
    });
    
};