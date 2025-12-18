import { Document } from 'mongoose';
import { IUrlsObjDocument } from './urlsObj.types.js';

export interface User {
  name: string;
  email: string;
  password: string;
  isadmin: boolean;
  avatar: { urls: IUrlsObjDocument } | null;
  verified: boolean;
  passwordResetToken: string | null;
  passwordResetTokenExpires: Date | null;
}
export interface IUserDocument extends User, Document {}

export interface RegisterUserDto {
  name: string;
  email: string;
  password: string;
}
