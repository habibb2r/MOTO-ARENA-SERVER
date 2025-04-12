import { ProductServices } from './products.service';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { Request, Response } from 'express';

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await ProductServices.createProduct(payload);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "Successfully created Product",
    data: result,
  });
});

const getProducts = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductServices.getProducts(req.query);
  // console.log('hitted')
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Successfully fetched Products",
    data: result,
  });
});

const getProductsCateAndBrand = catchAsync(async (req: Request, res: Response) => {
  // console.log('hitted')
  const result = await ProductServices.getAllCateAndBrand();
  sendResponse(res, {
    success: true,
    message: 'Category fetched successfully ',
    data: result,
    statusCode: StatusCodes.OK,
  });
});


const getSingleProduct = catchAsync(async (req: Request, res: Response) => {
  // console.log(req.params);
  const id = req.params.productId;
  const result = await ProductServices.getSingleProduct(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Successfully fetched single Product",
    data: result,
  });
});



const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.productId;
  const payload = req.body;
  const result = await ProductServices.updateProduct(id, payload);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Successfully updated Product",
    data: result,
  });
});

const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.ProductId;
  const result = await ProductServices.deleteProduct(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Successfully deleted Product",
    data: result,
  });
});


export const ProductController = {
  createProduct,
  getProducts,
  getProductsCateAndBrand,
  getSingleProduct,
  deleteProduct,
  updateProduct
};
