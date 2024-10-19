import { CustomerInterface } from '../interfaces/iModels/iModel';
import mongoose, { Schema } from 'mongoose';

const CustomerSchema: Schema<CustomerInterface> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    vendorid:{
      type:String,
      required:true,
    },
    address: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
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

const CustomerModel = mongoose.model<CustomerInterface>('customers', CustomerSchema);

export default CustomerModel;
