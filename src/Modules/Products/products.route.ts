import { ProductController } from './products.controller';
import validateRequest from '../../middlewares/validateRequest';
import { productValidation } from './products.validation';
import verifyAdmin from '../../middlewares/verifyAdmin';
import { Router } from 'express';

const productRoutes = Router();

productRoutes.get('/category-and-brand', ProductController.getProductsCateAndBrand);
productRoutes.post(
  '/create-product', verifyAdmin,
  validateRequest(productValidation.productValidationSchema),
  ProductController.createProduct,
);
productRoutes.get('/', ProductController.getProducts);
productRoutes.put(
  '/:productId',
  validateRequest(productValidation.updateProductValidationSchema),
  ProductController.updateProduct,
);
productRoutes.get('/:productId', ProductController.getSingleProduct);
productRoutes.delete('/:productId', ProductController.deleteProduct);

export default productRoutes
