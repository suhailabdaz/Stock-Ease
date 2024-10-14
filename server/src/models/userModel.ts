import { UserInterface } from '../interfaces/iModels/iModel';
import mongoose, { Schema } from 'mongoose';

// Define the User schema
const UserSchema: Schema<UserInterface> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create the User model with the UserInterface
const UserModel = mongoose.model<UserInterface>('users', UserSchema);

export default UserModel;
