import { SupplierModel } from "./supplier.model";
import { BasePriceModel } from "./_price.model";

export interface ProductModel<
  supplierModel extends number | SupplierModel = number
> extends BasePriceModel {
  id: number;
  name: string;
  description: string;
  image?: string;
  supplier: supplierModel;
  unit: string;
  dose?: number;
}

/**
 * Interface for the payload to register product.
 * This payload interface will not have id field,
 * and dataType of image, importedDate and expiredDate will be different.
 */
export interface ProductCreateEntity
  extends Omit<ProductModel, "id" | "image"> {
  image?: File;
}

/**
 * Interface for the payload to update product.
 */
export interface ProductUpdateEntity extends Omit<ProductModel, "image"> {
  image?: File | string;
}
