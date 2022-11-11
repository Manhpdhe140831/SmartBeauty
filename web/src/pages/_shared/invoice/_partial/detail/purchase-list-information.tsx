import { Divider, Table } from "@mantine/core";
import { InvoiceModel } from "../../../../../model/invoice.model";
import { FC } from "react";
import ItemInvoiceTable from "./_item-invoice.table";

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
          <col className={"w-12"} />
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
            <th className={"!text-right"}>Quantity</th>
            <th>Price</th>
            <th>Due</th>
          </tr>
        </thead>
        <tbody>
          {data?.items.map((item, index) => {
            if (item.type === "product") {
              return (
                <ItemInvoiceTable
                  key={`${item.type}-${index}`}
                  no={index}
                  data={item.product}
                  quantity={item.quantity}
                  categoryClass={"border-blue-600"}
                />
              );
            } else if (item.type === "service") {
              return (
                <ItemInvoiceTable
                  key={`${item.type}-${index}`}
                  no={index}
                  data={item.service}
                  quantity={item.quantity}
                  categoryClass={"border-red-600"}
                />
              );
            }
            return (
              <ItemInvoiceTable
                key={`${item.type}-${index}`}
                no={index}
                data={item.course}
                quantity={item.quantity}
                categoryClass={"border-green-600"}
              />
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default PurchaseListInformation;
