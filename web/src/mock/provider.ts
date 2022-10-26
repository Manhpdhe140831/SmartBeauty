import { SupplierModel } from "../model/supplier.model";

export const providers: SupplierModel[] = [
  { id: 1, name: "HNC", taxCode: "AASC-HNC", mobile: "12123123" },
  { id: 2, name: "An Phat", taxCode: "AASC-ANPHAT", mobile: "12123123" },
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
