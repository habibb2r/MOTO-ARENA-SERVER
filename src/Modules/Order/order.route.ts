import  { Router } from "express"
import { OrderController } from "./order.controller"

const OrderRoutes = Router()

OrderRoutes.post("/make-order", OrderController.makeOrder)
OrderRoutes.get("/revenue", OrderController.getRevenue)

export default OrderRoutes;
