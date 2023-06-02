import { NextFunction, Request, Response } from 'express';
import {
    CreateBidItemInput,
    DeleteBidItemInput,
    GetBidItemInput,
    UpdateBidItemInput,
    GetBidItemsByStatusInput
} from '../schemas/bidItem.schema';
import { createBidItem, findBidItems, getBidItem } from '../services/bidItem.service';
import AppError from '../utils/appError';

// ? POST method:- Create a new BidItem
export const createBidItemHandler = async (
    req: Request<{}, {}, CreateBidItemInput>,
    res: Response,
    next: NextFunction
) => {
    try {

        const bidItem = await createBidItem(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                bidItem,
            },
        });
    } catch (err: any) {
        if (err.code === '23505') {
            return res.status(409).json({
                status: 'fail',
                message: 'Bid Item with that name already exist',
            });
        }
        next(err);
    }
};


// ? GET method:- Get a BidItem
export const getBidItemHandler = async (
    req: Request<GetBidItemInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const bidItem = await getBidItem(req.params.bidItemId);

        if (!bidItem) {
            return next(new AppError(404, 'Bid Item with that ID not found'));
        }

        res.status(200).json({
            status: 'success',
            data: {
                bidItem,
            },
        });
    } catch (err: any) {
        next(err);
    }
};

// ? GET method:- Get all BidItems
export const getBidItemsHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const bidItems = await findBidItems({}, {}, {});

        res.status(200).json({
            status: 'success',
            data: {
                bidItems,
            },
        });
    } catch (err: any) {
        next(err);
    }
};

export const getBidItemsByStatusHandler = async (
    req: Request<GetBidItemsByStatusInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const bidItems = await findBidItems({status: req.body.status}, {}, {});

        res.status(200).json({
            status: 'success',
            data: {
                bidItems,
            },
        });
    } catch (err: any) {
        next(err);
    }
};

// ? PATCH method:- Update BidItem
export const updateBidItemHandler = async (
    req: Request<UpdateBidItemInput['params'], {}, UpdateBidItemInput['body']>,
    res: Response,
    next: NextFunction
) => {
    try {
        const bidItem = await getBidItem(req.params.bidItemId);

        if (!bidItem) {
            return next(new AppError(404, 'BidItem with that ID not found'));
        }

        Object.assign(bidItem, req.body);

        const updatedBidItem = await bidItem.save();

        res.status(200).json({
            status: 'success',
            data: {
                post: updatedBidItem,
            },
        });
    } catch (err: any) {
        next(err);
    }
};

// ? POST method:- Delete BidItem
export const deleteBidItemHandler = async (
    req: Request<DeleteBidItemInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const bidItem = await getBidItem(req.params.bidItemId);

        if (!bidItem) {
            return next(new AppError(404, 'BidItem with that ID not found'));
        }

        await bidItem.remove();

        res.status(204).json({
            status: 'success',
            data: null,
        });
    } catch (err: any) {
        next(err);
    }
};