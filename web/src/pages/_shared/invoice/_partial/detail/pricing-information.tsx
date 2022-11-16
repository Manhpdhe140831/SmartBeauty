import { InvoiceModel } from "../../../../../model/invoice.model";
import { Divider, Tooltip } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { useEffect, useState } from "react";
import {
  calculateDiscountAmount,
  formatPrice,
  isBetweenSale,
} from "../../../../../utilities/pricing.helper";

type PricingInformationProps = {
  data?: InvoiceModel;
};

const PricingInformation = ({ data }: PricingInformationProps) => {
  const clipboard = useClipboard({ timeout: 500 });

  const [amountInfo, setAmount] = useState({
    subtotal: 0,
    discount: 0,
    tax: 0,
    due: 0,
  });

  useEffect(() => {
    if (!data) {
      setAmount({
        subtotal: 0,
        discount: 0,
        tax: 0,
        due: 0,
      });
      return;
    }

    let subtotal = 0;
    let discount = 0;
    let due: number;
    let tax: number;
    // price will be
    // subtotal = all product original price x quantity.
    // discount = all product discounted price x quality.
    // tax = 8% of (subtotal - discount)
    // due = (subtotal - discount) + tax

    if (data) {
      // the bill was completed. The price will be fixed!
      if (data.priceBeforeTax && data.priceAfterTax) {
        subtotal = data.priceBeforeTax;
        due = data.priceAfterTax;
        tax = Math.floor((due / 92) * 100) - due;
        discount = subtotal - due + tax;

        setAmount({
          subtotal,
          discount,
          tax,
          due,
        });
        return;
      }
    }

    data.addons.forEach((addon) => {
      subtotal += addon.item.price * addon.quantity;
      if (isBetweenSale(addon.item)) {
        discount += calculateDiscountAmount(addon.item) * addon.quantity;
      }
    });

    due = subtotal - discount;
    tax = Math.floor(due * 0.08); // 8 percent;
    due = due + tax;
    setAmount({
      subtotal,
      discount,
      tax,
      due,
    });
  }, [data]);

  return (
    <div className={"flex flex-col rounded-lg bg-white p-4 shadow"}>
      <h1 className="text-lg font-semibold">
        Thanh Toán <span className={"font-normal text-gray-400"}>(VND)</span>
      </h1>
      <Divider my={8} />

      <div className="flex select-none flex-col space-y-1 opacity-50 hover:opacity-100">
        <div className="flex px-2">
          <div className="w-24 font-semibold text-gray-500">Tổng cộng</div>
          <p className="flex-1 text-right font-semibold">
            {formatPrice(amountInfo.subtotal)}
          </p>
        </div>

        <div className="flex rounded bg-green-100 p-2 text-sm">
          <div className="w-24 font-semibold text-gray-500">Giảm giá</div>
          <p className="flex-1 text-right">
            -{formatPrice(amountInfo.discount)}
          </p>
        </div>

        <div className="flex rounded bg-gray-100 p-2 text-sm">
          <div className="w-24 font-semibold text-gray-500">Thuế (8%)</div>
          <p className="flex-1 text-right">+{formatPrice(amountInfo.tax)}</p>
        </div>
      </div>

      <Tooltip
        label={<small className={"text-xs text-gray-200"}>Click để copy</small>}
      >
        <div
          onClick={() => clipboard.copy(data?.priceAfterTax)}
          className="mt-2 flex flex-col"
        >
          <small
            className={
              "w-full text-right text-sm font-semibold uppercase text-gray-400"
            }
          >
            Thành Tiền
          </small>
          <h1
            className={
              "cursor-pointer select-none overflow-hidden text-ellipsis whitespace-nowrap text-right font-semibold leading-none"
            }
          >
            <span>
              {data?.priceAfterTax && formatPrice(data?.priceAfterTax)}
            </span>{" "}
            <small className={"select-none text-xs"}>VND</small>
          </h1>
        </div>
      </Tooltip>
    </div>
  );
};

export default PricingInformation;
