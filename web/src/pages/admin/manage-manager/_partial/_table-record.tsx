import { ManagerModel } from "../../../../model/manager.model";
import { useClipboard } from "@mantine/hooks";
import { Tooltip } from "@mantine/core";

type RecordProps = {
  no?: number;
  data: ManagerModel;
  action: JSX.Element;
};

const TableRecord = (props: RecordProps) => {
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
      <td onClick={() => clipboard.copy(props.data.mobile)}>
        {props.data.mobile}
      </td>
      <td
        className="overflow-hidden text-ellipsis"
        onClick={() => clipboard.copy(props.data.email)}
      >
        <Tooltip label={props.data.email}>
          <span>{props.data.email}</span>
        </Tooltip>
      </td>
      <td
        className="overflow-hidden text-ellipsis"
        onClick={() => clipboard.copy(props.data.address)}
      >
        <Tooltip label={props.data.address}>
          <span>{props.data.address}</span>
        </Tooltip>
      </td>
      <td className="text-center">{props.action}</td>
    </tr>
  );
};

export default TableRecord;
