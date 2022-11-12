import { InvoiceModel } from "../../../../../model/invoice.model";
import { Divider, Tooltip } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import {
  calculateDiscountAmount,
  formatPrice,
  isBetweenSale,
} from "../../../../../utilities/fn.helper";
import { BasePriceModel } from "../../../../../model/_price.model";
import { useEffect, useState } from "react";

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
        tax = Math.floor((data.priceAfterTax / 92) * 100);
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

    data.items.forEach((item) => {
      let buyStuff: BasePriceModel;
      if (item.type === "product") {
        buyStuff = item.product;
      } else if (item.type === "service") {
        buyStuff = item.service;
      } else {
        buyStuff = item.course;
      }
      subtotal += buyStuff.price * item.quantity;
      if (isBetweenSale(buyStuff)) {
        discount += calculateDiscountAmount(buyStuff) * item.quantity;
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
        Amount Due <span className={"font-normal text-gray-400"}>(VND)</span>
      </h1>
      <Divider my={8} />

      <div className="flex select-none flex-col space-y-1 opacity-50 hover:opacity-100">
        <div className="flex px-2">
          <div className="w-24 font-semibold text-gray-500">Subtotal</div>
          <p className="flex-1 text-right font-semibold">
            {formatPrice(amountInfo.subtotal)}
          </p>
        </div>

        <div className="flex rounded bg-green-100 p-2 text-sm">
          <div className="w-24 font-semibold text-gray-500">Discount</div>
          <p className="flex-1 text-right">
            -{formatPrice(amountInfo.discount)}
          </p>
        </div>

        <div className="flex rounded bg-gray-100 p-2 text-sm">
          <div className="w-24 font-semibold text-gray-500">Tax (8%)</div>
          <p className="flex-1 text-right">+{formatPrice(amountInfo.tax)}</p>
        </div>
      </div>

      <Tooltip
        label={<small className={"text-xs text-gray-200"}>Click to copy</small>}
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
            Deposit Due
          </small>
          <h1
            className={
              "cursor-pointer select-none overflow-hidden text-ellipsis whitespace-nowrap text-right font-semibold leading-none"
            }
          >
            {data?.priceAfterTax && formatPrice(data?.priceAfterTax)}
          </h1>
        </div>
      </Tooltip>
    </div>
  );
};

export default PricingInformation;
