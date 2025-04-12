import type { Request, Response } from "express"
import { OrderServices } from "./order.service"
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { StatusCodes } from "http-status-codes"

const makeOrder = catchAsync(async (req: Request, res: Response) => {
  const orderDoc = req.body;
  console.log(orderDoc, "orderDoc")
  const result = await OrderServices.createOrderIntoDB(orderDoc);
  sendResponse(res, {
    success: true,
    message: 'Order Place successfully',
    data: result,
    statusCode: StatusCodes.OK,
  });
})

const getRevenue = catchAsync(async (req: Request, res: Response) => {
  const totalRevenue = await OrderServices.getRevenueFromDB()

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Revenue calculated successfully",
    success: true,
    data: {
      totalRevenue: totalRevenue,
    },
  })
})

export const OrderController = {
  makeOrder,
  getRevenue,
}
