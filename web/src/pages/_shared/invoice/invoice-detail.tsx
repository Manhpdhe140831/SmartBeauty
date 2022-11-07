import { Button, Divider, Text, ThemeIcon } from "@mantine/core";
import { IconArrowLeft, IconFileInvoice } from "@tabler/icons";
import DatabaseSearchSelect from "../../../components/database-search.select";
import {
  AutoItemGenericType,
  rawToAutoItem,
  toStringType,
} from "../../../utilities/fn.helper";
import { stateInputProps } from "../../../utilities/mantine.helper";
import { USER_ROLE } from "../../../const/user-role.const";
import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import mockCustomer from "../../../mock/customer";
import { CustomerModel } from "../../../model/customer.model";
import { AutoCompleteItemProp } from "../../../components/auto-complete-item";
import mockBill from "../../../mock/bill";
import { useCustomerDetailQuery, useStaffDetailQuery } from "../../../query/model-detail";
import CustomerInformationBlock from "./_partial/detail/customer-information";
import { StaffModel } from "../../../model/staff.model";
import StaffInformation from "./_partial/detail/staff-information";

type InvoiceDetailProps = {
  role?: USER_ROLE;
  id: number;
  onInfoChanged?: (mutateData: unknown) => void;
  onBackBtnClicked?: () => void;
};

const InvoiceDetail: FC<InvoiceDetailProps> = ({
  id,
  onInfoChanged,
  onBackBtnClicked,
}) => {
  const { data, isLoading } = useQuery(["invoice-detail", id], async () => {
    const mockInvoice = await mockBill();
    return mockInvoice.find((s) => s.id === id);
  });

  const { data: customerDetail } = useCustomerDetailQuery(data?.customer);

  const { data: staffDetail } = useStaffDetailQuery(data?.staff);

  const parserFn = <T extends CustomerModel | StaffModel>(customer: T) =>
    ({
      id: customer.id,
      name: customer.name,
      description: customer.phone,
    } as AutoItemGenericType<T>);

  async function findCustomerByName(name: string) {
    const mc = await mockCustomer();
    return mc
      .filter((c) => c.name.toLowerCase().includes(name.toLowerCase()))
      .map(
        (r) => rawToAutoItem(r, parserFn) as AutoCompleteItemProp<CustomerModel>
      );
  }

  return (
    <div className={"flex h-full flex-col bg-gray-100 p-4"}>
      <div className="flex items-center space-x-4">
        <Button leftIcon={<IconArrowLeft />} onClick={onBackBtnClicked}>
          Back
        </Button>
        <h1 className={"flex flex-1 items-center space-x-4"}>
          <span>Invoice Details</span>
          <Text className={"inline select-none"} color={"dimmed"}>
            #{data?.id ?? "-"}
          </Text>
        </h1>
      </div>

      <Divider my={16} />

      <div className="flex items-start space-x-4">
        <div className="flex-1 rounded bg-white p-4 shadow">
          {/*  Customer section   */}
          <div className="flex items-start space-x-4">
            <ThemeIcon radius={"xl"} size={"xl"}>
              <IconFileInvoice />
            </ThemeIcon>

            <div className="flex flex-col">
              {!isLoading && (
                <DatabaseSearchSelect
                  value={toStringType(data?.customer)}
                  displayValue={
                    customerDetail
                      ? {
                          ...rawToAutoItem(customerDetail, parserFn),
                          disabled: true,
                        }
                      : null
                  }
                  onSearching={findCustomerByName}
                  onSelected={(id) => console.log(id)}
                  {...stateInputProps("Customer", true, {
                    required: true,
                  })}
                />
              )}

              <Divider my={8} />

              <CustomerInformationBlock data={customerDetail} />
            </div>
          </div>
        </div>

        <div className="flex w-80 flex-col">
          <StaffInformation data={staffDetail} />
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetail;
