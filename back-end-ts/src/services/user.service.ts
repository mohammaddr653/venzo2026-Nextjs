import { IUserDocument, RegisterUserDto } from '../types/user.types.js';
import serviceResponse, { ServiceResponse } from '#src/helpers/serviceResponse.js';
import Cart from '#src/models/cart.js';
import withTransaction from '#src/helpers/withTransaction.js';
import mongoose from 'mongoose';
import User from '#src/models/user.js';
import bcrypt from 'bcrypt';
import deleteWrapper from '#src/helpers/deleteWrapper.js';
import { UpdateUserInput } from '#src/modules/user/user.schema.js';

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

  async addAvatar(file: any, user: IUserDocument): Promise<ServiceResponse> {
    //اضافه کردن آواتار
    const newAvatar = {
      urls: file.urls,
    };
    const updateOp = await User.findOneAndUpdate({ _id: user.id }, { $set: { avatar: newAvatar } });
    if (updateOp) {
      if (updateOp.avatar && updateOp.avatar.urls) {
        deleteWrapper(updateOp.avatar.urls);
      }
      return serviceResponse(200, {});
    }
    return serviceResponse(404, {});
  },

  async deleteAvatar(user: IUserDocument): Promise<ServiceResponse> {
    //حذف کردن آواتار
    const updateOp = await User.findOneAndUpdate({ _id: user.id }, { $set: { avatar: null } });
    if (updateOp) {
      if (updateOp.avatar && updateOp.avatar.urls) {
        deleteWrapper(updateOp.avatar.urls);
      }
      return serviceResponse(200, {});
    }
    return serviceResponse(404, {});
  },

  async getAllUsers(user: IUserDocument): Promise<ServiceResponse> {
    //reading all users from database except current user that is maybe admin
    const findOp = await User.find({ _id: { $ne: user.id } });
    return serviceResponse(200, findOp);
  },

  async seeOneUser(userId: string): Promise<ServiceResponse> {
    // reading one user from database
    const findOp = await User.findById(userId);
    return serviceResponse(200, findOp);
  },

  async updateUser(userId: string, data: UpdateUserInput['body']): Promise<ServiceResponse> {
    //if you changed the email field , it checks if its exists or not , then it updates the user
    const { data: user } = await this.seeOneUser(userId);
    let repeatedEmail = await User.findOne({ email: data.email });
    if (repeatedEmail && user.email !== data.email) {
      return serviceResponse(400, {});
    }

    user.name = data.name;
    user.email = data.email;
    await user.save();
    return serviceResponse(200, {});
  },
};
