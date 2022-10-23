import { ManagerModel } from "../model/manager.model";
import { GENDER } from "../const/gender.const";

export const Manager: ManagerModel[] = [
  {
    id: 1,
    name: "Latia Barks",
    email: "lbarks0@hubpages.com",
    mobile: "045 720 8427",
    dateOfBirth: new Date().toISOString(),
    gender: GENDER.male,
    address: "sample",
    avatar: "http://dummyimage.com/230x100.png/5fa2dd/ffffff",
  },
  {
    id: 2,
    name: "Karlie Matteotti",
    email: "kmatteotti1@google.nl",
    mobile: "060 274 9514",
    dateOfBirth: new Date().toISOString(),
    gender: GENDER.male,
    address: "sample",
    avatar: "http://dummyimage.com/230x100.png/5fa2dd/ffffff",
  },
  {
    id: 3,
    name: "Orbadiah Ivanishchev",
    email: "oivanishchev2@ebay.com",
    mobile: "066 271 4051",
    dateOfBirth: new Date().toISOString(),
    gender: GENDER.male,
    address: "sample",
    avatar: "http://dummyimage.com/230x100.png/5fa2dd/ffffff",
  },
  {
    id: 4,
    name: "Lynda Kimbell",
    email: "lkimbell3@istockphoto.com",
    mobile: "045 600 4635",
    dateOfBirth: new Date().toISOString(),
    gender: GENDER.male,
    address: "sample",
    avatar: "http://dummyimage.com/230x100.png/5fa2dd/ffffff",
  },
  {
    id: 5,
    name: "Rozanne Halliday",
    email: "rhalliday4@nationalgeographic.com",
    mobile: "096 769 1557",
    dateOfBirth: new Date().toISOString(),
    gender: GENDER.male,
    address: "sample",
    avatar: "http://dummyimage.com/230x100.png/5fa2dd/ffffff",
  },
  {
    id: 6,
    name: "Vick Harwick",
    email: "vharwick5@xinhuanet.com",
    mobile: "047 623 5195",
    dateOfBirth: new Date().toISOString(),
    gender: GENDER.male,
    address: "sample",
    avatar: "http://dummyimage.com/230x100.png/5fa2dd/ffffff",
  },
  {
    id: 7,
    name: "Ulrich Marushak",
    email: "umarushak6@sphinn.com",
    mobile: "016 482 6234",
    dateOfBirth: new Date().toISOString(),
    gender: GENDER.male,
    address: "sample",
    avatar: "http://dummyimage.com/230x100.png/5fa2dd/ffffff",
  },
  {
    id: 8,
    name: "Dillon Ashard",
    email: "dashard7@samsung.com",
    mobile: "042 502 6122",
    dateOfBirth: new Date().toISOString(),
    gender: GENDER.male,
    address: "sample",
    avatar: "http://dummyimage.com/230x100.png/5fa2dd/ffffff",
  },
  {
    id: 9,
    name: "Stephanie Gronav",
    email: "sgronav8@homestead.com",
    mobile: "007 259 8031",
    dateOfBirth: new Date().toISOString(),
    gender: GENDER.male,
    address: "sample",
    avatar: "http://dummyimage.com/230x100.png/5fa2dd/ffffff",
  },
  {
    id: 10,
    name: "Harcourt Rosel",
    email: "hrosel9@icq.com",
    mobile: "024 770 0067",
    dateOfBirth: new Date().toISOString(),
    gender: GENDER.male,
    address: "sample",
    avatar: "http://dummyimage.com/230x100.png/5fa2dd/ffffff",
  },
];

const mockManager = () =>
  new Promise<ManagerModel[]>((resolve) =>
    setTimeout(() => resolve(Manager), 500)
  );

export default mockManager;
