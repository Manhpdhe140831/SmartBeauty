import { FC, useMemo } from "react";
import {
  ActionIcon,
  Badge,
  Image,
  NumberInput,
  Text,
  Tooltip,
} from "@mantine/core";
import { IconArrowDown, IconArrowRight, IconX } from "@tabler/icons";
import {
  discountedAmount,
  formatPrice,
  isBetweenSale,
} from "../../../../../utilities/pricing.helper";
import { BasePriceModel } from "../../../../../model/_price.model";
import { z } from "zod";
import { invoiceItemTypeSchema } from "../../../../../validation/invoice.schema";
import { useQuery } from "@tanstack/react-query";
import mockProduct from "../../../../../mock/product";
import mockService from "../../../../../mock/service";
import mockCourse from "../../../../../mock/course";

type itemModel = {
  image?: string;
  name: string;
} & BasePriceModel;

export type ItemTableProps = {
  no: number;
  data?: number;
  type: z.infer<typeof invoiceItemTypeSchema>;
  quantity: number;
  categoryClass: string;
  onRemove?: (index: number, item: ItemTableProps["data"]) => void;
  onQuantityChange?: (quantity?: number) => void;
  quantityDisabled?: boolean;
};

const ItemInvoiceTable: FC<ItemTableProps> = ({
  data,
  type,
  no,
  quantity,
  categoryClass,
  onRemove,
  onQuantityChange,
  quantityDisabled,
}) => {
  const { data: invoiceItem, isLoading } = useQuery(
    ["invoice-item-detail", data, type],
    async () => {
      let item: itemModel | undefined;
      if (type === "product") {
        item = (await mockProduct()).find((i) => i.id === data);
      } else if (type === "service") {
        item = (await mockService()).find((i) => i.id === data);
      } else {
        item = (await mockCourse()).find((i) => i.id === data);
      }
      return item;
    }
  );

  const isSaleOff = useMemo(() => isBetweenSale(invoiceItem), [invoiceItem]);

  return (
    <>
      <tr
        className={`border-l-4 ${categoryClass} ${
          !isSaleOff ? "" : "[&>td]:!border-b-transparent"
        }`}
      >
        <td className={"text-center align-top"}>{no}</td>
        <td className={"align-top"}>
          {invoiceItem?.image && (
            <Image
              alt={invoiceItem.name}
              src={invoiceItem.image}
              width={32}
              height={32}
              fit={"cover"}
              radius={"md"}
            />
          )}
        </td>
        <td className={"align-top"}>
          <Tooltip label={invoiceItem?.name}>
            <Text className={"overflow-hidden text-ellipsis"} size={"xs"}>
              {invoiceItem?.name}
            </Text>
          </Tooltip>
        </td>
        <td className={"overflow-hidden text-right align-top"}>
          <div className="flex items-center justify-end space-x-2">
            {onQuantityChange ? (
              <NumberInput
                placeholder={"amount..."}
                defaultValue={quantity}
                readOnly={quantityDisabled}
                onChange={(v) => onQuantityChange(v)}
              />
            ) : (
              <Text>{quantity}</Text>
            )}
            <IconX className={"mt-[2px]"} size={14} />
          </div>
        </td>
        <td className={"align-top"}>
          <p className={"overflow-hidden text-ellipsis"}>
            {invoiceItem?.price && formatPrice(invoiceItem?.price)}
          </p>
          <Text size={"xs"} color={"dimmed"}>
            per product
          </Text>
        </td>
        <td className={"align-top"}>
          <p className={"overflow-hidden text-ellipsis"}>
            {formatPrice((invoiceItem?.price ?? 0) * (quantity ?? 1))}
          </p>
        </td>
        {onRemove && (
          <td rowSpan={2}>
            <ActionIcon onClick={() => onRemove(no, data)} color={"red"}>
              <IconX />
            </ActionIcon>
          </td>
        )}
      </tr>
      {isSaleOff && (
        <tr className={"border-l-4 border-blue-600"}>
          <td className={"!pt-1 !pr-0"} colSpan={5}>
            <div className="flex items-center justify-end space-x-2">
              <small className="font-semibold leading-none">
                Applied Discount!
              </small>
              <Badge
                variant={"filled"}
                color={"red"}
                size={"sm"}
                mt={2}
                leftSection={<IconArrowDown size={12} />}
              >
                {invoiceItem?.discountPercent}%
              </Badge>
              <IconArrowRight className={"mt-[2px]"} size={14} />
              <Text className={"leading-none"} color={"dimmed"}>
                -
              </Text>
            </div>
          </td>
          <td className={"!pt-1"}>
            <Text color={"dimmed"}>
              {formatPrice(discountedAmount(invoiceItem, quantity))}
            </Text>
          </td>
        </tr>
      )}
    </>
  );
};

export default ItemInvoiceTable;
