import { CourseModel } from "../model/course.model";
import { shuffleArray } from "../utilities/fn.helper";

export const RawCourses: CourseModel[] = [
  {
    id: 1,
    name: "Kali",
    price: 202290.29,
    timeOfUse: 61,
    duration: 38,
    image: "http://dummyimage.com/103x103.png/dddddd/000000",
    services: [1, 4],
    discountStart: null,
    discountEnd: null,
    discountPercent: null,
    description: "Unspecified malignant neoplasm of overlapping sites of skin",
  },
  {
    id: 2,
    name: "Jilleen",
    price: 651658.85,
    timeOfUse: 50,
    duration: 101,
    image: "http://dummyimage.com/152x151.png/ff4444/ffffff",
    services: [2, 3],
    discountStart: null,
    discountEnd: null,
    discountPercent: null,
    description:
      "Displaced fracture of third metatarsal bone, unspecified foot",
  },
  {
    id: 3,
    name: "Malva",
    price: 382388.91,
    timeOfUse: 49,
    duration: 30,
    image: "http://dummyimage.com/235x160.png/ff4444/ffffff",
    services: [1],
    discountStart: null,
    discountEnd: null,
    discountPercent: null,
    description:
      "Laceration of adductor muscle, fascia and tendon of right thigh, initial encounter",
  },
  {
    id: 4,
    name: "Daveen",
    price: 997994.55,
    timeOfUse: 22,
    duration: 291,
    image: "http://dummyimage.com/158x239.png/ff4444/ffffff",
    services: [],
    discountStart: null,
    discountEnd: null,
    discountPercent: null,
    description: "Blister (nonthermal) of right wrist, sequela",
  },
  {
    id: 5,
    name: "Rozanna",
    price: 57605.45,
    timeOfUse: 88,
    duration: 356,
    image: "http://dummyimage.com/248x111.png/cc0000/ffffff",
    services: [],
    discountStart: null,
    discountEnd: null,
    discountPercent: null,
    description:
      "Toxic effect of taipan venom, accidental (unintentional), subsequent encounter",
  },
  {
    id: 6,
    name: "Floria",
    price: 937108.51,
    timeOfUse: 18,
    duration: 34,
    image: "http://dummyimage.com/182x150.png/cc0000/ffffff",
    services: [],
    discountStart: null,
    discountEnd: null,
    discountPercent: null,
    description: "Schmorl's nodes, lumbar region",
  },
  {
    id: 7,
    name: "Alana",
    price: 606154.68,
    timeOfUse: 88,
    duration: 165,
    image: "http://dummyimage.com/225x170.png/cc0000/ffffff",
    services: [],
    discountStart: null,
    discountEnd: null,
    discountPercent: null,
    description:
      "Tidal wave due to earthquake or volcanic eruption, initial encounter",
  },
  {
    id: 8,
    name: "Phil",
    price: 274859.91,
    timeOfUse: 100,
    duration: 121,
    image: "http://dummyimage.com/245x134.png/cc0000/ffffff",
    services: [],
    discountStart: null,
    discountEnd: null,
    discountPercent: null,
    description:
      "Complete lesion at T1 level of thoracic spinal cord, initial encounter",
  },
  {
    id: 9,
    name: "Rozina",
    price: 632531.69,
    timeOfUse: 98,
    duration: 70,
    image: "http://dummyimage.com/119x236.png/5fa2dd/ffffff",
    services: [],
    discountStart: null,
    discountEnd: null,
    discountPercent: null,
    description:
      "Injury of peripheral nerve(s) at abdomen, lower back and pelvis level, sequela",
  },
  {
    id: 10,
    name: "Callie",
    price: 360405.0,
    timeOfUse: 55,
    duration: 65,
    image: "http://dummyimage.com/126x105.png/5fa2dd/ffffff",
    services: [],
    discountStart: null,
    discountEnd: null,
    discountPercent: null,
    description: "Nonrheumatic pulmonary valve insufficiency",
  },
];

const mockCourse = (name?: string) =>
  new Promise<CourseModel[]>((resolve) =>
    setTimeout(() => {
      if (!name) return resolve(shuffleArray(RawCourses));

      return resolve(
        shuffleArray(RawCourses).filter((s) =>
          s.name.toLowerCase().includes(name.toLowerCase())
        )
      );
    }, 500)
  );

export default mockCourse;
