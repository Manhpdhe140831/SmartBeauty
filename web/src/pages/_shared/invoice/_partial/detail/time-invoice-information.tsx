import { Divider, Text, Tooltip } from "@mantine/core";
import { timeToDate, timeToHours } from "../../../../../utilities/time.helper";
import { useClipboard } from "@mantine/hooks";
import dayjs from "dayjs";

type TimeInvoiceProps = {
  createdDate?: string;
  approvedDate?: string;
};

const TimeInvoiceInformation = (data?: TimeInvoiceProps) => {
  const copyHook = useClipboard({ timeout: 500 });

  function copyFormat(dateRaw?: string) {
    if (!dateRaw) return "Không có sẵn";
    return dayjs(dateRaw).format("DD/MM/YYYY - HH:mm:ss");
  }

  return (
    <Tooltip label={data?.createdDate ? "Click để copy" : undefined}>
      <div className="flex select-none space-x-4 rounded-lg bg-pink-500 p-4">
        <div
          onClick={() => copyHook.copy(copyFormat(data?.createdDate))}
          className="flex flex-1 cursor-pointer flex-col"
        >
          <h4 className={"text-md font-thin text-white"}>Được xuất đơn lúc</h4>
          <Text color={"white"} size={"lg"} weight={"bolder"}>
            {data?.createdDate && timeToDate(data?.createdDate)}
          </Text>
          <Text color={"white"}>
            {data?.createdDate && timeToHours(data?.createdDate)}
          </Text>
        </div>

        <Divider orientation={"vertical"} color={"white"} />

        <div
          onClick={() => copyHook.copy(copyFormat(data?.approvedDate))}
          className="flex flex-1 cursor-pointer flex-col items-end"
        >
          <h4 className={"text-md font-thin text-white"}>
            Được hoàn thành lúc
          </h4>
          <Text color={"white"} size={"lg"} weight={"bolder"}>
            {data?.approvedDate && timeToDate(data?.approvedDate)}
          </Text>
          <Text color={"white"}>
            {data?.approvedDate && timeToHours(data?.approvedDate)}
          </Text>
        </div>
      </div>
    </Tooltip>
  );
};

export default TimeInvoiceInformation;
