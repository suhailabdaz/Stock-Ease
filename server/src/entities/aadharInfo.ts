import mongoose, { Document, Schema } from "mongoose";

// Define the Aadhar interface, extending Document
export interface AadharInterface extends Document {
  dob: string 
  aadhaarNumber: string 
  gender: string 
  name: string
  address: string 
}

// Define the Aadhar schema
const AadharSchema: Schema<AadharInterface> = new Schema({
    name: {
        type: String,
        required: true,
    },
    dob: {
        type: String,
        required: true,
        trim: true,
    },
    aadhaarNumber: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: false,
    },
    address: {
      type: String,
      required: false,
  },
}, {
    timestamps: true
});

// Create the Aadhar model with the UserInterface
const AadharModel = mongoose.model<AadharInterface>("Aadhars", AadharSchema);

export default AadharModel;