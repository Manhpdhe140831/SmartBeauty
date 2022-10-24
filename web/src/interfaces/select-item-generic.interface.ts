import { CustomSelectItemProps } from "../components/auto-complete-item";

/**
 * Strong-typed the item in the select (dropdown) of MantineUI
 */
export type SelectItemGeneric<typeGeneric extends object> = typeGeneric &
  Omit<CustomSelectItemProps, "id"> & { value: string; label: string };
