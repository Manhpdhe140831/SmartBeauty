import { useState } from "react";
import { IconTrash } from "@tabler/icons";
import { ActionIcon, Button, Modal, Tooltip } from "@mantine/core";
import { StaffModel } from "../../../../model/staff.model";

type ModalProps = {
  onChanged?: (updated?: boolean) => void;
  staffData: StaffModel;
};

const StaffViewModalBtn = ({ onChanged, staffData }: ModalProps) => {
  const [viewBranch, setViewBranch] = useState<boolean>(false);

  const onClose = () => {
    onChanged && onChanged();
    setViewBranch(false);
  };

  const onSubmit = () => {
    // Xác nhận xóa Staff
    onChanged && onChanged(true);
    setViewBranch(false);
  };

  return (
    <>
      {/* Button view branch -> trigger modal*/}
      <Tooltip onClick={() => setViewBranch(true)} label={"Delete"}>
        <ActionIcon className="!inline-flex" color="red" variant="filled">
          <IconTrash size={12} />
        </ActionIcon>
      </Tooltip>
      <Modal
        title={
          <h1 className="text-center font-thin capitalize">Xóa Nhân Viên</h1>
        }
        opened={viewBranch}
        size={"auto"}
        onClose={() => onClose()}
      >
        Bạn có chắc chắn muốn xóa nhân viên{" "}
        <span className={"font-bold"}>{staffData.name}</span> khỏi hệ thống ?
        <div className={"mt-3 flex space-x-2"}>
          <Button variant={"outline"} color={"red"} onClick={() => onSubmit()}>
            Xác nhận xóa
          </Button>

          <Button className={"flex-1"} onClick={() => onClose()}>
            Hủy
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default StaffViewModalBtn;
