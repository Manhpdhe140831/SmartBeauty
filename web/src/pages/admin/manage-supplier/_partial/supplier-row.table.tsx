import {
  SupplierModel,
  SupplierUpdateEntity,
} from "../../../../model/supplier.model";
import { Tooltip } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { useState } from "react";
import SupplierDetailDialog from "../_supplier-detail.dialog";
import { useMutation } from "@tanstack/react-query";
import { IErrorResponse } from "../../../../interfaces/api.interface";
import { updateSupplier } from "../../../../services/supplier.service";
import { showNotification } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons";

type RowProps = {
  no: number;
  data: SupplierModel;
  rowUpdated?: () => void;
};

const SupplierRowTable = ({ data, no, rowUpdated }: RowProps) => {
  const clipboard = useClipboard({ timeout: 500 });
  const [view, setView] = useState(false);

  const updateMutation = useMutation<
    boolean,
    IErrorResponse,
    SupplierUpdateEntity
  >(["update-supplier"], (data: SupplierUpdateEntity) => updateSupplier(data), {
    onSuccess: () => {
      showNotification({
        title: "Success!",
        message: "You have updated the supplier!",
        color: "teal",
        icon: <IconCheck />,
      });
      setView(false);
      rowUpdated && rowUpdated();
    },
    onError: (e) => {
      console.error(e);
      showNotification({
        title: "Failed!",
        message: "Cannot update the supplier. Please try again!",
        color: "red",
        icon: <IconX />,
      });
    },
  });

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
        onClosed={async (u) => {
          if (u) {
            await updateMutation.mutateAsync(u);
            return;
          }
          setView(false);
        }}
      />
    </>
  );
};

export default SupplierRowTable;
