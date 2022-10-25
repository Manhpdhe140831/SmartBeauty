import { ProductModel } from "../model/product.model";
import { shuffleArray } from "../utilities/fn.helper";

const products: ProductModel[] = [{
  "id": 1,
  "name": "Triclosan",
  "price": 61170,
  "importedDate": "2022-02-16T11:51:12Z",
  "expiredDate": "2023-05-22T10:26:26Z",
  "description": "Other diagnostic procedures on ureter",
  "image": "http://dummyimage.com/170x204.png/ff4444/ffffff",
  "saleStart": "2022-09-02T19:40:42Z",
  "saleEnd": "2022-07-22T02:24:11Z",
  "salePercent": 73.3,
  "origin": "Vietnam"
}, {
  "id": 2,
  "name": "Triclosan",
  "price": 86386,
  "importedDate": "2022-03-04T05:23:20Z",
  "expiredDate": "2022-04-28T11:37:25Z",
  "description": "Other diagnostic procedures on salivary glands and ducts",
  "image": "http://dummyimage.com/194x259.png/dddddd/000000",
  "saleStart": "2022-07-22T08:21:51Z",
  "saleEnd": "2021-12-01T05:27:45Z",
  "salePercent": 93.0,
  "origin": "Vietnam"
}, {
  "id": 3,
  "name": "Neomycin Sulfate, Polymyxin B Sulfate, and Dexamethasone",
  "price": 85089,
  "importedDate": "2022-04-25T11:57:16Z",
  "expiredDate": "2024-01-09T20:52:03Z",
  "description": "Other diagnostic procedures on abdominal region",
  "image": "http://dummyimage.com/162x256.png/5fa2dd/ffffff",
  "saleStart": "2022-07-04T08:07:44Z",
  "saleEnd": "2021-10-31T03:16:52Z",
  "salePercent": 6.7,
  "origin": "Vietnam"
}, {
  "id": 4,
  "name": "OCTINOXATE and TITANIUM DIOXIDE",
  "price": 55031,
  "importedDate": "2022-06-29T07:05:51Z",
  "expiredDate": "2021-12-05T03:28:16Z",
  "description": "Transpleural thoracoscopy",
  "image": "http://dummyimage.com/187x230.png/cc0000/ffffff",
  "saleStart": null,
  "saleEnd": null,
  "salePercent": null,
  "origin": "Vietnam"
}, {
  "id": 5,
  "name": "Methylphenidate Hydrochloride",
  "price": 95933,
  "importedDate": "2022-01-02T21:15:04Z",
  "expiredDate": "2022-01-21T02:02:13Z",
  "description": "Rehabilitation, not elsewhere classified",
  "image": "http://dummyimage.com/184x273.png/ff4444/ffffff",
  "saleStart": "2022-07-30T14:34:36Z",
  "saleEnd": "2021-11-02T06:47:35Z",
  "salePercent": 7.5,
  "origin": "Vietnam"
}, {
  "id": 6,
  "name": "SPONGIA OFFICINALIS SKELETON, ROASTED",
  "price": 62132,
  "importedDate": "2022-09-12T13:23:51Z",
  "expiredDate": "2023-09-25T09:57:55Z",
  "description": "Correction of ureteropelvic junction",
  "image": "http://dummyimage.com/192x277.png/5fa2dd/ffffff",
  "saleStart": "2022-07-30T21:17:18Z",
  "saleEnd": "2022-10-11T16:56:57Z",
  "salePercent": 19.3,
  "origin": "Vietnam"
}, {
  "id": 7,
  "name": "WHOLE ARNICA PLANT",
  "price": 91852,
  "importedDate": "2022-06-26T16:20:56Z",
  "expiredDate": "2022-03-03T15:23:26Z",
  "description": "Biopsy of external ear",
  "image": "http://dummyimage.com/175x292.png/cc0000/ffffff",
  "saleStart": "2022-07-26T04:09:34Z",
  "saleEnd": "2022-10-25T16:56:16Z",
  "salePercent": 12.9,
  "origin": "Vietnam"
}, {
  "id": 8,
  "name": "Morphine Sulfate",
  "price": 51708,
  "importedDate": "2021-12-28T21:16:26Z",
  "expiredDate": "2022-03-13T11:12:28Z",
  "description": "Bronchoscopic bronchial thermoplasty, ablation of airway smooth muscle",
  "image": "http://dummyimage.com/181x209.png/ff4444/ffffff",
  "saleStart": "2021-11-22T09:44:23Z",
  "saleEnd": "2022-10-16T04:57:12Z",
  "salePercent": 2.3,
  "origin": "Vietnam"
}, {
  "id": 9,
  "name": "lovastatin",
  "price": 96162,
  "importedDate": "2021-11-01T16:48:05Z",
  "expiredDate": "2022-10-07T14:01:34Z",
  "description": "Laparoscopic unilateral oophorectomy",
  "image": "http://dummyimage.com/196x239.png/cc0000/ffffff",
  "saleStart": "2022-09-28T17:21:24Z",
  "saleEnd": "2022-07-28T22:20:44Z",
  "salePercent": 43.9,
  "origin": "Vietnam"
}, {
  "id": 10,
  "name": "Allergenic Extracts Alum Precipitated",
  "price": 81826,
  "importedDate": "2022-04-02T02:42:19Z",
  "expiredDate": "2022-01-03T01:21:56Z",
  "description": "Osteopathic manipulative treatment for general mobilization",
  "image": "http://dummyimage.com/126x237.png/dddddd/000000",
  "saleStart": "2022-06-18T23:35:40Z",
  "saleEnd": "2022-05-21T12:34:01Z",
  "salePercent": 70.5,
  "origin": "Vietnam"
}];

const mockProduct = () => new Promise<ProductModel[]>((resolve) =>
  setTimeout(() => resolve(shuffleArray(products)), 500)
);

export default mockProduct;
