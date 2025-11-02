import { discountObj } from "./discountObj";

export interface Property {
  _id?: string; //اگر از قبل ساخته شده باشد آیدی دارد
  name: string;
  specifiedVals: Boolean;
  type: string;
}

export interface Propertyval {
  _id?: string; //اگر از قبل ساخته شده باشد آیدی دارد
  propertyId: string;
  value: string;
  hex: string;
}

export interface ProductPropertyvalsObj {
  propertyval?: Propertyval;
  valueString?: string;
  price?: string;
  discount?: discountObj;
  stock?: string;
}
export interface ProductPropertiesObj {
  property: Property;
  selective: boolean;
  values: ProductPropertyvalsObj[];
}
