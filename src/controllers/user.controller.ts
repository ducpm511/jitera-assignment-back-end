import { NextFunction, Request, Response } from 'express';
import { DepositInput } from '../schemas/user.schema';
import { findUserById } from '../services/user.service';
import AppError from '../utils/appError';

export const getMeHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;

    res.status(200).status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const depositHandler = async (
  req: Request<DepositInput['params'], {}, DepositInput['body']>,
  res: Response,
  next: NextFunction
) => {
  try {
      const user = await findUserById(req.params.userId);

      if (!user) {
          return next(new AppError(404, 'User with that ID not found'));
      }
      let updatedUser = user;
      updatedUser.ballance = user.ballance + req.body.ballance;
      Object.assign(user, updatedUser);

      const deposit = await user.save();

      res.status(200).json({
          status: 'success',
          data: {
              user: deposit,
          },
      });
  } catch (err: any) {
      next(err);
  }
};
