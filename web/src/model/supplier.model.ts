/**
 * Model corresponding to the server response (full data).
 */
export interface SupplierModel {
  id: number;
  name: string;
  // 10 characters
  taxCode: string;
  description?: string;
  // auto gen on server.
  supplierCode?: string;
  phone: string;
  email: string;
  address: string;
  supplierImage?: string;
}

/**
 * Interface corresponds to the API create payload.
 */
export interface SupplierCreateEntity
  extends Omit<SupplierModel, "id" | "supplierCode" | "supplierImage"> {
  supplierImage?: File;
}

/**
 * Interface corresponds to the API update payload.
 */
export interface SupplierUpdateEntity
  extends Omit<SupplierModel, "supplierCode" | "supplierImage"> {
  supplierImage?: string | File;
}
