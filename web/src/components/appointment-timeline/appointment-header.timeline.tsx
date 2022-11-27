import AppointmentSlot from "./appointment-slot";
import {FC} from "react";
import {Text} from "@mantine/core";
import {BookingModel} from "../../model/schedule.model";
import {mapStatusHelper} from "../../utilities/map-status.helper";
import {useRouter} from "next/router";
import {USER_ROLE} from "../../const/user-role.const";
import {SpaBedModel} from "../../model/spa-bed.model";

type SlotProps = {
    title: string;
    timeFrame: string;
    bedSchedule?: BookingModel;
    userRole: string;
    bedList: SpaBedModel[];
};

const AppointmentHeaderTimeline: FC<SlotProps> = ({title, timeFrame, bedSchedule, userRole, bedList}) => {
    const router = useRouter();
    const moreInfo = (data: BookingModel) => {
        void router.push({
            pathname: `/${userRole}/manage-schedule/work-appointment/manage-booking`,
            query: {
                scheduleId: data.id,
            },
        });
    };

    return (
        <div className={"flex h-max"}>
            <AppointmentSlot
                className={"flex min-w-32 select-none flex-col justify-center"}
            >
                <Text className={"font-semibold"}>{title}</Text>
                <Text size={"sm"} color={"dimmed"}>
                    {timeFrame}
                </Text>
            </AppointmentSlot>

            {bedList.map((bed, i) => {
                if (bedSchedule && bedSchedule.bed && bedSchedule.bed.id === bed.id) {
                    return (
                        <AppointmentSlot key={i} className={"min-w-64"}>
                            <div
                                className={
                                    "h-max w-full cursor-pointer rounded-lg bg-yellow-300 p-2 text-sm shadow transition hover:shadow-xl"
                                }
                                onClick={() => moreInfo(bedSchedule)}
                            >
                                <div className={"flex justify-between pb-1"}>
                                    <span>Tên khách hàng</span>
                                    <span>{bedSchedule.customer?.name}</span>
                                </div>
                                <div className={"flex justify-between pb-1"}>
                                    <span>NV kỹ thuật</span>
                                    <span>{bedSchedule.tech_staff?.name}</span>
                                </div>
                                {userRole === USER_ROLE.manager && (
                                    <div className={"flex justify-between pb-1"}>
                                        <span>NV bán hàng</span>
                                        <span>{bedSchedule.sale_staff?.name}</span>
                                    </div>
                                )}
                                <div className={"flex justify-between pb-1"}>
                                    <span>Dịch vụ</span>
                                    <span>{bedSchedule.service ? bedSchedule.service.name : bedSchedule.course!.name}</span>
                                </div>
                                <div className={"flex justify-between"}>
                                    <span>Tình trạng</span>
                                    <span className={mapStatusHelper(bedSchedule.status).color}>
                    {mapStatusHelper(bedSchedule.status).status}
                  </span>
                                </div>
                            </div>
                        </AppointmentSlot>
                    );
                }
                return (
                    <AppointmentSlot key={i} className={"min-w-64"}></AppointmentSlot>
                );
            })}
        </div>
    );
};

export default AppointmentHeaderTimeline;
