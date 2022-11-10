import { InvoiceModel } from "../../../../../model/invoice.model";
import { Divider, Tooltip } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { formatPrice } from "../../../../../utilities/fn.helper";

type PricingInformationProps = {
  data?: InvoiceModel;
};

const PricingInformation = ({ data }: PricingInformationProps) => {
  const clipboard = useClipboard({ timeout: 500 });

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
            {data?.priceBeforeTax && formatPrice(data?.priceBeforeTax)}
          </p>
        </div>

        <div className="rounded bg-green-100 p-2">
          <div className="flex text-sm">
            <div className="w-24 font-semibold text-gray-500">Discount</div>
            <p className="flex-1 text-right">10%</p>
          </div>
          <div className="flex text-sm">
            <div className="w-24"></div>
            <p className="flex-1 text-right">- 20.000</p>
          </div>
        </div>

        <div className="flex rounded bg-gray-100 p-2 text-sm">
          <div className="w-24 font-semibold text-gray-500">Tax (8%)</div>
          <p className="flex-1 text-right">+14.400</p>
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
