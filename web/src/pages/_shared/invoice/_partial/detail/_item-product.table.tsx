import { BillProductItem } from "../../../../../model/invoice.model";
import { FC } from "react";
import { Badge, Image, Text, Tooltip } from "@mantine/core";
import {
  calculateDiscount,
  formatPrice,
  isBetweenSale,
} from "../../../../../utilities/fn.helper";
import { BasePriceModel } from "../../../../../model/_price.model";
import { IconArrowDown } from "@tabler/icons";

type ItemTableProps = {
  no: number;
  data?: BillProductItem;
};

const ItemProductTable: FC<ItemTableProps> = ({ data, no }) => {
  function previewPrice(priceInfo?: BasePriceModel, quantity = 1) {
    if (!priceInfo) {
      return 0;
    }
    if (!isBetweenSale(priceInfo)) {
      return formatPrice(priceInfo.price * quantity);
    }
    return formatPrice(calculateDiscount(priceInfo) * quantity);
  }

  return (
    <tr>
      <td className={"text-right"}>{no}</td>
      <td>
        {data?.product.image && (
          <Image
            alt={data.product.name}
            src={data.product.image}
            width={32}
            height={32}
            fit={"cover"}
            radius={"md"}
          />
        )}
      </td>
      <td>
        <Tooltip label={data?.product.name}>
          <Text className={"overflow-hidden text-ellipsis"} size={"xs"}>
            {data?.product.name}
          </Text>
        </Tooltip>
      </td>
      <td className={"overflow-hidden text-center"}>{data?.quantity}</td>
      <td>
        <p className={"overflow-hidden text-ellipsis"}>
          {data?.product.price && formatPrice(data?.product.price)}
        </p>
        <Text size={"xs"} color={"dimmed"}>
          per product
        </Text>
      </td>
      <td>
        <p className={"overflow-hidden text-ellipsis"}>
          {previewPrice(data?.product, data?.quantity)}
        </p>
        {isBetweenSale(data?.product) && (
          <Badge
            variant={"filled"}
            color={"red"}
            size={"xs"}
            leftSection={<IconArrowDown size={12} />}
          >
            {data?.product.discountPercent}%
          </Badge>
        )}
      </td>
    </tr>
  );
};

export default ItemProductTable;
