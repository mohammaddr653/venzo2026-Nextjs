import mongoose from 'mongoose';
import { DiscountObj } from './discount.types.js';

export interface PropertyvalObj {
  propertyval: mongoose.Types.ObjectId;
  valueString?: string;
  price: number;
  discount: DiscountObj;
  stock: number;
}

export interface PropertyObj {
  property: mongoose.Types.ObjectId;
  selective: boolean;
  values: PropertyvalObj[];
}

type Types = 'ordinary' | 'color';

export interface PropertyI {
  name: string;
  specifiedVals: boolean;
  type: Types;
}
export interface IPropertyDocument extends PropertyI, Document {}
