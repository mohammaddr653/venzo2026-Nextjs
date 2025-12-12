import mongoose, { Document } from 'mongoose';

export type Types = 'link' | 'shop' | 'archive' | 'box';
export type Displays = 'ordinary' | 'mega-menu';

export interface Category {
  name: string;
  motherId: mongoose.Types.ObjectId | string;
  type: Types;
  link: string;
  img: mongoose.Types.ObjectId | null;
  display: Displays;
}
export interface ICategoryDocument extends Category, Document {}
