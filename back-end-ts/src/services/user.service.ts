import { IUserDocument, RegisterUserDto } from '../types/user.types.js';
import serviceResponse, { ServiceResponse } from '#src/helpers/serviceResponse.js';
import Cart from '#src/models/cart.js';
import withTransaction from '#src/helpers/withTransaction.js';
import mongoose from 'mongoose';
import User from '#src/models/user.js';
import bcrypt from 'bcrypt';

// In-memory database (replace with real database in production)
export const userServices = {
  async registerUser(data: RegisterUserDto): Promise<ServiceResponse> {
    // create user , same as register , after user created , the cart will automaticly create
    let user = await User.findOne({ email: data.email });
    if (user) {
      return serviceResponse(400, {});
    }
    user = new User({
      name: data.name,
      email: data.email,
      password: data.password,
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    const transactionResult = await withTransaction(async (session: mongoose.mongo.ClientSession) => {
      const saveOp = await user.save({ session });
      const newCart = new Cart({
        userId: user.id,
      });
      await newCart.save({ session });
      return serviceResponse(200, saveOp);
    });
    return transactionResult;
  },

  async updateProfile(data: { name: string }, user: IUserDocument): Promise<ServiceResponse> {
    const updateOp = await User.updateOne({ _id: user.id }, { $set: data });
    if (updateOp.matchedCount > 0) {
      return serviceResponse(200, {});
    }
    return serviceResponse(404, {});
  },
};
