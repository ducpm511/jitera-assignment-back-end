import { CreateBidInput } from "../schemas/bid.schema"
import { NextFunction, Request, Response } from 'express';
import { getBidItem } from "../services/bidItem.service";
import { findUserById } from "../services/user.service";
import AppError from "../utils/appError";
import { createBid, findLatestBidByUserAndBidItem } from "../services/bid.service";
export const createBidHandler = async (
    req: Request<{}, {}, CreateBidInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const currentDate = new Date();
        const utcDate = new Date(
            currentDate.getUTCFullYear(),
            currentDate.getUTCMonth(),
            currentDate.getUTCDate(),
            currentDate.getUTCHours(),
            currentDate.getUTCMinutes(),
            currentDate.getUTCSeconds(),
            currentDate.getUTCMilliseconds()
        );
        const bidItem = await getBidItem(req.body.bidItemId);
        const user = await findUserById(req.body.userId);

        const bidPrice = req.body.bidPrice;
        let isValidItem = false;
        let isValidUser = false;

        if (!bidItem) {
            return next(new AppError(404, 'Bid Item with that ID not found'));
        } else if (bidItem.status == 'draft') {
            return next(new AppError(404, 'Bid Item is not published yet')); //check for date
        } else if (bidPrice <= bidItem.currentPrice) {
            return next(new AppError(400, 'Bid Price must be greater than the item highest price'));
        } else {
            isValidItem = true
            // console.log(bidItem.startAt);

            
        }
        if (!user) {
            return next(new AppError(404, 'Cannot find user with that id'));
        } else {
            isValidUser = true
        }
        if (isValidItem && isValidUser) {
            const bid = await findLatestBidByUserAndBidItem(bidItem.id, user.id);
            if (!bid) {
                const newBid = await createBid(req.body);
                let bidItemObj = bidItem;
                if (newBid) {
                    bidItemObj.currentPrice = newBid.bidPrice;
                    Object.assign(bidItem, bidItemObj);
                    await bidItem.save();
                }

                // console.log(newBid);
                res.status(201).json({
                    status: 'success',
                    data: {
                        newBid,
                    },
                });
            } else {
                const latestBidTime = new Date(bid.created_at);
                
                
                const timeDifferenceInSeconds = Math.abs(utcDate.getTime() - latestBidTime.getTime()) / 1000;


                if (timeDifferenceInSeconds > 5) {
                    const newBid = await createBid(req.body);
                    let bidItemObj = bidItem;
                    if (newBid) {
                        bidItemObj.currentPrice = newBid.bidPrice;
                        Object.assign(bidItem, bidItemObj);
                        await bidItem.save();
                    }

                    // console.log(newBid);
                    res.status(201).json({
                        status: 'success',
                        data: {
                            newBid,
                        },
                    });
                }
                else {
                    return next(new AppError(400, 'Need to wait 5s before create a new bid'));
                }
            }


        }

    } catch (error) {

    }
}