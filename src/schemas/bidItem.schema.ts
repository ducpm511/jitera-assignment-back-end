import { number, object, string, z, date, TypeOf } from "zod";
import { StatusEnumType } from "../entities/bidItem.entity";

export const createBidItemSchema = object({
  body: object({
    name: string({
      required_error: 'Name is required',
    }),
    startedPrice: number({
      required_error: 'Started price is required'
    }),
    timeWindow: number({
      required_error: 'Time window is required'
    }),
    status: z.optional(z.nativeEnum(StatusEnumType)),
  })
})

const params = {
  params: object({
    bidItemId: string(),
  }),
};

export const getBidItemSchema = object({
  ...params,
});

export const updateBidItemSchema = object({
  ...params,
  body: object({
    name: string(),
    startedPrice: number(),
    currentPrice: number(),
    startAt: string(),
    endAt: string(),
    status: z.optional(z.nativeEnum(StatusEnumType)),
  }).partial(),
});

export const deleteBidItemSchema = object({
  ...params,
});
const statusParam = {
  params: object({
    status: z.optional(z.nativeEnum(StatusEnumType))
  })
}
export const getBidItemsByStatusSchema = object({
  ...statusParam
})

export type CreateBidItemInput = TypeOf<typeof createBidItemSchema>['body'];
export type GetBidItemInput = TypeOf<typeof getBidItemSchema>['params'];
export type UpdateBidItemInput = TypeOf<typeof updateBidItemSchema>;
export type DeleteBidItemInput = TypeOf<typeof deleteBidItemSchema>['params'];
export type GetBidItemsByStatusInput = TypeOf<typeof getBidItemsByStatusSchema>['params'];