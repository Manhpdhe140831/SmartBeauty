import InformationBlock from "./_information-block";
import { CustomerModel } from "../../../../../model/customer.model";
import { FC } from "react";
import { formatDate } from "../../../../../utilities/fn.helper";

type InformationProps = {
  data?: CustomerModel | null;
};

const CustomerInformationBlock: FC<InformationProps> = ({ data }) => {
  return (
    <div className="flex flex-wrap gap-x-6 gap-y-4 overflow-hidden w-full">
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
  );
};

export default CustomerInformationBlock;
