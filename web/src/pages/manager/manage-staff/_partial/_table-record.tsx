import { Tooltip } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { BranchModel } from "../../../../model/branch.model";
import { ManagerModel } from "../../../../model/manager.model";
import { StaffModel } from "../../../../model/staff.model";

type RecordProps = {
  no?: number;
  data: StaffModel<ManagerModel>;
  action: JSX.Element;
};

export default function TableRecord(props: RecordProps) {
  const clipboard = useClipboard({ timeout: 500 });

  return (
    <tr>
      <td className="text-center">{props.no}</td>
      <td
        className="overflow-hidden text-ellipsis"
        onClick={() => clipboard.copy(props.data.name)}
      >
        <Tooltip label={props.data.name}>
          <span>{props.data.name}</span>
        </Tooltip>
      </td>

      <td
        className="overflow-hidden text-ellipsis"
        onClick={() => clipboard.copy(props.data.Role)}
      >
        <Tooltip label={props.data.Role}>
          <span>{props.data.Role}</span>
        </Tooltip>
      </td>
      
      <td onClick={() => clipboard.copy(props.data.PhoneNumber)}>
        {props.data.PhoneNumber}
      </td>
      
      <td className="text-center">{props.action}</td>
    </tr>
  );
}
