import mongoose from 'mongoose';
import urlsObjSchema from './urlsObj.js';
import { IUserDocument } from '#src/types/user.types.js';

const userSchema = new mongoose.Schema<IUserDocument>(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    avatar: {
      type: new mongoose.Schema(
        {
          urls: { type: urlsObjSchema, required: true },
        },
        { _id: false },
      ),
      default: null,
    },
    isadmin: { type: Boolean, default: false },
    verified: { type: Boolean, default: false },
    passwordResetToken: { type: String, default: null },
    passwordResetTokenExpires: { type: Date, default: null },
  },
  { timestamps: true },
);

export default mongoose.model('User', userSchema);
