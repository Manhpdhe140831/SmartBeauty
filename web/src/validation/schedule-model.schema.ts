import {z} from "zod";
import {ScheduleStatus} from "../model/schedule.model";

export const ScheduleSchema = z.object({
    date: z.date(),
    bedId: z.number(),
    slotId: z.number(),
    saleStaffId: z.number(),
    techStaffId: z.number(),
    customerId: z.number(),
    courseId: z.number(),
    services: z.string(),
    status: z.nativeEnum(ScheduleStatus),
    note: z.string(),
})
