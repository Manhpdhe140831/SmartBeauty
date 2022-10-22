import { ManagerModel } from "../model/manager.model";

export const Manager: ManagerModel[] = [
  {
    id: 1,
    name: "Latia Barks",
    email: "lbarks0@hubpages.com",
    mobile: "045 720 8427",
  },
  {
    id: 2,
    name: "Karlie Matteotti",
    email: "kmatteotti1@google.nl",
    mobile: "060 274 9514",
  },
  {
    id: 3,
    name: "Orbadiah Ivanishchev",
    email: "oivanishchev2@ebay.com",
    mobile: "066 271 4051",
  },
  {
    id: 4,
    name: "Lynda Kimbell",
    email: "lkimbell3@istockphoto.com",
    mobile: "045 600 4635",
  },
  {
    id: 5,
    name: "Rozanne Halliday",
    email: "rhalliday4@nationalgeographic.com",
    mobile: "096 769 1557",
  },
  {
    id: 6,
    name: "Vick Harwick",
    email: "vharwick5@xinhuanet.com",
    mobile: "047 623 5195",
  },
  {
    id: 7,
    name: "Ulrich Marushak",
    email: "umarushak6@sphinn.com",
    mobile: "016 482 6234",
  },
  {
    id: 8,
    name: "Dillon Ashard",
    email: "dashard7@samsung.com",
    mobile: "042 502 6122",
  },
  {
    id: 9,
    name: "Stephanie Gronav",
    email: "sgronav8@homestead.com",
    mobile: "007 259 8031",
  },
  {
    id: 10,
    name: "Harcourt Rosel",
    email: "hrosel9@icq.com",
    mobile: "024 770 0067",
  },
];

const mockManager = () =>
  new Promise<ManagerModel[]>((resolve) =>
    setTimeout(() => resolve(Manager), 500)
  );

export default mockManager;
