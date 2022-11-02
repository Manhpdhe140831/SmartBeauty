import { SupplierModel } from "../../../../model/supplier.model";
import { Tooltip } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { useState } from "react";
import SupplierDetailDialog from "../_supplier-detail.dialog";

type RowProps = {
  no: number;
  data: SupplierModel;
  rowUpdated?: () => void;
};

const SupplierRowTable = ({ data, no, rowUpdated }: RowProps) => {
  const clipboard = useClipboard({ timeout: 500 });
  const [view, setView] = useState(false);

  return (
    <>
      <tr onClick={() => setView(true)} className={"cursor-pointer"}>
        <td className="text-center">{no}</td>
        <td
          onClick={() => clipboard.copy(data.name)}
          className="overflow-hidden text-ellipsis"
        >
          <Tooltip label={data.name}>
            <span>{data.name}</span>
          </Tooltip>
        </td>

        <td onClick={() => clipboard.copy(data.phone)}>{data.phone}</td>
        <td
          onClick={() => clipboard.copy(data.email)}
          className="overflow-hidden text-ellipsis"
        >
          {data.email}
        </td>
        <td
          onClick={() => clipboard.copy(data.address)}
          className="overflow-hidden text-ellipsis"
        >
          <Tooltip label={data.address}>
            <span>{data.address}</span>
          </Tooltip>
        </td>
      </tr>
      <SupplierDetailDialog
        mode={"view"}
        key={data.id}
        data={data}
        opened={view}
        onClosed={(u) => {
          if (u) {
            console.log(u);
            rowUpdated && rowUpdated();
          }
          setView(false);
        }}
      />
    </>
  );
};

export default SupplierRowTable;
