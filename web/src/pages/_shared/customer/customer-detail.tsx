import { USER_ROLE } from "../../../const/user-role.const";
import { useQuery } from "@tanstack/react-query";
import mockCustomer from "../../../mock/customer";
import { Avatar, Button } from "@mantine/core";
import InformationForm from "./_partial/detail/information.form";
import { IconArrowLeft } from "@tabler/icons";
import { FC } from "react";

type CustomerDetailProps = {
  role: USER_ROLE;
  id: number;
  onInfoChanged?: (mutateData: unknown) => void;
  onBackBtnClicked?: () => void;
};

const CustomerDetail: FC<CustomerDetailProps> = ({
  role,
  id,
  onInfoChanged,
  onBackBtnClicked,
}) => {
  // TODO integrate API get user by id
  const { data, isLoading } = useQuery(["customer-detail", id], async () => {
    const l = await mockCustomer();
    return l.find((c) => c.id === id);
  });

  if (isLoading || !data) {
    return <>loading...</>;
  }

  return (
    <div className={"flex flex-col"}>
      <div className="flex flex-wrap justify-center space-x-8 p-4">
        <div className="flex-start mb-8 flex w-full">
          <Button leftIcon={<IconArrowLeft />} onClick={onBackBtnClicked}>
            Back to List
          </Button>
        </div>

        <Avatar
          size="xl"
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
        />

        <InformationForm
          mode={role === USER_ROLE.manager ? "view" : "create"}
          readonly={role === USER_ROLE.manager}
          data={data}
          onChanged={onInfoChanged}
        />
      </div>
    </div>
  );
};

export default CustomerDetail;
