import mongoose, { Schema, Document } from "mongoose";
import Joi from "joi";
export interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
}
const userSchemas = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

export const validateUser = (data: UserDocument) => {
  return userSchemas.validate(data);
};
const userSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model<UserDocument>("User", userSchema);

export default User;
