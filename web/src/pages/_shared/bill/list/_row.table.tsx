import { Text, Tooltip } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { BillModel } from "../../../../model/bill.model";
import dayjs from "dayjs";
import { formatPrice } from "../../../../utilities/fn.helper";

type RowProps = {
  no: number;
  data: BillModel;
  onSelect?: (d: BillModel) => void;
};

export default function RowTable(props: RowProps) {
  const clipboard = useClipboard({ timeout: 500 });

  function timeToHours(rawIsoTime: string) {
    return dayjs(rawIsoTime).format("HH:mm:ss");
  }

  function timeToDate(rawIsoTime: string) {
    return dayjs(rawIsoTime).format("DD/MM/YYYY");
  }

  return (
    <tr>
      <td className="text-center">{props.no}</td>
      <td onClick={() => clipboard.copy(props.data.customer.name)}>
        <div className="flex flex-col">
          <div className="overflow-hidden text-ellipsis whitespace-nowrap">
            <Tooltip label={props.data.customer.name}>
              <span>{props.data.customer.name}</span>
            </Tooltip>
          </div>
          <div className="overflow-hidden text-ellipsis whitespace-nowrap">
            <Text size={"sm"} color={"dimmed"}>
              {props.data.customer.phone}
            </Text>
          </div>
        </div>
      </td>

      <td onClick={() => clipboard.copy(props.data.staff.name)}>
        <div className="flex flex-col">
          <div className="overflow-hidden text-ellipsis whitespace-nowrap">
            <Tooltip label={props.data.staff.name}>
              <span>{props.data.staff.name}</span>
            </Tooltip>
          </div>
          <div className="overflow-hidden text-ellipsis whitespace-nowrap">
            <Text size={"sm"} color={"dimmed"}>
              {props.data.staff.phone}
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

      <td className={"text-center"}>{formatPrice(props.data.price)} VND</td>
    </tr>
  );
}
