import  { Router } from "express"
import { OrderController } from "./order.controller"

const OrderRoutes = Router()

OrderRoutes.post("/make-order", OrderController.makeOrder)
OrderRoutes.get("/myorders/:email", OrderController.getUserOrders)

export default OrderRoutes;
