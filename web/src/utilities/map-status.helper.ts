import { ScheduleStatus } from "../model/schedule.model";

export function mapStatusHelper(status: number) {
  const statusInfo = {
    status: "",
    color: "",
  };
  switch (status) {
    case ScheduleStatus.Cancel:
      statusInfo.status = "Hủy";
      statusInfo.color = "text-red-700 font-bold";
      break;
    // case ScheduleStatus.Waiting:
    //   statusInfo.status = "Chờ"
    //   statusInfo.color = "text-yellow-300 font-bold"
    //   break
    case ScheduleStatus.Waiting:
      statusInfo.status = "Chờ";
      statusInfo.color = "text-stone-600 font-bold";
      break;
    case ScheduleStatus.Finish:
      statusInfo.status = "Đã xử lý";
      statusInfo.color = "text-green-700 font-bold";
  }

  return statusInfo;
}
