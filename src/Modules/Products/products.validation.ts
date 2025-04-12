import { z } from 'zod';

export const productValidationSchema = z.object({
  name: z
    .string({
      required_error: 'Product name is required',
    })
    .trim()
    .max(30, 'Product name must be at most 30 characters'),
  brand: z
    .string({
      required_error: 'Product brand is required',
    })
    .trim()
    .max(30, 'Product brand must be at most 30 characters'),
  price: z
    .number({
      required_error: 'Product price is required',
      invalid_type_error: 'Product price must be a number',
    })
    .min(1, 'Product price must be at least 1'),
  category: z.enum(['Mountain', 'Road', 'Hybrid', 'Electric'], {
    required_error: 'Product category is required',
    invalid_type_error: 'Invalid product category',
  }),
  description: z.string({
    required_error: 'Product description is required',
  }),
  quantity: z
    .number({
      required_error: 'Product quantity is required',
      invalid_type_error: 'Product quantity must be a number',
    })
    .min(1, 'Product quantity must be at least 1'),
  inStock: z.boolean().default(true),
  isDeleted: z.boolean().default(false),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

const updateProductValidationSchema = productValidationSchema.partial();

export const productValidation = {
  productValidationSchema,
  updateProductValidationSchema,
};
