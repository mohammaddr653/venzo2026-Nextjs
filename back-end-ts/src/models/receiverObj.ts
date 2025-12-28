import { ReceiverObj } from '#src/types/receiverObj.types.js';
import mongoose from 'mongoose';

const receiverObjSchema = new mongoose.Schema<ReceiverObj>(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    province: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    note: {
      //یادداشت
      type: String,
    },
  },
  { _id: false },
);
export default receiverObjSchema;
