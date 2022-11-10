import InformationBlock from "./_information-block";
import { CustomerModel } from "../../../../../model/customer.model";
import { FC } from "react";
import { formatDate } from "../../../../../utilities/time.helper";
import DatabaseSearchSelect from "../../../../../components/database-search.select";
import {
  AutoItemGenericType,
  rawToAutoItem,
  toStringType,
} from "../../../../../utilities/fn.helper";
import { stateInputProps } from "../../../../../utilities/mantine.helper";
import { Divider, ThemeIcon } from "@mantine/core";
import mockCustomer from "../../../../../mock/customer";
import { AutoCompleteItemProp } from "../../../../../components/auto-complete-item";
import { StaffModel } from "../../../../../model/staff.model";
import { useCustomerDetailQuery } from "../../../../../query/model-detail";
import { IconFileInvoice } from "@tabler/icons";

type InformationProps = {
  customerId?: number;
};

const CustomerInformationBlock: FC<InformationProps> = ({ customerId }) => {
  const { data, isLoading } = useCustomerDetailQuery(customerId);

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
    <div className="flex items-start space-x-4">
      <ThemeIcon radius={"xl"} size={"xl"}>
        <IconFileInvoice />
      </ThemeIcon>

      <div className="flex flex-col">
        {!isLoading && data && (
          <DatabaseSearchSelect
            value={toStringType(data?.id)}
            displayValue={
              data
                ? {
                    ...rawToAutoItem(data, parserFn),
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

        <div className="flex w-full flex-wrap gap-x-6 gap-y-4 overflow-hidden text-[14px]">
          <InformationBlock
            data={{
              from: data,
              key: "phone",
              title: "Phone",
            }}
          />

          <InformationBlock
            data={{
              from: data,
              key: "gender",
              title: "Gender",
              allowCopy: false,
            }}
          />

          <InformationBlock
            data={{
              from: data,
              key: "dateOfBirth",
              title: "Date of Birth",
              parser: (d) => {
                if (!d) {
                  return "-";
                }

                return formatDate(d);
              },
            }}
          />

          <InformationBlock
            data={{
              from: data,
              key: "email",
              title: "Email",
            }}
            className={"w-full"}
          />

          <InformationBlock
            className={"max-w-[500px]"}
            data={{
              from: data,
              key: "address",
              title: "Address",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerInformationBlock;
