import { Document } from 'mongoose';
import { UrlsObj } from './urlsObj.types.js';

export interface User {
  name: string;
  email: string;
  password: string;
  isadmin: boolean;
  avatar: { urls: UrlsObj } | null;
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
