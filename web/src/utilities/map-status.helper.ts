import { ScheduleStatus } from "../model/schedule.model";

export function mapStatusHelper(status: number) {
  const statusInfo = {
    status: "",
    color: ""
  }
  switch (status) {
    case ScheduleStatus.Cancel:
      statusInfo.status = "Cancel"
      statusInfo.color = "text-red-700 font-bold"
      break
    case ScheduleStatus.Waiting:
      statusInfo.status = "Waiting"
      statusInfo.color = "text-yellow-300 font-bold"
      break
    case ScheduleStatus.OnGoing:
      statusInfo.status = "On going"
      statusInfo.color = "text-stone-600 font-bold"
      break
    case ScheduleStatus.Finish:
      statusInfo.status = "Finish"
      statusInfo.color = "text-green-700 font-bold"
  }

  return statusInfo
}
