import { FC, useMemo } from "react";
import { Badge, Image, Text, Tooltip } from "@mantine/core";
import { IconArrowDown, IconArrowRight, IconX } from "@tabler/icons";
import {
  discountedAmount,
  formatPrice,
  isBetweenSale,
} from "../../../../../utilities/pricing.helper";
import { ItemTableViewData } from "../../../../../interfaces/invoice-props.interface";

export type ItemTableProps = {
  no: number;
  data?: ItemTableViewData;
  quantity: number;
};

const ItemAddonReadonly: FC<ItemTableProps> = ({
  data: invoiceItem,
  no,
  quantity,
}) => {
  const isSaleOff = useMemo(() => isBetweenSale(invoiceItem), [invoiceItem]);

  return (
    <>
      <tr className={!isSaleOff ? "" : "[&>td]:!border-b-transparent"}>
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
            <Text>{quantity}</Text>
            <IconX className={"mt-[2px]"} size={14} />
          </div>
        </td>
        <td className={"align-top"}>
          <p className={"overflow-hidden text-ellipsis"}>
            {invoiceItem?.price && formatPrice(invoiceItem?.price)}
          </p>
          <Text size={"xs"} color={"dimmed"}>
            / sản phẩm
          </Text>
        </td>
        <td className={"align-top"}>
          <p className={"overflow-hidden text-ellipsis"}>
            {formatPrice((invoiceItem?.price ?? 0) * (quantity ?? 1))}
          </p>
        </td>
      </tr>
      {isSaleOff && (
        <tr>
          <td className={"!pt-1 !pr-0"} colSpan={5}>
            <div className="flex items-center justify-end space-x-2">
              <small className="font-semibold leading-none">
                Áp dụng giảm giá!
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

export default ItemAddonReadonly;
