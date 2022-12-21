/**
 * Gender ENUM.
 * Default should be `other`
 */
export enum GENDER {
  male = "male",
  female = "female",
}

export const GENDER_VN = {
  [GENDER.male]: "Nam",
  [GENDER.female]: "Nữ",
} as const;
