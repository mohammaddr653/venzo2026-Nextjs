import mongoose from 'mongoose';

export interface ReservedProduct {
  productId: mongoose.Types.ObjectId;
  count: number;
  selectedPropertyvalString: string;
}

export interface Cart {
  userId: mongoose.Types.ObjectId;
  reservedProducts: ReservedProduct[];
}

export interface ICartDocument extends Cart, Document {}
