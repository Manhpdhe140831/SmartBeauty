export interface ScheduleModel {
  id: number,
  bed_name: string,
  schedule: [
    {
      booking: string,
      sale_name: string,
      technical_name: string,
      customer_name: string,
      customer_phone: string,
      services: string,
      status: ScheduleStatus,
      note: string,
    }
  ]
}

export enum ScheduleStatus {
  Cancel,
  OnGoing,
  IsWorking,
  Finish
}
