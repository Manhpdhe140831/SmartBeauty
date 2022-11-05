import { CustomerModel } from "../model/customer.model";
import { GENDER } from "../const/gender.const";
import { shuffleArray } from "../utilities/fn.helper";

export const Customer: CustomerModel[] = [
  {
    id: 1,
    name: "Deonne Mixter",
    phone: "6205946312",
    email: "dmixter0@kickstarter.com",
    gender: GENDER.female,
    dateOfBirth: "2001-10-18T20:08:28Z",
    address: "94 Lunder Parkway",
  },
  {
    id: 2,
    name: "Ferdinand Becraft",
    phone: "4381881396",
    email: "fbecraft1@tripadvisor.com",
    gender: GENDER.male,
    dateOfBirth: "2004-04-06T00:34:40Z",
    address: "6060 Park Meadow Trail",
  },
  {
    id: 3,
    name: "Nikos Gilardengo",
    phone: "5499485055",
    email: "ngilardengo2@wikipedia.org",
    gender: GENDER.male,
    dateOfBirth: "2001-08-21T20:01:04Z",
    address: "35409 Hooker Circle",
  },
  {
    id: 4,
    name: "Isac Brodley",
    phone: "9311571022",
    email: "ibrodley3@purevolume.com",
    gender: GENDER.male,
    dateOfBirth: "1992-11-10T13:14:13Z",
    address: "9 Pearson Avenue",
  },
  {
    id: 5,
    name: "Yoshiko Timby",
    phone: "6432819724",
    email: "ytimby4@microsoft.com",
    gender: GENDER.female,
    dateOfBirth: "1994-03-12T07:36:13Z",
    address: "4 Northridge Trail",
  },
  {
    id: 6,
    name: "Silvain McBrearty",
    phone: "3026352811",
    email: "smcbrearty5@pagesperso-orange.fr",
    gender: GENDER.male,
    dateOfBirth: "1994-07-18T22:09:39Z",
    address: "2 Artisan Place",
  },
  {
    id: 7,
    name: "Bear McQuin",
    phone: "4883138544",
    email: "bmcquin6@phoca.cz",
    gender: GENDER.male,
    dateOfBirth: "2000-03-24T22:28:48Z",
    address: "94 Reindahl Avenue",
  },
  {
    id: 8,
    name: "Temp Barker",
    phone: "6747610538",
    email: "tbarker7@studiopress.com",
    gender: GENDER.male,
    dateOfBirth: "2003-11-05T05:04:17Z",
    address: "17 Vahlen Center",
  },
  {
    id: 9,
    name: "Rance Wrench",
    phone: "4962379399",
    email: "rwrench8@ebay.co.uk",
    gender: GENDER.male,
    dateOfBirth: "2001-11-08T00:52:46Z",
    address: "9110 7th Court",
  },
  {
    id: 10,
    name: "Dolores Finlry",
    phone: "6242592502",
    email: "dfinlry9@cisco.com",
    gender: GENDER.female,
    dateOfBirth: "1997-07-20T07:55:57Z",
    address: "6138 Esker Pass",
  },
];

const mockCustomer = () =>
  new Promise<CustomerModel[]>((resolve) =>
    setTimeout(() => resolve(shuffleArray(Customer)), 500)
  );

export default mockCustomer;
