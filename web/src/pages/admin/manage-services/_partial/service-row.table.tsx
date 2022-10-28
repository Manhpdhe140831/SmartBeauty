import { Text, Tooltip } from "@mantine/core";
import SalePriceTableCell from "../../../../components/cell-sale-price.table";

const ServiceRowTable = () => {
  return (
    <>
      <tr className={"cursor-pointer"}>
        <td className={"text-center"}>1</td>
        <td className={"font-semibold"}>
          <Tooltip
            label={
              "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis,\n" +
              "              nesciunt."
            }
          >
            <Text size={"md"} className={"line-clamp-2"}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis,
              nesciunt.
            </Text>
          </Tooltip>
        </td>
        <td>
          <SalePriceTableCell
            priceModel={{
              price: 120000,
              discountPercent: 5,
              discountStart: null,
              discountEnd: null,
            }}
          />
        </td>
        <td>
          <Text className={"line-clamp-2"}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta
            dignissimos dolorum iure labore molestiae nostrum odit officiis
            placeat praesentium tempore.
          </Text>
        </td>
      </tr>
    </>
  );
};

export default ServiceRowTable;
