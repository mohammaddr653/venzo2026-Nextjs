import mongoose from 'mongoose';
import { DiscountObj } from './discount.types.js';
import { PropertyObj } from './property.types.js';

export interface ProductI {
  name: string;
  price: number;
  discount: DiscountObj | null;
  stock: number;
  properties: PropertyObj[];
  categoryId: mongoose.Types.ObjectId | null;
  description: string;
  img: mongoose.Types.ObjectId | null;
  gallery: mongoose.Types.ObjectId[] | null;
}

export interface IProductDocument extends ProductI, Document {}
