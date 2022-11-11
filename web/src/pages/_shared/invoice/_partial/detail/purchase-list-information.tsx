import { Divider, Table } from "@mantine/core";
import { InvoiceModel } from "../../../../../model/invoice.model";
import { FC } from "react";
import ItemProductTable from "./_item-product.table";

type BillItemsInformationProps = {
  data?: InvoiceModel;
};

const PurchaseListInformation: FC<BillItemsInformationProps> = ({ data }) => {
  console.log(data);
  return (
    <div className="flex flex-col">
      <h1 className="text-lg font-semibold">Purchased Items</h1>

      <Divider my={8} />

      <Table
        horizontalSpacing={"xs"}
        verticalSpacing={"xs"}
        className={"table-fixed"}
        highlightOnHover
        fontSize={"sm"}
      >
        <colgroup>
          <col className={"w-14"} />
          <col className={"w-14"} />
          <col />
          <col className={"w-24"} />
          <col className={"w-24"} />
          <col className={"w-24"} />
        </colgroup>
        <thead>
          <tr>
            <th className={"!text-right"}>No.</th>
            <th>Image</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Due</th>
          </tr>
        </thead>
        <tbody>
          {data?.items.map((item, index) => {
            if (item.type === "product") {
              return (
                <ItemProductTable
                  key={`${item.type}-${index}`}
                  no={index}
                  data={item}
                />
              );
            }
            return <></>;
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default PurchaseListInformation;
