import { BranchModel } from "../model/branch.model";
import { ManagerModel } from "../model/manager.model";
import { GENDER } from "../const/gender.const";
import { USER_ROLE } from "../const/user-role.const";

const Branch: BranchModel[] = [
  {
    id: 1,
    name: "Brainbox",
    manager: 1,
    phone: "019 337 2721",
    address: "0520 Boyd Trail",
    email: "cbassilashvili0@vk.com",
    logo: "http://dummyimage.com/230x100.png/5fa2dd/ffffff",
  },
  {
    id: 2,
    name: "Photofeed",
    manager: 2,
    phone: "063 436 2320",
    address: "6360 Susan Lane",
    email: "ltiler1@people.com.cn",
    logo: "http://dummyimage.com/120x147.png/dddddd/000000",
  },
  {
    id: 3,
    name: "Eidel",
    manager: 3,
    phone: "059 314 8193",
    address: "9 Park Meadow Lane",
    email: "dmccanny2@google.it",
    logo: "http://dummyimage.com/116x121.png/cc0000/ffffff",
  },
  {
    id: 4,
    name: "Twimm",
    manager: 4,
    phone: "053 753 9417",
    address: "5965 Spaight Alley",
    email: "jbeeble3@marketwatch.com",
    logo: "http://dummyimage.com/189x218.png/dddddd/000000",
  },
  {
    id: 5,
    name: "Vipe",
    manager: 5,
    phone: "079 280 4255",
    address: "3158 Kenwood Place",
    email: "gcarlo4@dailymail.co.uk",
    logo: "http://dummyimage.com/176x163.png/5fa2dd/ffffff",
  },
  {
    id: 6,
    name: "Ooba",
    manager: 6,
    phone: "062 554 8131",
    address: "0 Johnson Lane",
    email: "dcory5@freewebs.com",
    logo: "http://dummyimage.com/183x106.png/cc0000/ffffff",
  },
  {
    id: 7,
    name: "Demizz",
    manager: 7,
    phone: "035 364 4715",
    address: "3332 Chinook Junction",
    email: "jrulf6@usatoday.com",
    logo: "http://dummyimage.com/126x144.png/5fa2dd/ffffff",
  },
  {
    id: 8,
    name: "Mynte",
    manager: 8,
    phone: "053 810 7298",
    address: "66 Wayridge Plaza",
    email: "dblaiklock7@surveymonkey.com",
    logo: "http://dummyimage.com/218x100.png/cc0000/ffffff",
  },
  {
    id: 9,
    name: "Snaptags",
    manager: 9,
    phone: "019 949 1674",
    address: "44732 Fairfield Alley",
    email: "aferriby8@deviantart.com",
    logo: "http://dummyimage.com/203x227.png/5fa2dd/ffffff",
  },
  {
    id: 10,
    name: "Jetpulse",
    manager: 10,
    phone: "078 190 4882",
    address: "25 Grim Way",
    email: "brushbrooke9@netlog.com",
    logo: "http://dummyimage.com/134x113.png/5fa2dd/ffffff",
  },
];

const BranchWithManager: BranchModel<ManagerModel>[] = [
  {
    id: 1,
    name: "Brainbox",
    manager: {
      id: 1,
      name: "Latia Barks",
      email: "lbarks0@hubpages.com",
      phone: "045 720 8427",
      dateOfBirth: new Date().toISOString(),
      gender: GENDER.male,
      address: "sample",
      image: "http://dummyimage.com/230x100.png/5fa2dd/ffffff",
      role: USER_ROLE.manager,
    },
    phone: "019 337 2721",
    address: "0520 Boyd Trail",
    email: "cbassilashvili0@vk.com",
    logo: "http://dummyimage.com/230x100.png/5fa2dd/ffffff",
  },
  {
    id: 2,
    name: "Photofeed",
    manager: {
      id: 2,
      name: "Karlie Matteotti",
      email: "kmatteotti1@google.nl",
      phone: "060 274 9514",
      dateOfBirth: new Date().toISOString(),
      gender: GENDER.male,
      address: "sample",
      image: "http://dummyimage.com/230x100.png/5fa2dd/ffffff",
      role: USER_ROLE.manager,
    },
    phone: "063 436 2320",
    address: "6360 Susan Lane",
    email: "ltiler1@people.com.cn",
    logo: "http://dummyimage.com/120x147.png/dddddd/000000",
  },
  {
    id: 3,
    name: "Eidel",
    manager: {
      id: 3,
      name: "Orbadiah Ivanishchev",
      email: "oivanishchev2@ebay.com",
      phone: "066 271 4051",
      dateOfBirth: new Date().toISOString(),
      gender: GENDER.male,
      address: "sample",
      image: "http://dummyimage.com/230x100.png/5fa2dd/ffffff",
      role: USER_ROLE.manager,
    },
    phone: "059 314 8193",
    address: "9 Park Meadow Lane",
    email: "dmccanny2@google.it",
    logo: "http://dummyimage.com/116x121.png/cc0000/ffffff",
  },
  {
    id: 4,
    name: "Twimm",
    manager: {
      id: 4,
      name: "Lynda Kimbell",
      email: "lkimbell3@istockphoto.com",
      phone: "045 600 4635",
      dateOfBirth: new Date().toISOString(),
      gender: GENDER.male,
      address: "sample",
      image: "http://dummyimage.com/230x100.png/5fa2dd/ffffff",
      role: USER_ROLE.manager,
    },
    phone: "053 753 9417",
    address: "5965 Spaight Alley",
    email: "jbeeble3@marketwatch.com",
    logo: "http://dummyimage.com/189x218.png/dddddd/000000",
  },
  {
    id: 5,
    name: "Vipe",
    manager: {
      id: 5,
      name: "Rozanne Halliday",
      email: "rhalliday4@nationalgeographic.com",
      phone: "096 769 1557",
      dateOfBirth: new Date().toISOString(),
      gender: GENDER.male,
      address: "sample",
      image: "http://dummyimage.com/230x100.png/5fa2dd/ffffff",
      role: USER_ROLE.manager,
    },
    phone: "079 280 4255",
    address: "3158 Kenwood Place",
    email: "gcarlo4@dailymail.co.uk",
    logo: "http://dummyimage.com/176x163.png/5fa2dd/ffffff",
  },
  {
    id: 6,
    name: "Ooba",
    manager: {
      id: 6,
      name: "Vick Harwick",
      email: "vharwick5@xinhuanet.com",
      phone: "047 623 5195",
      dateOfBirth: new Date().toISOString(),
      gender: GENDER.male,
      address: "sample",
      image: "http://dummyimage.com/230x100.png/5fa2dd/ffffff",
      role: USER_ROLE.manager,
    },
    phone: "862 554 8131",
    address: "0 Johnson Lane",
    email: "dcory5@freewebs.com",
    logo: "http://dummyimage.com/183x106.png/cc0000/ffffff",
  },
  {
    id: 7,
    name: "Demizz",
    manager: {
      id: 7,
      name: "Ulrich Marushak",
      email: "umarushak6@sphinn.com",
      phone: "016 482 6234",
      dateOfBirth: new Date().toISOString(),
      gender: GENDER.male,
      address: "sample",
      image: "http://dummyimage.com/230x100.png/5fa2dd/ffffff",
      role: USER_ROLE.manager,
    },
    phone: "535 364 4715",
    address: "3332 Chinook Junction",
    email: "jrulf6@usatoday.com",
    logo: "http://dummyimage.com/126x144.png/5fa2dd/ffffff",
  },
  {
    id: 8,
    name: "Mynte",
    manager: {
      id: 8,
      name: "Dillon Ashard",
      email: "dashard7@samsung.com",
      phone: "042 502 6122",
      dateOfBirth: new Date().toISOString(),
      gender: GENDER.male,
      address: "sample",
      image: "http://dummyimage.com/230x100.png/5fa2dd/ffffff",
      role: USER_ROLE.manager,
    },
    phone: "053 810 7298",
    address: "66 Wayridge Plaza",
    email: "dblaiklock7@surveymonkey.com",
    logo: "http://dummyimage.com/218x100.png/cc0000/ffffff",
  },
  {
    id: 9,
    name: "Snaptags",
    manager: {
      id: 9,
      name: "Stephanie Gronav",
      email: "sgronav8@homestead.com",
      phone: "007 259 8031",
      dateOfBirth: new Date().toISOString(),
      gender: GENDER.male,
      address: "sample",
      image: "http://dummyimage.com/230x100.png/5fa2dd/ffffff",
      role: USER_ROLE.manager,
    },
    phone: "019 949 1674",
    address: "44732 Fairfield Alley",
    email: "aferriby8@deviantart.com",
    logo: "http://dummyimage.com/203x227.png/5fa2dd/ffffff",
  },
  {
    id: 10,
    name: "Jetpulse",
    manager: {
      id: 10,
      name: "Harcourt Rosel",
      email: "hrosel9@icq.com",
      phone: "024 770 0067",
      dateOfBirth: new Date().toISOString(),
      gender: GENDER.male,
      address: "sample",
      image: "http://dummyimage.com/230x100.png/5fa2dd/ffffff",
      role: USER_ROLE.manager,
    },
    phone: "078 190 4882",
    address: "25 Grim Way",
    email: "brushbrooke9@netlog.com",
    logo: "http://dummyimage.com/134x113.png/5fa2dd/ffffff",
  },
];

const mockBranch = () =>
  new Promise<BranchModel[]>((resolve) =>
    setTimeout(() => resolve(Branch), 500)
  );

export const mockBranchWithManager = () =>
  new Promise<BranchModel<ManagerModel>[]>((resolve) =>
    setTimeout(() => resolve(BranchWithManager), 500)
  );

export default mockBranch;
