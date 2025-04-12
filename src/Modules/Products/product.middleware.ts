import { productSchema } from "./products.model";

const productMiddleware = () => { 
    productSchema.pre('find', function (next) {
        this.find({ isDeleted: { $ne: true } });
        next();
      });
      productSchema.pre('findOne', function (next) {
        this.find({ isDeleted: { $ne: true } });
        next();
      });
      productSchema.pre('findOneAndUpdate', function (next) {
        this.find({ isDeleted: { $ne: true } });
        next();
      });
      
      productSchema.pre('save', function (next) {
        if (this.isModified('name') && this.name) {
          this.name = this.name.charAt(0).toUpperCase() + this.name.slice(1);
        }
        if (this.isModified('brand') && this.brand) {
          this.brand = this.brand.charAt(0).toUpperCase() + this.brand.slice(1);
        }
        next();
      });
 }

 export default productMiddleware