import { SupplierModel } from "../model/supplier.model";

export const providers: SupplierModel[] = [
  {
    id: 1,
    name: "HNC",
    taxCode: "AASC-HNC",
    phone: "1212312300",
    address: "",
    email: "hnc@hnc.com",
  },
  {
    id: 2,
    name: "An Phat",
    taxCode: "AASC-ANPHAT",
    phone: "1212312300",
    address: "",
    email: "ANPHAT@ANPHAT.com",
  },
];

const mockProviders = (find?: string) =>
  new Promise<SupplierModel[]>((resolve) =>
    setTimeout(
      () =>
        resolve(
          find ? providers.filter((p) => p.name.includes(find)) : providers
        ),
      500
    )
  );

export default mockProviders;
