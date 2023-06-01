import express from 'express';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { validate } from '../middleware/validate';
import { createBidSchema } from '../schemas/bid.schema';
import { createBidHandler } from '../controllers/bid.controller';

const router = express.Router();

router.use(deserializeUser, requireUser);
router
    .route('/')
    .post(validate(createBidSchema), createBidHandler)

export default router;

