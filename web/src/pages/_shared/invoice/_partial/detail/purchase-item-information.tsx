import { InvoiceModel } from "../../../../../model/invoice.model";
import { Badge, Divider, Image, Text } from "@mantine/core";
import {
  discountedAmount,
  formatPrice,
  isBetweenSale,
} from "../../../../../utilities/pricing.helper";
import { IconArrowDown } from "@tabler/icons";

type props = {
  item: InvoiceModel["item"];
  item_type: InvoiceModel["item_type"];
};

const PurchaseItemInformation = ({ item_type, item }: props) => {
  return (
    <div className={"flex flex-col space-y-2"}>
      <h1
        className={"select-none text-lg font-semibold capitalize text-gray-500"}
      >
        Sản phẩm đã chọn
      </h1>

      <div className={"flex space-x-4 rounded-lg border p-4"}>
        <Image
          radius={"lg"}
          width={120}
          height={120}
          src={item.image}
          alt={item.name}
        />

        <div className="flex flex-1 flex-col">
          <b className={"font-semibold uppercase text-gray-400"}>
            {item_type === "service" ? "Dịch vụ" : "Liệu trình"}
          </b>
          <h1
            className={
              "overflow-hidden text-ellipsis whitespace-nowrap text-xl"
            }
          >
            {item.name}
          </h1>

          <Divider my={12} />
          <Text className={"line-clamp-2"}>{item.description}</Text>
          <Divider my={12} />
          <div className="flex space-x-8">
            <span className={"font-semibold uppercase"}>Giá tiền</span>
            <div className="flex flex-1 flex-col items-end">
              {isBetweenSale(item) ? (
                <>
                  <Text
                    strikethrough
                    className={"select-none"}
                    color={"dimmed"}
                  >
                    {formatPrice(item.price)} VND
                  </Text>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={"filled"}
                      color={"red"}
                      leftSection={<IconArrowDown size={14} />}
                      className={"select-none"}
                    >
                      {item.discountPercent}%
                    </Badge>
                    <Text weight={"bold"} size={"lg"}>
                      {formatPrice(
                        Math.ceil(item.price - discountedAmount(item, 1))
                      )}{" "}
                      VND
                    </Text>
                  </div>
                </>
              ) : (
                <Text size={"lg"}>
                  <b>{formatPrice(item.price)}</b> VND
                </Text>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseItemInformation;
