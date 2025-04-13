import type { TProduct } from "./products.interface"
import { Product } from "./products.model"
import type mongoose from "mongoose"

const createProduct = async (payload: TProduct): Promise<TProduct> => {
  const result = await Product.createOrUpdate(payload)
  return result
}

interface TQuery {
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  model?: string;
  brand?: string;
  limit?: number;
  inStock?: boolean;
  category?: string;
}

const getProducts = async (queries: TQuery) => {
  // console.log(queries)
  const query: Record<string, any> = {};

  // Add search query if available
  if (queries.search) {
    query.$or = [
      { name: { $regex: queries.search, $options: 'i' } },
      { model: { $regex: queries.search, $options: 'i' } },
      { brand: { $regex: queries.search, $options: 'i' } },
      { category: { $regex: queries.search, $options: 'i' } },
    ];
  }

  if (queries.minPrice || queries.maxPrice) {
    query.price = {
      ...(queries.minPrice && { $gte: queries.minPrice }),
      ...(queries.maxPrice && { $lte: queries.maxPrice }),
    };
  }

  if (queries?.model) {
    query.model = { $regex: queries?.model, $options: 'i' }
  }

  if (queries.brand) {
    query.brand =  { $regex: queries?.brand, $options: 'i' }
  }
  if (queries.category) {
    query.category =  { $regex: queries?.category, $options: 'i' }
  }

  if(queries?.inStock){
    
    query.inStock = queries?.inStock;
  }
  let limit;
  if (queries?.limit) {
    limit = Number(queries?.limit);
  }
  const res = await Product.find(query).limit(limit as number);
  return res;
};


const getAllCateAndBrand = async () => {
  return await Product.aggregate([
    {
      $group: {
        _id: null,
        brands: { $addToSet: "$brand" },
        categories: { $addToSet: "$category" }
      }
    },
    {
      $project: {
        _id: 0,
        brands: 1,
        categories: 1
      }
    }
  ]);

}


const getSingleProduct = async (ProductId: string) => {
  const result = await Product.findById(ProductId)
  return result
}

const updateProduct = async (ProductId: string, payload: Partial<TProduct>, session?: mongoose.ClientSession) => {
  const options = session ? { new: true, session } : { new: true }
  const result = await Product.findByIdAndUpdate(ProductId, payload, options)
  return result
}

const deleteProduct = async (ProductId: string) => {
  const deleteSingleProduct = await Product.findByIdAndUpdate({ _id: ProductId }, { isDeleted: true }, { new: true })
  return deleteSingleProduct
}

export const ProductServices = {
  createProduct,
  getProducts,
  getAllCateAndBrand,
  getSingleProduct,
  updateProduct,
  deleteProduct,
}
