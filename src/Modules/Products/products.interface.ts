/* eslint-disable no-unused-vars */
import { Model } from "mongoose";

export type TProduct = {
  name: string;
  price: number;
  brand: string;
  category: string;
  photo?:string;
  description: string;
  quantity: number;
  inStock: boolean;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export interface TProductModel extends Model<TProduct> {
  createOrUpdate(data: TProduct): Promise<TProduct>;
}
