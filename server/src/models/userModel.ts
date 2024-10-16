import { UserInterface } from '../interfaces/iModels/iModel';
import mongoose, { Schema } from 'mongoose';
import bcrypt from "bcryptjs";

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

UserSchema.methods.comparePassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password);
  };

const UserModel = mongoose.model<UserInterface>('users', UserSchema);

export default UserModel;
