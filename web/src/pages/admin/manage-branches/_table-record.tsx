import { ActionIcon, Tooltip } from "@mantine/core";
import { IconSettings } from "@tabler/icons";
import { useClipboard } from "@mantine/hooks";

export type RecordData = {
  id: string;
  no?: number;
  branchName: string;
  branchManager: string;
  mobile: string;
  email?: string;
  address: string;
};

export default function TableRecord(props: RecordData) {
  const clipboard = useClipboard({ timeout: 500 });

  return (
    <tr>
      <td className="text-center">{props.no}</td>
      <td onClick={() => clipboard.copy(props.branchName)}>
        {props.branchName}
      </td>
      <td onClick={() => clipboard.copy(props.branchManager)}>
        {props.branchManager}
      </td>
      <td onClick={() => clipboard.copy(props.mobile)}>{props.mobile}</td>
      <td onClick={() => clipboard.copy(props.email)}>{props.email}</td>
      <td onClick={() => clipboard.copy(props.address)}>
        <Tooltip
          label={
            <div className="flex flex-col">
              <p className="max-w-40 whitespace-pre-wrap">{props.address}</p>
              <small className="text-gray-400">Nhấn để copy</small>
            </div>
          }
        >
          <p
            className={
              "cursor-copy select-none overflow-hidden text-ellipsis whitespace-nowrap"
            }
          >
            {props.address}
          </p>
        </Tooltip>
      </td>
      <td className="text-center">
        <Tooltip label={"Chỉnh sửa / Xem chi tiết"}>
          <ActionIcon className="!inline-flex" color="orange" variant="filled">
            <IconSettings size={12} />
          </ActionIcon>
        </Tooltip>
      </td>
    </tr>
  );
}
