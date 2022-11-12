/* Randomize an array using Durstenfeld shuffle algorithm */
import { AutoCompleteItemProp } from "../components/auto-complete-item";
import { DefaultMantineColor } from "@mantine/core";
import dayjs from "dayjs";
import { BasePriceModel } from "../model/_price.model";

export function shuffleArray<T>(originalArr: T[]) {
  // shallow clone the array since we only need to shuffle its position.
  const array = [...originalArr];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j]!;
    array[j] = temp!;
  }
  return array;
}

export function formatPrice(price: number) {
  // 123456 -> 123.456
  return new Intl.NumberFormat("vi-VN").format(price);
}

export const formatterNumberInput = (value: string | undefined): string => {
  if (value === undefined) {
    return "";
  }
  let priceCandidate = value;
  if (Number.isNaN(+value)) {
    priceCandidate = value.replace(/[^0-9]/g, "");
  }
  return formatPrice(+priceCandidate);
};

export const parserNumberInput = (
  value: string | undefined
): string | undefined => value?.replace(/[.,]*/g, "");

export type AutoItemGenericType<T> = Partial<T> & {
  id: number;
  name: string;
  description: string;
  color?: DefaultMantineColor;
  image?: string;
};

export function rawToAutoItem<T extends object>(
  p: T,
  fn: (d: T) => AutoItemGenericType<T>
) {
  const fnParser = fn(p);
  return {
    value: String(fnParser.id),
    key: fnParser.id,
    label: fnParser.name,
    data: {
      ...p,
      description: fnParser.description,
      color: fnParser.color,
      image: fnParser.image,
    },
  } as AutoCompleteItemProp<T>;
}

export function toNumberType<T>(value?: T | null) {
  if (value === null || value === undefined) {
    return null;
  }

  const parsed = Number(value);
  if (isNaN(parsed)) {
    return null;
  }

  return parsed;
}

export function toStringType<T>(value?: T | null) {
  if (value === null || value === undefined) {
    return null;
  }
  return String(value);
}

/**
 * the date is between the sale duration
 * Either:
 * - After the starting date
 *  + Without the ending date.
 * - After the starting date
 *  + Before the ending date
 * - Before ending date
 *  + Without the starting date
 */
export function isBetweenSale(priceInfo?: BasePriceModel) {
  if (
    (!priceInfo?.discountEnd && !priceInfo?.discountStart) ||
    !priceInfo?.discountPercent
  ) {
    return false;
  }

  if (priceInfo.discountStart) {
    if (dayjs().isBefore(new Date(priceInfo.discountStart), "date")) {
      return false;
    }
  }

  if (priceInfo.discountEnd) {
    if (dayjs().isAfter(new Date(priceInfo.discountEnd), "date")) {
      return false;
    }
  }
  return true;
}

/**
 * Calculate the discounting price after discount.
 * @param discountData
 */
export function calculateDiscountAmount(discountData: BasePriceModel) {
  return ((discountData.discountPercent ?? 0) * discountData.price) / 100;
}
