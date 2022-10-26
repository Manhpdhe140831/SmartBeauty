import { SupplierModel } from "./supplier.model";

export interface ProductModel<
  supplierModel extends number | SupplierModel = number
> {
  id: number;
  name: string;
  price: number;
  importedDate?: string;
  // some rare case the product doesn't have expired date.
  expiredDate?: string;
  description: string;
  discountStart: string | null;
  discountEnd: string | null;
  discountPercent: number | null;
  image?: string;
  supplier: supplierModel;
  unit: string;
  quantity?: number;
}

/**
 * Interface for the payload to register product.
 * This payload interface will not have id field,
 * and dataType of image, importedDate and expiredDate will be different.
 */
export interface ProductCreateEntity
  extends Omit<ProductModel, "id" | "image" | "importedDate" | "expiredDate"> {
  image?: File;
  importedDate: Date;
  expiredDate?: Date;
}

/**
 * Interface for the payload to update product.
 */
export interface ProductUpdateEntity
  extends Omit<ProductModel, "image" | "importedDate" | "expiredDate"> {
  image?: File | string;
}
