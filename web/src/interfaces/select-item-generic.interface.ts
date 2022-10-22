import { CustomSelectItemProps } from "../components/auto-complete-item";

export type SelectItemGeneric<typeGeneric extends object> = typeGeneric &
  Omit<CustomSelectItemProps, "id"> & { value: string; label: string };
