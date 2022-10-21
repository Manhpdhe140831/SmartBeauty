import { Tooltip } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";

export type RecordData = {
  id: string;
  branchName: string;
  branchManager: string;
  mobile: string;
  email?: string;
  address: string;
};

type RecordProps = {
  no?: number;
  data: RecordData;
  action: JSX.Element;
};

export default function TableRecord(props: RecordProps) {
  const clipboard = useClipboard({ timeout: 500 });

  return (
    <tr>
      <td className="text-center">{props.no}</td>
      <td onClick={() => clipboard.copy(props.data.branchName)}>
        {props.data.branchName}
      </td>
      <td onClick={() => clipboard.copy(props.data.branchManager)}>
        {props.data.branchManager}
      </td>
      <td onClick={() => clipboard.copy(props.data.mobile)}>
        {props.data.mobile}
      </td>
      <td onClick={() => clipboard.copy(props.data.email)}>
        {props.data.email}
      </td>
      <td onClick={() => clipboard.copy(props.data.address)}>
        <Tooltip
          label={
            <div className="flex flex-col">
              <p className="max-w-40 whitespace-pre-wrap">
                {props.data.address}
              </p>
              <small className="text-gray-400">Nhấn để copy</small>
            </div>
          }
        >
          <p
            className={
              "cursor-copy select-none overflow-hidden text-ellipsis whitespace-nowrap"
            }
          >
            {props.data.address}
          </p>
        </Tooltip>
      </td>
      <td className="text-center">{props.action}</td>
    </tr>
  );
}
