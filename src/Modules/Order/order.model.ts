import mongoose, { Schema } from "mongoose";
import { TOrder } from "./order.interface";

const orderSchema = new Schema<TOrder>(
    {
      productName: { type: String, required: true },
        productId: { type: String, required: true ,ref:"Products"},
        // productId: { type: String, required: true ,ref:"Products"},
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        userInfo: {
            type: {
                name: { type: String, required: true },
                email: { type: String, required: true },
                role: { type: String, required: true , enum: ["customer"]},
            },
            required: true,
        },
        orderId: { type: String, required: true }, 
        orderTrack: [
            {
                title: { type: String, required: true },
                description: { type: String, required: true },
            },
        ],
        orderActiveTrack: { type: Number, default: 1 },
    },
    {
        timestamps: true,
        versionKey: false,
        collection: "Order",
    }
);

export const Order = mongoose.model<TOrder>("orders", orderSchema);
