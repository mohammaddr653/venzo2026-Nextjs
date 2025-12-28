import mongoose from 'mongoose';
import reservedProduct from './reservedProduct.js';
import { ICartDocument } from '#src/types/cart.types.js';

const cartSchema = new mongoose.Schema<ICartDocument>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    reservedProducts: { type: [reservedProduct], default: [] },
  },
  { timestamps: true },
);
export default mongoose.model('Cart', cartSchema);
