import { useQuery } from "@tanstack/react-query";
import mockProduct from "../../../../../mock/product";
import mockService from "../../../../../mock/service";
import mockCourse from "../../../../../mock/course";
import { z } from "zod";
import { invoiceItemTypeSchema } from "../../../../../validation/invoice.schema";
import { FC, useEffect, useMemo, useState } from "react";
import { ItemTableViewData } from "../../../../../interfaces/invoice-props.interface";
import {
  discountedAmount,
  formatPrice,
  isBetweenSale,
} from "../../../../../utilities/pricing.helper";
import {
  ActionIcon,
  Badge,
  Image,
  NumberInput,
  Text,
  Tooltip,
} from "@mantine/core";
import { IconArrowDown, IconArrowRight, IconX } from "@tabler/icons";
import { stateInputProps } from "../../../../../utilities/mantine.helper";

type props = {
  itemNo: number;
  itemId: number;
  itemKey: string;
  itemType: z.infer<typeof invoiceItemTypeSchema>;
  itemQuantity: number;
  onRemove?: (
    index: number,
    item: ItemTableViewData,
    type: props["itemType"]
  ) => void;
  onQuantityChange?: (quantity?: number) => void;
};

const ViewBillingItem: FC<props> = ({
  itemKey,
  itemNo,
  itemId,
  itemType,
  itemQuantity,
  onQuantityChange,
  onRemove,
}) => {
  const { data: invoiceItem, isLoading } = useQuery(
    ["invoice-item-detail", itemId, itemType],
    async () => {
      let item: ItemTableViewData | undefined;
      if (itemType === "product") {
        item = (await mockProduct()).find((i) => i.id === itemId);
      } else if (itemType === "service") {
        item = (await mockService()).find((i) => i.id === itemId);
      } else {
        item = (await mockCourse()).find((i) => i.id === itemId);
      }
      return item;
    }
  );

  const isSaleOff = useMemo(() => isBetweenSale(invoiceItem), [invoiceItem]);
  const [categoryClass, setCategoryClass] = useState("border-transparent");

  useEffect(() => {
    let cc: string;
    if (itemType === "product") {
      cc = "border-blue-600";
    } else if (itemType === "service") {
      cc = "border-red-600";
    } else {
      cc = "border-green-600";
    }
    setCategoryClass(cc);
  }, [itemType]);

  return isLoading ? (
    <tr>
      <td colSpan={7}>Loading...</td>
    </tr>
  ) : (
    <>
      <tr
        key={itemKey}
        className={`border-l-4 ${categoryClass} ${
          !isSaleOff ? "" : "[&>td]:!border-b-transparent"
        }`}
      >
        <td className={"text-center"}>{itemNo}</td>
        <td>
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
        <td>
          <Tooltip label={invoiceItem?.name}>
            <Text className={"overflow-hidden text-ellipsis"} size={"xs"}>
              {invoiceItem?.name}
            </Text>
          </Tooltip>
        </td>
        <td className={"overflow-hidden text-right align-top"}>
          <div className="flex items-center justify-end space-x-2">
            <NumberInput
              placeholder={"amount..."}
              defaultValue={itemQuantity}
              hideControls
              min={1}
              max={100}
              onChange={(v) => onQuantityChange && onQuantityChange(v)}
              {...stateInputProps(undefined, itemType !== "product", {
                required: true,
                variant: "default",
                size: "xs",
                weight: 400,
                textAlign: "center",
              })}
            />
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
            {formatPrice((invoiceItem?.price ?? 0) * (itemQuantity ?? 1))}
          </p>
        </td>
        <td className={"align-top"}>
          {invoiceItem && (
            <ActionIcon
              type={"button"}
              onClick={() =>
                onRemove && onRemove(itemNo, invoiceItem, itemType)
              }
              color={"red"}
            >
              <IconX />
            </ActionIcon>
          )}
        </td>
      </tr>
      {isSaleOff && (
        <tr
          key={`${itemKey}-discount`}
          className={`border-l-4 ${categoryClass}`}
        >
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
          <td className={"!pt-1"} colSpan={2}>
            <Text color={"dimmed"}>
              {formatPrice(discountedAmount(invoiceItem, itemQuantity))}
            </Text>
          </td>
        </tr>
      )}
    </>
  );
};

export default ViewBillingItem;
