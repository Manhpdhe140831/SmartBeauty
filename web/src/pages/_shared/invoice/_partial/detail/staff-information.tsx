import { Button, Image, Table, Text } from "@mantine/core";
import { FC } from "react";
import { useClipboard } from "@mantine/hooks";
import { useStaffDetailQuery } from "../../../../../query/model-detail";

type InformationProps = {
  staffId?: number;
};

const StaffInformation: FC<InformationProps> = ({ staffId }) => {
  const { data } = useStaffDetailQuery(staffId);

  const clipboard = useClipboard({ timeout: 500 });

  return !data ? (
    <Text>Loading...</Text>
  ) : (
    <div className="rounded-lg bg-white p-4 shadow">
      <div className="flex items-center space-x-2">
        <Image
          width={50}
          height={50}
          radius={25}
          src={data.image}
          alt={data.name}
        />
        <div className="flex-1">
          <label className="text-[14px] font-[500] text-[#868e96]">
            Sale Staff <span className="text-red-500">*</span>
          </label>

          <h2 className={"text-[18px] font-semibold leading-[2rem]"}>
            {data.name}
          </h2>
        </div>
      </div>

      <Table
        highlightOnHover
        verticalSpacing={"xs"}
        className={"my-4 table-fixed"}
      >
        <colgroup>
          <col className={"w-28"} />
          <col />
        </colgroup>

        <tbody>
          <tr
            className={"cursor-pointer select-none"}
            onClick={() => clipboard.copy(data.phone)}
          >
            <td className={"font-semibold"}>Phone</td>
            <td className={"overflow-hidden text-ellipsis"}>{data.phone}</td>
          </tr>
          <tr
            className={"cursor-pointer select-none"}
            onClick={() => clipboard.copy(data.email)}
          >
            <td className={"font-semibold"}>Email</td>
            <td className={"overflow-hidden text-ellipsis"}>{data.email}</td>
          </tr>
          <tr>
            <td colSpan={2} className={"!p-0"}>
              <Button variant={"subtle"} fullWidth>
                View Detail
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
      <Text size={"xs"} color={"dimmed"}>
        Click information to copy
      </Text>
    </div>
  );
};

export default StaffInformation;
