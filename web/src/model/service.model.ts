import { BasePriceModel } from "./_price.model";
import { ProductModel } from "./product.model";

export interface ServiceModel<
  productType extends number | ProductModel = number
> extends BasePriceModel {
  id: number;
  name: string;
  description: string;
  duration: number;
  image?: string;

  products: ProductInService<productType>[];
}

export interface ProductInService<productType extends number | ProductModel> {
  product: productType;
  usage: number;
}

export interface ServiceCreateEntity
  extends Omit<ServiceModel, "id" | "image"> {
  image?: File;
}

export interface ServiceUpdateEntity extends Omit<ServiceModel, "image"> {
  image?: File | string;
}
