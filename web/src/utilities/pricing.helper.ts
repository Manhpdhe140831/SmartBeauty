import { BasePriceModel } from "../model/_price.model";
import { calculateDiscount, isBetweenSale } from "./fn.helper";

export function discountedAmount(priceInfo?: BasePriceModel, quantity = 1) {
  if (!priceInfo) {
    return 0;
  }
  if (!isBetweenSale(priceInfo)) {
    return priceInfo.price * quantity;
  }
  return (priceInfo.price - calculateDiscount(priceInfo)) * quantity;
}
