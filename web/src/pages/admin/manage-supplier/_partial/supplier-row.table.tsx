import { SupplierModel } from "../../../../model/supplier.model";
import { Image, Tooltip } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { useState } from "react";
import SupplierDetailDialog from "../_supplier-detail.dialog";

type RowProps = {
  no: number;
  data: SupplierModel;
  rowUpdated?: () => void;
};

const SupplierRowTable = (props: RowProps) => {
  const clipboard = useClipboard({ timeout: 500 });
  const [view, setView] = useState(false);

  return (
    <>
      <tr onClick={() => setView(true)} className={"cursor-pointer"}>
        <td className="text-center">{props.no}</td>
        <td>
          <div className={"aspect-square w-full"}>
            <Image src={props.data.supplierImage} />
          </div>
        </td>
        <td
          onClick={() => clipboard.copy(props.data.name)}
          className="overflow-hidden text-ellipsis"
        >
          <Tooltip label={props.data.name}>
            <span>{props.data.name}</span>
          </Tooltip>
        </td>

        <td onClick={() => clipboard.copy(props.data.phone)}>
          {props.data.phone}
        </td>
        <td
          onClick={() => clipboard.copy(props.data.email)}
          className="overflow-hidden text-ellipsis"
        >
          {props.data.email}
        </td>
        <td
          onClick={() => clipboard.copy(props.data.address)}
          className="overflow-hidden text-ellipsis"
        >
          <Tooltip label={props.data.address}>
            <span>{props.data.address}</span>
          </Tooltip>
        </td>
      </tr>
      <SupplierDetailDialog
        mode={"view"}
        key={props.data.id}
        data={props.data}
        opened={view}
        onClosed={(u) => {
          if (u) {
            props.rowUpdated && props.rowUpdated();
          }
          setView(false);
        }}
      />
    </>
  );
};

export default SupplierRowTable;
