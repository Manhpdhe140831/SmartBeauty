import { BasePriceModel } from "./_price.model";
import { ProductModel } from "./product.model";

export interface ServiceModel extends BasePriceModel {
  id: number;
  name: string;
  description: string;
  duration: number;
  image?: string;

  products: ProductInService[];
}

export interface ProductInService {
  product: ProductModel;
  usage: number;
}

export interface ProductInServiceEntity
  extends Omit<ProductInService, "product"> {
  productId: number;
}

export interface ServiceCreateEntity
  extends Omit<ServiceModel, "id" | "image" | "products"> {
  image?: File;

  products: ProductInServiceEntity[];
}

export interface ServiceUpdateEntity
  extends Omit<Partial<ServiceModel>, "image" | "products"> {
  id: number;
  image?: File | string;
  products?: ProductInServiceEntity[];
}
