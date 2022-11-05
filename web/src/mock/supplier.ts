import { SupplierModel } from "../model/supplier.model";

export const Supplier: SupplierModel[] = [
  {
    id: 1,
    name: "HNC",
    taxCode: "AASCHNCA12",
    phone: "0212312300",
    address: "123",
    email: "hnc@hnc.com",
  },
  {
    id: 2,
    name: "An Phat",
    taxCode: "AASCANPHAT",
    phone: "0212312300",
    address: "321",
    email: "ANPHAT@ANPHAT.com",
  },
];

const mockProviders = (find?: string) =>
  new Promise<SupplierModel[]>((resolve) =>
    setTimeout(
      () =>
        resolve(
          find ? Supplier.filter((p) => p.name.includes(find)) : Supplier
        ),
      500
    )
  );

export default mockProviders;