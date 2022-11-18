import { ProductModel } from "../model/product.model";
import { shuffleArray } from "../utilities/fn.helper";
import { Supplier } from "./supplier";

export const products: ProductModel[] = [
  {
    id: 1,
    name: "Triclosan",
    price: 61170,
    description: "Other diagnostic procedures on ureter",
    image: "http://dummyimage.com/170x204.png/ff4444/ffffff",
    discountStart: "2022-09-02T19:40:42Z",
    discountEnd: "2022-12-22T02:24:11Z",
    discountPercent: 40,
    supplier: Supplier[0]!.id,
    unit: "gram",
    dose: 12,
  },
  {
    id: 2,
    name: "Triclosan",
    price: 86386,
    description: "Other diagnostic procedures on salivary glands and ducts",
    image: "http://dummyimage.com/194x259.png/dddddd/000000",
    discountStart: "2022-07-22T08:21:51Z",
    discountEnd: "2021-12-01T05:27:45Z",
    discountPercent: 93.0,
    supplier: Supplier[0]!.id,
    unit: "cd",
    dose: 32,
  },
  {
    id: 3,
    name: "Neomycin Sulfate, Polymyxin B Sulfate, and Dexamethasone",
    price: 85089,
    description: "Other diagnostic procedures on abdominal region",
    image: "http://dummyimage.com/162x256.png/5fa2dd/ffffff",
    discountStart: "2022-07-04T08:07:44Z",
    discountEnd: "2021-10-31T03:16:52Z",
    discountPercent: 6.7,
    supplier: Supplier[0]!.id,
    unit: "kg",
    dose: 30,
  },
  {
    id: 4,
    name: "OCTINOXATE and TITANIUM DIOXIDE",
    price: 55031,
    description: "Transpleural thoracoscopy",
    image: "http://dummyimage.com/187x230.png/cc0000/ffffff",
    discountStart: null,
    discountEnd: null,
    discountPercent: null,
    supplier: Supplier[0]!.id,
    unit: "cd",
    dose: 86,
  },
  {
    id: 5,
    name: "Methylphenidate Hydrochloride",
    price: 95933,
    description: "Rehabilitation, not elsewhere classified",
    image: "http://dummyimage.com/184x273.png/ff4444/ffffff",
    discountStart: "2022-07-30T14:34:36Z",
    discountEnd: "2021-11-02T06:47:35Z",
    discountPercent: 7.5,
    supplier: Supplier[0]!.id,
    unit: "gram",
    dose: 100,
  },
  {
    id: 6,
    name: "SPONGIA OFFICINALIS SKELETON, ROASTED",
    price: 62132,
    description: "Correction of ureteropelvic junction",
    image: "http://dummyimage.com/192x277.png/5fa2dd/ffffff",
    discountStart: "2022-07-30T21:17:18Z",
    discountEnd: "2022-10-11T16:56:57Z",
    discountPercent: null,
    supplier: Supplier[0]!.id,
    unit: "gram",
    dose: 12,
  },
  {
    id: 7,
    name: "WHOLE ARNICA PLANT",
    price: 91852,
    description: "Biopsy of external ear",
    image: "http://dummyimage.com/175x292.png/cc0000/ffffff",
    discountStart: null,
    discountEnd: "2022-10-25T16:56:16Z",
    discountPercent: 12.9,
    supplier: Supplier[0]!.id,
    unit: "al",
    dose: 12,
  },
  {
    id: 8,
    name: "Morphine Sulfate",
    price: 51708,
    description:
      "Bronchoscopic bronchial thermoplasty, ablation of airway smooth muscle",
    image: "http://dummyimage.com/181x209.png/ff4444/ffffff",
    discountStart: "2021-11-22T09:44:23Z",
    discountEnd: "2022-10-16T04:57:12Z",
    discountPercent: 2.3,
    supplier: Supplier[0]!.id,
    unit: "ml",
    dose: 162,
  },
  {
    id: 9,
    name: "lovastatin",
    price: 96162,
    description: "Laparoscopic unilateral oophorectomy",
    image: "http://dummyimage.com/196x239.png/cc0000/ffffff",
    discountStart: "2022-09-28T17:21:24Z",
    discountEnd: "2022-07-28T22:20:44Z",
    discountPercent: 43.9,
    supplier: Supplier[0]!.id,
    unit: "mm",
    dose: 912,
  },
  {
    id: 10,
    name: "Allergenic Extracts Alum Precipitated",
    price: 81826,
    description: "Osteopathic manipulative treatment for general mobilization",
    image: "http://dummyimage.com/126x237.png/dddddd/000000",
    discountStart: "2022-06-18T23:35:40Z",
    discountEnd: "2022-05-21T12:34:01Z",
    discountPercent: 70.5,
    supplier: Supplier[0]!.id,
    unit: "kg",
    dose: 5,
  },
];

const mockProduct = (name?: string) =>
  new Promise<ProductModel[]>((resolve) =>
    setTimeout(() => {
      if (!name) {
        return resolve(shuffleArray(products));
      }

      return resolve(
        shuffleArray(products).filter((s) =>
          s.name.toLowerCase().includes(name.toLowerCase())
        )
      );
    }, 500)
  );

export default mockProduct;
