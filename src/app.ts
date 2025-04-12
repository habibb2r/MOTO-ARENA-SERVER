import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import productRoutes from './Modules/Products/products.route';

import globalErrorHandler from './middlewares/globalErrorHandler';
import { routeNotFoundHandler } from './middlewares/routeNotFound';
import AuthRouter from './Modules/Auth/auth.route';
const app: Application = express();
import cookieParser from 'cookie-parser';
import UserRouter from './Modules/User/user.route';
import OrderRoutes from './Modules/Order/order.route';
//parser

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:5000', 'https://bike-museum.pages.dev', 'http://localhost:5174'],
    credentials: true,
  }),
);

app.use('/api/products', productRoutes);
app.use('/api/orders', OrderRoutes);
app.use('/api/auth', AuthRouter);
app.use('/api/user', UserRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use(globalErrorHandler);
app.use('*', routeNotFoundHandler);

export default app;
