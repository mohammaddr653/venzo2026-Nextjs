import mongoose from 'mongoose';

export interface Propertyval {
  propertyId: mongoose.Types.ObjectId;
  value: string;
  hex: string;
}

export interface PropertyvalDocument extends Propertyval, Document {}
