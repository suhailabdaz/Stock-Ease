import { OrderInterface } from '../interfaces/iModels/iModel';
import mongoose, { Schema } from 'mongoose';

const OrderSchema: Schema<OrderInterface> = new Schema(
  {
    orderid: {
      type: String,
      required: true,
    },
    vendorid:{
      type:String,
      required:true,
    },
    customerid: {
      type: String,
      required: true,
    },
    productid: {
      type: String,
      required: true,
    },
    paymentmethod: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const OrderModal = mongoose.model<OrderInterface>('orders', OrderSchema);

export default OrderModal;
