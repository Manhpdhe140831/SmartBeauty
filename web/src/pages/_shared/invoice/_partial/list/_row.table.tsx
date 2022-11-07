import { Text, Tooltip } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { BillModel } from "../../../../../model/bill.model";
import dayjs from "dayjs";
import { formatPrice } from "../../../../../utilities/fn.helper";
import { useCustomerDetailQuery, useStaffDetailQuery } from "../../../../../query/model-detail";

type RowProps = {
  no: number;
  data: BillModel;
  onSelect?: (d: BillModel) => void;
};

export default function RowTable(props: RowProps) {
  const clipboard = useClipboard({ timeout: 500 });

  const { data: customerDetail } = useCustomerDetailQuery(props.data?.customer);

  const { data: staffDetail } = useStaffDetailQuery(props.data?.staff);

  function timeToHours(rawIsoTime: string) {
    return dayjs(rawIsoTime).format("HH:mm:ss");
  }

  function timeToDate(rawIsoTime: string) {
    return dayjs(rawIsoTime).format("DD/MM/YYYY");
  }

  return (
    <tr
      className={"cursor-pointer"}
      onClick={() => props.onSelect && props.onSelect(props.data)}
    >
      <td className="text-center">{props.no}</td>
      <td onClick={() => clipboard.copy(customerDetail?.name)}>
        <div className="flex flex-col">
          <div className="overflow-hidden text-ellipsis whitespace-nowrap">
            <Tooltip label={customerDetail?.name}>
              <span>{customerDetail?.name}</span>
            </Tooltip>
          </div>
          <div className="overflow-hidden text-ellipsis whitespace-nowrap">
            <Text size={"sm"} color={"dimmed"}>
              {customerDetail?.phone}
            </Text>
          </div>
        </div>
      </td>

      <td onClick={() => clipboard.copy(staffDetail?.name)}>
        <div className="flex flex-col">
          <div className="overflow-hidden text-ellipsis whitespace-nowrap">
            <Tooltip label={staffDetail?.name}>
              <span>{staffDetail?.name}</span>
            </Tooltip>
          </div>
          <div className="overflow-hidden text-ellipsis whitespace-nowrap">
            <Text size={"sm"} color={"dimmed"}>
              {staffDetail?.phone}
            </Text>
          </div>
        </div>
      </td>

      <td className={"text-center"}>
        <Text>{props.data.status}</Text>
      </td>

      <td>
        <div className="flex flex-col space-y-1">
          <Text weight={500} size={"md"}>
            {timeToDate(props.data.createdDate)}
          </Text>
          <Text size={"sm"} color={"dimmed"}>
            {timeToHours(props.data.createdDate)}
          </Text>
        </div>
      </td>

      <td className={"text-center"}>
        {formatPrice(props.data.priceBeforeTax)} VND
      </td>
    </tr>
  );
}
