import express from 'express';
import { depositHandler, getMeHandler } from '../controllers/user.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { depositSchema } from '../schemas/user.schema';
import { validate } from '../middleware/validate';

const router = express.Router();

router.use(deserializeUser, requireUser);

// Get currently logged in user
router.get('/me', getMeHandler);

router
    .route('/:userId')
    .patch(validate(depositSchema), depositHandler)
export default router;

