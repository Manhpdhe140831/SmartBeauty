/* Randomize an array using Durstenfeld shuffle algorithm */
import dayjs from "dayjs";
import duration, { DurationUnitType } from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import { AutoCompleteItemProp } from "../components/auto-complete-item";
import { DefaultMantineColor } from "@mantine/core";

dayjs.extend(duration);
dayjs.extend(relativeTime);

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

export function formatTime(time: number, unit: DurationUnitType) {
  return dayjs.duration(time, unit).humanize();
}

export function ageTilToday(date: Date, withoutSuffix = true) {
  return dayjs(date).toNow(withoutSuffix);
}

/**
 * Convert iso format date string to a suitable viewing format.
 * @param date iso-format
 * @param format
 */
export function formatDate(date: string, format = "DD/MM/YYYY") {
  return dayjs(new Date(date)).format(format);
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
