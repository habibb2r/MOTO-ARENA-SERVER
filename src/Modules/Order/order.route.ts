import  { Router } from "express"
import { OrderController } from "./order.controller"
import verifyAdmin from "../../middlewares/verifyAdmin"

const OrderRoutes = Router()

OrderRoutes.post("/make-order", OrderController.makeOrder)
OrderRoutes.get("/myorders/:email", OrderController.getUserOrders)
OrderRoutes.get("/allorders", verifyAdmin, OrderController.getAllOrder)
OrderRoutes.patch("/update", verifyAdmin, OrderController.updateOrderStatus)

export default OrderRoutes;
