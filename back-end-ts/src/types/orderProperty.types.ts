import { DiscountObj } from './discount.types.js';
import { Types } from './property.types.js';

export interface OrderPropertyObj {
  name: string;
  specifiedVals: boolean;
  type: Types;
}

export interface OrderPropertyvalObj {
  value: string;
  hex: string;
}

export interface OrderPropertyvalObjSchema {
  propertyval: OrderPropertyvalObj;
  valueString: string;
  price: number;
  discount: DiscountObj;
  stock: number;
}

export interface OrderPropertyObjSchema {
  property: OrderPropertyObj;
  selective: boolean;
  values: OrderPropertyvalObjSchema[];
}
