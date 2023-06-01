import { TypeOf, number, object, string } from "zod";


export const createBidSchema = object({
    body: object({
        bidPrice: number({
            required_error: 'Bid price is required'
        }),
        bidItemId: string({
            required_error: 'Bid item id is required'
        }),
        userId: string({
            required_error: 'User id is required'
        })
    })
})

export type CreateBidInput = TypeOf<typeof createBidSchema>['body'];