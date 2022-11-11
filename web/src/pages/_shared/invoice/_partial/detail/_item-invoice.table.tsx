import { FC } from "react";
import { Badge, Image, Text, Tooltip } from "@mantine/core";
import { formatPrice, isBetweenSale } from "../../../../../utilities/fn.helper";
import { IconArrowDown, IconArrowRight, IconX } from "@tabler/icons";
import { discountedAmount } from "../../../../../utilities/pricing.helper";
import { BasePriceModel } from "../../../../../model/_price.model";

type ItemTableProps = {
  no: number;
  data?: {
    image?: string;
    name: string;
  } & BasePriceModel;
  quantity: number;
  categoryClass: string;
};

const ItemInvoiceTable: FC<ItemTableProps> = ({
  data,
  no,
  quantity,
  categoryClass,
}) => {
  return (
    <>
      <tr className={`border-l-4 ${categoryClass}`}>
        <td className={"text-center"}>{no}</td>
        <td>
          {data?.image && (
            <Image
              alt={data.name}
              src={data.image}
              width={32}
              height={32}
              fit={"cover"}
              radius={"md"}
            />
          )}
        </td>
        <td>
          <Tooltip label={data?.name}>
            <Text className={"overflow-hidden text-ellipsis"} size={"xs"}>
              {data?.name}
            </Text>
          </Tooltip>
        </td>
        <td className={"overflow-hidden text-right"}>
          <div className="flex items-center justify-end space-x-2">
            <Text>{quantity}</Text>
            <IconX className={"mt-[2px]"} size={14} />
          </div>
        </td>
        <td>
          <p className={"overflow-hidden text-ellipsis"}>
            {data?.price && formatPrice(data?.price)}
          </p>
          <Text size={"xs"} color={"dimmed"}>
            per product
          </Text>
        </td>
        <td>
          <p className={"overflow-hidden text-ellipsis"}>
            {formatPrice((data?.price ?? 0) * (quantity ?? 1))}
          </p>
        </td>
      </tr>
      {isBetweenSale(data) && (
        <tr className={"border-l-4 border-blue-600"}>
          <td className={"!pt-1 !pr-0"} colSpan={5}>
            <div className="flex items-center justify-end space-x-4">
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
                {data?.discountPercent}%
              </Badge>
              <IconArrowRight className={"mt-[2px]"} size={14} />
              <Text className={"leading-none"} color={"dimmed"}>
                -
              </Text>
            </div>
          </td>
          <td className={"!pt-1"}>
            <Text color={"dimmed"}>
              {formatPrice(discountedAmount(data, quantity))}
            </Text>
          </td>
        </tr>
      )}
    </>
  );
};

export default ItemInvoiceTable;
