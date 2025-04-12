import { z } from "zod"
import mongoose from "mongoose"

const OrderValidation = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  product: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid product ID",
  }),
  quantity: z.number().min(1, { message: "Quantity must be at least 1" }),
  totalPrice: z.number().min(0, { message: "Total price must be a positive number" }).optional(),
})

export default OrderValidation
