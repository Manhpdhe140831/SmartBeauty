import React, { FC } from "react";

type RecordSpanType = {
  colSpan?: number;
  rowSpan?: number;
  message: React.ReactNode;
  tdClassName?: string;
  className?: string;
};

const TableRecordHolder: FC<RecordSpanType> = ({
  className,
  tdClassName,
  colSpan,
  rowSpan,
  message,
}) => {
  return (
    <tr className={className}>
      <td className={tdClassName} rowSpan={rowSpan} colSpan={colSpan}>
        {message}
      </td>
    </tr>
  );
};

export default TableRecordHolder;
