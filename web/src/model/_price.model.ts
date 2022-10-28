export interface BasePriceModel {
  price: number;
  discountPercent: number | null;
  discountStart: string | null;
  discountEnd: string | null;
}
