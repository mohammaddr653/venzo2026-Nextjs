import mongoose from 'mongoose';
import { DiscountObj } from './discount.types.js';
import { OrderPropertyObjSchema } from './orderProperty.types.js';
import { ReceiverObj } from './receiverObj.types.js';

export interface OrderProduct {
  productId: mongoose.Types.ObjectId;
  name: string;
  price: number;
  discount: DiscountObj;
  properties: OrderPropertyObjSchema;
  count: number;
  selectedPropertyvalString: string;
  selectedPropertyval: string;
}

export type Status = 'expired' | 'canceled' | 'pending' | 'check' | 'paid';

export interface Order {
  userId: mongoose.Types.ObjectId;
  products: OrderProduct[];
  status: Status;
  pendingExpire: Date | null;
  totalPrice: number;
  authority: string;
  authExpire: Date | null;
  referenceId: string;
  receiver: ReceiverObj;
}

export interface IOrderDocument extends Order, Document {}
