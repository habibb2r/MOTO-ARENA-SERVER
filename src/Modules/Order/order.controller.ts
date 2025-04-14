import type { Request, Response } from "express"
import { OrderServices } from "./order.service"
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { StatusCodes } from "http-status-codes"

const makeOrder = catchAsync(async (req: Request, res: Response) => {
  const orderDoc = req.body;
  // console.log(orderDoc, "orderDoc")
  const result = await OrderServices.createOrderIntoDB(orderDoc);
  sendResponse(res, {
    success: true,
    message: 'Order created successfully',
    data: result,
    statusCode: StatusCodes.OK,
  });
})

const getUserOrders = catchAsync(async (req: Request, res: Response) => {
  const email = req.params.email;
  const result = await OrderServices.getUserOrdersFromDB(email);
  sendResponse(res, {
    success: true,
    message: 'Order Retrieved successfully',
    data: result,
    statusCode: StatusCodes.OK,
  });
})

const getAllOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderServices.getAllOrdersFromDB();
  sendResponse(res, {
    success: true,
    message: 'All Order Retrived successfully',
    data: result,
    statusCode: StatusCodes.OK,
  });
});

const updateOrderStatus = catchAsync(async (req: Request, res: Response) => {
  const orderinfo = req.body;
  const result = await OrderServices.updateOrderStatusInDB(orderinfo);
  sendResponse(res, {
    success: true,
    message: 'Order Updated Successfully',
    data: result,
    statusCode: StatusCodes.OK,
  });
});

export const OrderController = {
  makeOrder,
  getUserOrders,
  getAllOrder,
  updateOrderStatus
}
