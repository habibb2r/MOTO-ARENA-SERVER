import { ProductServices } from '../Products/products.service';
import { Order } from './order.model';
import AppError from '../../ErrorHandlers/AppError';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import Stripe from 'stripe';
import config from '../../config';
const stripe = new Stripe(config.stripe_key as string);

const checkStockAvailability = async (productId: string, quantity: number) => {
  const product = await ProductServices.getSingleProduct(productId);

  if (!product) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Product not found');
  }

  if (!product.inStock) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      `Product "${product.name}" is currently out of stock`,
    );
  }

  if (product.quantity < quantity) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      `Insufficient stock for "${product.name}". Requested: ${quantity}, Available: ${product.quantity}`,
    );
  }

  return product;
};

const createOrderIntoDB = async (payload: any) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const totalPrice = Number(payload?.price) * Number(payload?.quantity);
    const currency = 'usd';

    const paymentIntent = await stripe.paymentIntents.create(
      {
        amount: totalPrice,
        currency,
      },
      { idempotencyKey: payload?.orderId },
    );

    if (!paymentIntent?.client_secret) {
      await session.abortTransaction();
      session.endSession();
      throw new AppError(StatusCodes.BAD_REQUEST, 'Payment failed');
    }
    const orderProduct = {
      productName: payload?.productName,
      productId: payload?.productId,
      price: payload?.price,
      quantity: payload?.quantity,
      userInfo: {
        name: payload?.userInfo?.name,
        email: payload?.userInfo?.email,
        role: payload?.userInfo?.role,
      },
      orderId: paymentIntent?.id,
      orderTrack: [
        { title: 'Pending', description: 'Your order is in pending.' },
        { title: 'Processing', description: 'Your order has processed.' },
        {
          title: 'Shipped',
          description: 'Your order has been shipped successfully.',
        },
        {
          title: 'Delivered',
          description: 'Your order has been delivered successfully.',
        },
      ],
      orderActiveTrack: 1,
    };

    const res = await Order.create([orderProduct], { session });

    if (!res) {
      await session.abortTransaction();
      session.endSession();
      throw new AppError(StatusCodes.BAD_REQUEST, 'Payment failed');
    }
    await session.commitTransaction();
    session.endSession();

    return paymentIntent;
  } catch (error) {
    console.log(error, 'error');
    await session.abortTransaction();
    session.endSession();
    throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to pay');
  }
};

const getRevenueFromDB = async () => {
  const result = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: { $toDouble: '$totalPrice' } },
      },
    },
  ]);
  const totalRevenue = result.length > 0 ? result[0].totalRevenue : 0;
  return totalRevenue;
};

export const OrderServices = {
  createOrderIntoDB,
  getRevenueFromDB,
  checkStockAvailability,
};
