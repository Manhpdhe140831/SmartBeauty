import { BasePriceModel } from "../model/_price.model";
import { calculateDiscountAmount, isBetweenSale } from "./fn.helper";

export function discountedAmount(priceInfo?: BasePriceModel, quantity = 1) {
  if (!priceInfo) {
    return 0;
  }
  if (!isBetweenSale(priceInfo)) {
    return priceInfo.price * quantity;
  }
  return calculateDiscountAmount(priceInfo) * quantity;
}
