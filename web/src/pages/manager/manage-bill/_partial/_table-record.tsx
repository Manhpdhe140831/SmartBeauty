import { Tooltip } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { BillModel } from "../../../../model/bill.model";
import { BranchModel } from "../../../../model/branch.model";
import { ManagerModel } from "../../../../model/manager.model";
import { StaffModel } from "../../../../model/staff.model";

type RecordProps = {
  no?: number;
  data: BillModel;
  action: JSX.Element;
};

export default function TableRecord(props: RecordProps) {
  const clipboard = useClipboard({ timeout: 500 });

  return (
    <tr>
      <td className="text-center">{props.no}</td>
      <td
        className="overflow-hidden text-ellipsis"
        onClick={() => clipboard.copy(props.data.code_bill)}
      >
        <Tooltip label={props.data.code_bill}>
          <span>{props.data.code_bill}</span>
        </Tooltip>
      </td>

      <td
        className="overflow-hidden text-ellipsis"
        onClick={() => clipboard.copy(props.data.date_bill)}
      >
        <Tooltip label={props.data.date_bill}>
          <span>{props.data.date_bill}</span>
        </Tooltip>
      </td>

      <td
        className="overflow-hidden text-ellipsis"
        onClick={() => clipboard.copy(props.data.provider)}
      >
        <Tooltip label={props.data.provider}>
          <span>{props.data.provider}</span>
        </Tooltip>
      </td>

      <td
        className="overflow-hidden text-ellipsis"
        onClick={() => clipboard.copy(props.data.cost)}
      >
        <Tooltip label={props.data.cost}>
          <span>{props.data.code_bill}</span>
        </Tooltip>
      </td>
      
      <td className="text-center">{props.action}</td>
    </tr>
  );
}