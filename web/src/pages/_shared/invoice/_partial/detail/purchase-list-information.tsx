import { Divider, Table } from "@mantine/core";
import { BillCreateEntity } from "../../../../../model/invoice.model";
import { FC } from "react";
import ItemInvoiceTable from "./_item-invoice.table";

type BillItemsInformationProps = {
  data: BillCreateEntity["items"];
  onQuantityUpdate?: (quantity?: number) => void;
  removable?: boolean;
};

const PurchaseListInformation: FC<BillItemsInformationProps> = ({
  data,
  onQuantityUpdate,
  removable,
}) => {
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
          <col className={"w-20"} />
          <col className={"w-28"} />
          <col className={"w-24"} />
          {removable && <col className={"w-14"} />}
        </colgroup>
        <thead>
          <tr>
            <th className={"!text-right"}>No.</th>
            <th>Image</th>
            <th>Name</th>
            <th className={"!text-right"}>Quantity</th>
            <th>Price</th>
            <th>Due</th>
            {removable && <th />}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            let categoryClass: string;
            if (item.type === "product") {
              categoryClass = "border-blue-600";
            } else if (item.type === "service") {
              categoryClass = "border-red-600";
            } else {
              categoryClass = "border-green-600";
            }
            return (
              <ItemInvoiceTable
                key={`${item.type}-${index}`}
                no={index}
                data={item.item}
                type={item.type}
                quantity={item.quantity}
                categoryClass={categoryClass}
                onQuantityChange={onQuantityUpdate}
              />
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default PurchaseListInformation;
