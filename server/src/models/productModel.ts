import { ProductInterface } from '../interfaces/iModels/iModel';
import mongoose, { Schema } from 'mongoose';

const ProductSchema: Schema<ProductInterface> = new Schema(
  {
    vendorid:{
      type:String,
      required:true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    publishing: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ProductModel = mongoose.model<ProductInterface>('products', ProductSchema);

export default ProductModel;
