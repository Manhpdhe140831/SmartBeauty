import { useState } from "react";
import { IconSettings } from "@tabler/icons";
import { ActionIcon, Modal, Tooltip } from "@mantine/core";
import { ManagerModel } from "../../../../model/manager.model";
import { BillModel } from "../../../../model/bill.model";
import BillInfo from "../_view-bill";

type ModalProps = {
  onChanged?: (updated?: boolean) => void;
  billData: BillModel;
};

const BillViewModalBtn = ({ onChanged, billData }: ModalProps) => {
  const [viewBill, setViewBill] = useState<boolean>(false);

  return (
    <>
      {/* Button view Bill -> trigger modal*/}
      <Tooltip onClick={() => setViewBill(true)} label={"View / Edit"}>
        <ActionIcon className="!inline-flex" color="orange" variant="filled">
          <IconSettings size={12} />
        </ActionIcon>
      </Tooltip>
      <Modal
        title={
          <h1 className="text-center font-thin capitalize">Bill Detail</h1>
        }
        opened={viewBill}
        size={"auto"}
        onClose={() => {
          console.log("closed");
          // close dialog without update to the list screen
          onChanged && onChanged();
          setViewBill(false);
        }}
      >
        <BillInfo
          onClose={(e) => {
            //  TODO: handle API call
            console.log(e);
            // close dialog and update to the list screen
            onChanged && onChanged(true);
            setViewBill(false);
          }}
          billData={billData}
        />
      </Modal>
    </>
  );
};

export default BillViewModalBtn;
