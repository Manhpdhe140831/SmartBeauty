import { ServiceModel } from "../model/service.model";
import { shuffleArray } from "../utilities/fn.helper";
import { Supplier } from "./supplier";

const services: ServiceModel[] = [
  {
    id: 1,
    name: "SENNOSIDES",
    description: "Indeterminate stage glaucoma",
    duration: 42,
    image: "http://dummyimage.com/129x149.png/5fa2dd/ffffff",
    price: 698624,
    discountPercent: 1.1,
    discountStart: "2022-09-08T09:19:37Z",
    discountEnd: "2021-12-30T12:46:23Z",
    products: [],
  },
  {
    id: 2,
    name: "DIPHENHYDRAMINE HYDROCHLORIDE",
    description:
      "Abdominal or pelvic swelling, mass, or lump, right upper quadrant",
    duration: 68,
    image: "http://dummyimage.com/148x239.png/5fa2dd/ffffff",
    price: 73387,
    discountPercent: 76.2,
    discountStart: "2022-03-24T09:59:11Z",
    discountEnd: "2022-04-14T17:18:51Z",
    products: [],
  },
  {
    id: 3,
    name: "Triclosan",
    description: "Deep vascularization of cornea",
    duration: 78,
    image: "http://dummyimage.com/197x207.png/5fa2dd/ffffff",
    price: 673057,
    discountPercent: 21.3,
    discountStart: "2022-07-09T11:39:04Z",
    discountEnd: "2022-04-25T07:02:16Z",
    products: [],
  },
  {
    id: 4,
    name: "SIMETHICONE",
    description: "Hereditary optic atrophy",
    duration: 51,
    image: "http://dummyimage.com/243x106.png/dddddd/000000",
    price: 654429,
    discountPercent: 53.3,
    discountStart: "2022-05-25T01:30:13Z",
    discountEnd: "2022-05-30T05:34:20Z",
    products: [],
  },
  {
    id: 5,
    name: "Losartan Potassium and Hydrochlorothiazide",
    description: "Dizziness and giddiness",
    duration: 4,
    image: "http://dummyimage.com/159x205.png/5fa2dd/ffffff",
    price: 706802,
    discountPercent: 9.2,
    discountStart: "2022-05-21T02:30:48Z",
    discountEnd: "2022-11-21T14:07:04Z",
    products: [],
  },
  {
    id: 6,
    name: "CELECOXIB",
    description: "Other specified acquired deformity of head",
    duration: 57,
    image: "http://dummyimage.com/234x188.png/ff4444/ffffff",
    price: 520447,
    discountPercent: 12.7,
    discountStart: "2022-11-20T01:15:35Z",
    discountEnd: "2022-04-14T22:57:04Z",
    products: [],
  },
  {
    id: 7,
    name: "Calcium Acetate",
    description:
      "Late effect of injury to nerve root(s), spinal plexus(es), and other nerves of trunk",
    duration: 32,
    image: "http://dummyimage.com/225x174.png/5fa2dd/ffffff",
    price: 56437,
    discountPercent: 62.0,
    discountStart: "2022-01-25T06:09:26Z",
    discountEnd: "2022-02-02T01:13:03Z",
    products: [
      {
        product: {
          id: 1,
          name: "Triclosan",
          price: 61170,
          description: "Other diagnostic procedures on ureter",
          image: "http://dummyimage.com/170x204.png/ff4444/ffffff",
          discountStart: "2022-09-02T19:40:42Z",
          discountEnd: "2022-07-22T02:24:11Z",
          discountPercent: 73.3,
          supplier: Supplier[0]!.id,
          unit: "gram",
          dose: 12,
        }, // id product
        usage: 200,
      },
    ],
  },
  {
    id: 8,
    name: "methylphenidate hydrochloride",
    description: "Toxic effect of unspecified noxious substance eaten as food",
    duration: 100,
    image: "http://dummyimage.com/115x200.png/cc0000/ffffff",
    price: 361864,
    discountPercent: 28.9,
    discountStart: "2022-03-24T05:16:15Z",
    discountEnd: "2023-01-03T12:11:20Z",
    products: [],
  },
  {
    id: 9,
    name: "omeprazole",
    description:
      "Other disorders of lactation, postpartum condition or complication",
    duration: 2,
    image: "http://dummyimage.com/185x222.png/dddddd/000000",
    price: 727304,
    discountPercent: 58.7,
    discountStart: "2022-01-05T11:53:55Z",
    discountEnd: "2022-09-15T00:43:38Z",
    products: [],
  },
  {
    id: 10,
    name: "SODIUM MONOFLUOROPHOSPHATE",
    description: "Complications of reattached forearm",
    duration: 19,
    image: "http://dummyimage.com/228x182.png/5fa2dd/ffffff",
    price: 936095,
    discountPercent: 42.4,
    discountStart: "2022-05-09T15:57:02Z",
    discountEnd: "2022-05-20T21:04:48Z",
    products: [],
  },
];

const mockService = () =>
  new Promise<ServiceModel[]>((resolve) =>
    setTimeout(() => resolve(shuffleArray(services)), 500)
  );

export default mockService;
