import express from 'express';
import {
    createBidItemHandler,
    deleteBidItemHandler,
    getBidItemHandler,
    getBidItemsHandler,
    updateBidItemHandler,
} from '../controllers/bidItem.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { validate } from '../middleware/validate';
import {
    createBidItemSchema,
    deleteBidItemSchema,
    getBidItemSchema,
    updateBidItemSchema,
} from '../schemas/bidItem.schema';

const router = express.Router();

router.use(deserializeUser, requireUser);
router
    .route('/')
    .post(validate(createBidItemSchema), createBidItemHandler)
    .get(getBidItemsHandler);

router
    .route('/:bidItemId')
    .get(validate(getBidItemSchema), getBidItemHandler)
    .patch(validate(updateBidItemSchema), updateBidItemHandler)
    .delete(validate(deleteBidItemSchema), deleteBidItemHandler);

export default router;

