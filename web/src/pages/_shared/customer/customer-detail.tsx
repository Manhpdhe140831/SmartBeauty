import { Button } from "@mantine/core";
import InformationForm from "./_partial/detail/information.form";
import { IconArrowLeft, IconTrash } from "@tabler/icons";
import { PropsWithChildren } from "react";
import { CustomerModel } from "../../../model/customer.model";

type CustomerDetailProps = {
  onInfoChanged?: (mutateData: unknown) => void;
  onBackBtnClicked?: () => void;
  onDelete?: (id: number) => void;
} & (
  | {
      mode: "view";
      data: CustomerModel;
    }
  | {
      mode: "create";
      data?: CustomerModel;
    }
);

const CustomerDetail = ({
  mode,
  data,
  onInfoChanged,
  onBackBtnClicked,
  children,
  onDelete,
}: PropsWithChildren<CustomerDetailProps>) => {
  if (!data && mode === "view") {
    return <>loading...</>;
  }

  return (
    <div className={"flex flex-col p-8"}>
      <div className="flex-start mb-8 flex w-full justify-between">
        <Button leftIcon={<IconArrowLeft />} onClick={onBackBtnClicked}>
          Trở về danh sách
        </Button>

        {data && (
          <Button
            leftIcon={<IconTrash />}
            onClick={() => onDelete && onDelete(data.id)}
            variant={"subtle"}
            color={"red"}
            type={"button"}
          >
            Xoá
          </Button>
        )}
      </div>

      <InformationForm
        mode={mode}
        readonly={!onInfoChanged}
        data={data}
        onChanged={onInfoChanged}
      />

      {children}
    </div>
  );
};

export default CustomerDetail;
