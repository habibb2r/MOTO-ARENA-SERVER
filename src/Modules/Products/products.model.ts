import { model, Schema } from 'mongoose';
import { TProduct, TProductModel } from './products.interface';
import productMiddleware from './product.middleware';

export const productSchema = new Schema<TProduct>(
  {
    name: { type: String, required: true, trim: true },
    brand: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    category: {
      type: String,
      required: true,
      enum: ['Mountain', 'Road', 'Hybrid', 'Electric'],
    },
    photo: { type: String},
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

productMiddleware()

productSchema.statics.createOrUpdate = async function (data: TProduct) {
  const { name, brand, quantity } = data;

  const existingProduct = await this.findOne({
    name,
    brand,
    isDeleted: false,
  });

  if (existingProduct) {
    existingProduct.quantity += quantity;
    return existingProduct.save();
  } else {
    return this.create(data);
  }
};


export const Product = model<TProduct, TProductModel>('Product', productSchema);
