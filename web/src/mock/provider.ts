import { ProviderModel } from "../model/provider.model";

export const providers: ProviderModel[] = [
  { id: 1, name: "HNC", taxNumber: "AASC-HNC" },
  { id: 2, name: "An Phat", taxNumber: "AASC-ANPHAT" },
];

const mockProviders = (find?: string) =>
  new Promise<ProviderModel[]>((resolve) =>
    setTimeout(
      () =>
        resolve(
          find ? providers.filter((p) => p.name.includes(find)) : providers
        ),
      500
    )
  );

export default mockProviders;
