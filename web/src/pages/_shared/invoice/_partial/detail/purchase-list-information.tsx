import { Divider, Table } from "@mantine/core";
import { BillItemsModel } from "../../../../../model/invoice.model";
import { FC } from "react";

type BillItemsInformationProps = {
  data: BillItemsModel[];
  render: (item: BillItemsModel, index: number) => JSX.Element;
  removable?: boolean;
};

const PurchaseListInformation: FC<BillItemsInformationProps> = ({
  data,
  render,
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
        <tbody>{data.map((item, index) => render(item, index))}</tbody>
      </Table>
    </div>
  );
};

export default PurchaseListInformation;
