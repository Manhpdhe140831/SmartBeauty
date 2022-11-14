import { Badge, Button, Divider, Image, Text } from "@mantine/core";
import { IconArrowDown, IconArrowRight, IconPlus } from "@tabler/icons";
import { BasePriceModel } from "../../../../../model/_price.model";
import { FC } from "react";
import {
  discountedAmount,
  formatPrice,
  isBetweenSale,
} from "../../../../../utilities/pricing.helper";
import { InvoiceItemsModel } from "../../../../../model/invoice.model";

export type BillingItemData = {
  id: number;
  name: string;
  image?: string;
  description?: string;
} & BasePriceModel;

type BillingItemProps = {
  data: BillingItemData;
  type: InvoiceItemsModel["type"];
  onSelected?: (data: BillingItemData, type: InvoiceItemsModel["type"]) => void;
};

const FoundBillingItem: FC<BillingItemProps> = ({ data, onSelected, type }) => {
  return (
    <div className="mb-2 flex space-x-4 rounded border p-4">
      <Image
        src={data.image}
        placeholder
        alt={data.name}
        radius={"lg"}
        width={120}
        height={120}
        fit={"cover"}
      />

      <div className="flex flex-1 flex-col">
        <Text
          className={"uppercase !leading-none"}
          color={"dimmed"}
          size={"sm"}
        >
          {type}
        </Text>
        <Text className={"line-clamp-2"} weight={600} size={"xl"}>
          {data.name}
        </Text>
        <Text size={"xs"} className={"line-clamp-2"} color={"dimmed"}>
          <b>Description:</b> {data.description}
        </Text>
        <Text>
          <b>Price:</b>{" "}
          <span className={"font-semibold"}>{formatPrice(data.price)} VND</span>
        </Text>
        {isBetweenSale(data) && (
          <>
            <Divider my={8} />
            <div className="flex items-center space-x-2">
              <Text size={"xs"} weight={500}>
                Current discount:
              </Text>
              <Badge
                variant={"filled"}
                color={"red"}
                leftSection={<IconArrowDown size={12} />}
              >
                {data.discountPercent}%
              </Badge>
              <IconArrowRight size={12} />
              <Text>{discountedAmount()}</Text>
            </div>
          </>
        )}
      </div>

      <div className={"flex"}>
        <Button
          onClick={() => onSelected && onSelected(data, type)}
          type={"button"}
          color={"teal"}
          h={"100%"}
          p={6}
        >
          <IconPlus />
        </Button>
      </div>
    </div>
  );
};

export default FoundBillingItem;