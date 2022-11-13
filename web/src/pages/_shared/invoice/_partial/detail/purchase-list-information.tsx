import { Divider, Table } from "@mantine/core";
import {
  InvoiceItemsCreateEntity,
  InvoiceItemsModel,
} from "../../../../../model/invoice.model";

type BillItemsInformationProps<
  T extends InvoiceItemsModel | InvoiceItemsCreateEntity
> = {
  data: T[];
  removable?: boolean;
  renderItem: (item: T, index: number) => JSX.Element;
};

const PurchaseListInformation = <
  T extends InvoiceItemsModel | InvoiceItemsCreateEntity
>({
  data,
  removable,
  renderItem,
}: BillItemsInformationProps<T>) => {
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
          {removable && <col className={"w-12"} />}
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
        <tbody>{data.map((item, index) => renderItem(item, index))}</tbody>
      </Table>
    </div>
  );
};

export default PurchaseListInformation;
