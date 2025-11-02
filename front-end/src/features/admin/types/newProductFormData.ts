import { ProductPropertiesObj } from "./properties";

export interface NewProductFormData {
  name: string;
  price: string;
  discount: string;
  stock: string;
  categoryId: string;
  description: string;
  properties: ProductPropertiesObj[];
  img: string;
  gallery: string[];
}
