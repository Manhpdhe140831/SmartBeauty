import {Button, Divider, Group, Input, Select, Stepper, Textarea,} from "@mantine/core";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {USER_ROLE} from "../../../const/user-role.const";
import {DatePicker} from "@mantine/dates";
import {useAuthUser} from "../../../store/auth-user.state";
import DatabaseSearchSelect from "../../../components/database-search.select";
import {AutoCompleteItemProp} from "../../../components/auto-complete-item";
import {CustomerModel} from "../../../model/customer.model";
import {ScheduleSchema} from "../../../validation/schedule-model.schema";
import {Controller, useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {UserModel} from "../../../model/user.model";
import {SlotAvailModel, SlotModal} from "../../../model/slot.model";
import {getBedAndStaff, getServicesAndCourse} from "../../../services/schedule.service";
import {ServiceModel} from "../../../model/service.model";
import {formatDate} from "../../../utilities/time.helper";

type searchFn<dataType extends object> = (
    key: string
) => Promise<AutoCompleteItemProp<dataType>[]>;

type BookingSchedule = {
    searchCustomer: searchFn<CustomerModel>,
    slotList: SlotModal[] | [],
    customerList: UserModel[],
}

const BookingSchedule = ({searchCustomer, slotList, customerList}: BookingSchedule) => {
    const userRole = useAuthUser((s) => s.user?.role);

    // State
    const [active, setActive] = useState(0);
    const [saveBtn, showSave] = useState(false);

    const [selectedCustomer, setSelectedCustomer] = useState<UserModel | null>(null);
    const [selectedService, setSelectedService] = useState<ServiceModel | null>(null);
    const [serviceList, setServiceList] = useState<any>([]);
    const [slotAvail, setSlotAvail] = useState<SlotAvailModel>({
        beds: [],
        users: []
    });


    // Function
    const {
        control,
        register,
        handleSubmit,
        reset,
        watch,
        getValues,
        resetField,
        formState: {errors, isValid, isDirty, dirtyFields},
    } = useForm<z.infer<typeof ScheduleSchema>>({
        resolver: zodResolver(ScheduleSchema),
        mode: "onBlur",
        criteriaMode: "all",
        defaultValues: {
            date: new Date()
        },
    });

    const stepByStep = (step: number) => {
        switch (step) {
            case 0:
                setSelectedCustomer(null);
                setSelectedService(null);

                resetField("date")
                resetField("slotId")
                resetField("bedId")
                resetField("techStaffId")

                break;
            case 1:
                resetField("slotId")
                resetField("bedId")
                resetField("techStaffId")

                // call API lấy thông tin customer

                // Todo: Gán customer vào biến customerData
                // setSelectedCustomer(customerInfo);

                showSave(false);
                break;
            case 2:
                // Todo: Call API with datePicked
                break;
            case 3:
                // Todo: call API lấy thông tin service

                // Todo: Gán service vào biến serviceData
                // setSelectedService(serviceInfo);

                showSave(true);
        }

        // set button show/hide
        setActive(step);
        if (step === 3) {
            showSave(true);
        } else {
            showSave(false);
        }
    };

    const router = useRouter();

    useEffect(() => {
        if (router.query.scheduleId) {
            // query data with dataId

            // set data
            // setSelectedCustomer({
            //     customer_name: "Tôn Ngộ Không",
            //     gender: "Nam",
            //     age: "1000",
            //     address: "369 Hoa Quả sơn",
            //     phone_number: "0987654321",
            // });
            // setService({
            //     service_code: "LT-062022",
            //     service_name: "Liệu trình trị mụn",
            //     date_count: "5/10",
            //     buy_day: "06/10/2022",
            //     expired: "06/08/2023",
            // });

            setActive(3);
        } else {
            if (userRole !== USER_ROLE.sale_staff) {
                void router.push("/");
            }
        }
    }, [router, router.query.scheduleId, userRole]);

    const searchService = async (keyword = '') => {
        if (selectedCustomer) {
            const serviceList = await getServicesAndCourse(selectedCustomer.id, keyword)
            const servicesCustomArr: any = []

            Object.keys(serviceList).forEach(key => {
                if (serviceList[key]) {
                    servicesCustomArr.concat(serviceList[key].map((s: ServiceModel) => {
                        return {
                            value: s.id.toString(),
                            label: s.name,
                            group: key
                        }
                    }))
                }
            })

            setServiceList(servicesCustomArr)
        }
    }

    const slotInfo = slotList.find((s) => s.id === getValues().slotId)

    const searchBedAvail = async () => {
        const slotAvailable = await getBedAndStaff(getValues().date.toISOString(), getValues().slotId)
        setSlotAvail(slotAvailable)
    }

    return (
        <div className={"h-max w-full p-12"}>
            <form
                onReset={() => console.log("reset")}
                onSubmit={() => console.log("create")}
                className="flex w-full">
                <div className={"flex w-full flex-col gap-4"}>
                    <Stepper active={active} onStepClick={setActive} breakpoint="sm">
                        <Stepper.Step
                            label="Tìm kiếm khách hàng"
                            description="Tìm kiếm theo tên"
                            allowStepSelect={false}>
                            <div className={"flex w-full flex-col gap-4"}>
                                <div className={"flex flex-row items-center gap-3"}>
                                    <span className={"min-w-48"}>Tìm kiếm khách hàng</span>
                                    <Controller
                                        render={({field: ControlledField}) =>
                                            <DatabaseSearchSelect
                                                className={"w-full"}
                                                value={null}
                                                displayValue={null}
                                                onSearching={searchCustomer}
                                                onSelected={(_id) => {
                                                    const id = _id ? Number(_id) : null;
                                                    ControlledField.onChange(id);

                                                    // Gán customer selected to state
                                                    const user = customerList.find(user => user.id === Number(_id))
                                                    if (user) {
                                                        setSelectedCustomer(user);
                                                    }
                                                }}
                                            />
                                        }
                                        control={control}
                                        name={"customerId"}
                                    />
                                </div>

                                <div className={"flex flex-row items-center gap-3"}>
                                    <span className={"min-w-48"}>Dịch vụ</span>
                                    <Controller
                                        render={({field}) => (
                                            <Select className={"w-full"}
                                                    placeholder="Liệu trình/ Dịch vụ"
                                                    searchable
                                                    nothingFound="Trống"
                                                    data={serviceList}
                                                    onSearchChange={(s) => {
                                                        void searchService(s)
                                                    }}
                                                    onChange={(e) => {
                                                        console.log(e);
                                                        field.onChange(e);
                                                        field.onBlur();
                                                    }}
                                                    onBlur={field.onBlur}
                                                    disabled={!selectedCustomer}>
                                            </Select>
                                        )}
                                        name={"services"}
                                        control={control}
                                    />
                                </div>
                            </div>
                            <Group className={"mt-4"} position={"center"}>
                                <Button type={"button"} onClick={() => stepByStep(1)}>Xác nhận khách hàng</Button>
                            </Group>
                        </Stepper.Step>
                        <Stepper.Step
                            label="Chọn ngày"
                            description="Chọn ngày khách đến"
                            allowStepSelect={false}>
                            <div className={"flex flex-row gap-3"}>
                                <span className={"min-w-48"}>Chọn ngày</span>
                                <div className={"flex w-full flex-col gap-4"}>
                                    <Controller
                                        render={({field}) => (
                                            <DatePicker placeholder="Chọn ngày"
                                                        value={field.value}
                                                        withAsterisk
                                                        onChange={(e) => {
                                                            field.onChange(e);
                                                            field.onBlur();
                                                        }}
                                                        onBlur={field.onBlur}
                                                        defaultValue={field.value}
                                                        disabled={userRole !== USER_ROLE.sale_staff}
                                            />
                                        )}
                                        name={"date"}
                                        control={control}
                                    />
                                </div>
                            </div>
                            <Group className={"mt-4"} position={"center"}>
                                <Button type={"button"} onClick={() => stepByStep(0)} color={"gray"}>
                                    Trở lại
                                </Button>
                                <Button type={"button"} onClick={() => stepByStep(2)}>Xác nhận ngày</Button>
                            </Group>
                        </Stepper.Step>
                        <Stepper.Step
                            label="Booking"
                            description="Đặt giường và thời gian"
                            allowStepSelect={false}
                        >
                            <div className={"flex flex-row gap-3"}>
                                <span className={"min-w-48"}>Booking</span>
                                <div className={"flex w-full flex-col gap-4"}>
                                    <div className={"flex justify-between gap-4"}>
                                        <Controller
                                            render={({field}) => (
                                                <Select className={"w-full"}
                                                        placeholder="Slot"
                                                        searchable
                                                        nothingFound="Trống"
                                                        data={slotList.map((slot) => {
                                                            return {
                                                                value: slot.id.toString(),
                                                                label: slot.name,
                                                            };
                                                        })}
                                                        onChange={(e) => {
                                                            field.onChange(e);
                                                            field.onBlur();
                                                            void searchBedAvail()
                                                        }}
                                                        onBlur={field.onBlur}
                                                        disabled={userRole !== USER_ROLE.sale_staff}>
                                                </Select>
                                            )}
                                            name={"slotId"}
                                            control={control}
                                        />
                                        <Controller
                                            render={({field}) => (
                                                <Select className={"w-full"}
                                                        placeholder="Giường"
                                                        searchable
                                                        nothingFound="Trống"
                                                        data={slotAvail.beds.map((bed) => bed.name)}
                                                        onChange={(e) => {
                                                            field.onChange(e);
                                                            field.onBlur();
                                                        }}
                                                        onBlur={field.onBlur}
                                                        disabled={userRole !== USER_ROLE.sale_staff || !watch("slotId")}>
                                                </Select>
                                            )}
                                            name={"bedId"}
                                            control={control}
                                        />
                                        <Controller
                                            render={({field}) => (
                                                <Select className={"w-full"}
                                                        placeholder="NV kỹ thuật"
                                                        searchable
                                                        nothingFound="Trống"
                                                        data={slotAvail.users.map((bed) => bed.name)}
                                                        onChange={(e) => {
                                                            field.onChange(e);
                                                            field.onBlur();
                                                        }}
                                                        onBlur={field.onBlur}
                                                        disabled={userRole !== USER_ROLE.sale_staff || !watch("slotId")}>
                                                </Select>
                                            )}
                                            name={"techStaffId"}
                                            control={control}
                                        />
                                    </div>
                                </div>
                            </div>
                            <Group className={"mt-4"} position={"center"}>
                                <Button type={"button"}
                                        onClick={() => stepByStep(1)}
                                        color={"gray"}>
                                    Trở lại
                                </Button>
                                <Button type={"button"}
                                        onClick={() => stepByStep(3)}
                                        disabled={!watch("bedId") && !watch("techStaffId")}>
                                    Xác nhận lịch
                                </Button>
                            </Group>
                        </Stepper.Step>
                        <Stepper.Completed>
                            <div className={"flex flex-row gap-3"}>
                                <span className={"min-w-48"}>Thông tin khách hàng</span>
                                <div className={"flex w-full justify-between gap-4"}>
                                    {selectedCustomer && (
                                        <div
                                            className={
                                                "w-full rounded-xl border p-4 text-sm shadow-md"
                                            }
                                        >
                                            <div className={"flex justify-between gap-2"}>
                                                <span className={"font-bold"}>Tên khách hàng</span>
                                                <span>{selectedCustomer.name}</span>
                                            </div>
                                            <div className={"flex justify-between gap-2"}>
                                                <span className={"font-bold"}>Giới tính</span>
                                                <span>{selectedCustomer.gender}</span>
                                            </div>
                                            <div className={"flex justify-between gap-2"}>
                                                <span className={"font-bold"}>Ngày sinh</span>
                                                <span>{selectedCustomer.dateOfBirth}</span>
                                            </div>
                                            <div className={"flex justify-between gap-2"}>
                                                <span className={"font-bold"}>Địa chỉ</span>
                                                <span>{selectedCustomer.address}</span>
                                            </div>
                                            <div className={"flex justify-between gap-2"}>
                                                <span className={"font-bold"}>SĐT</span>
                                                <span>{selectedCustomer.phone}</span>
                                            </div>
                                            <div className={"flex justify-between gap-2"}>
                                                <span className={"font-bold"}>Email</span>
                                                <span>{selectedCustomer.email}</span>
                                            </div>
                                        </div>
                                    )}
                                    {selectedService && (
                                        <div
                                            className={
                                                "w-full rounded-xl border p-4 text-sm shadow-md"
                                            }
                                        >
                                            <div className={"flex justify-between gap-2"}>
                                                <span className={"font-bold"}>Dịch vụ</span>
                                                <span>{selectedService.name}</span>
                                            </div>
                                            <div className={"flex justify-between gap-2"}>
                                                <span className={"font-bold"}>Liệu trình</span>
                                                <span>{selectedService.duration}</span>
                                            </div>
                                            {
                                                slotInfo && <div className={"flex justify-between gap-2"}>
                                                    <span className={"font-bold"}>Slot</span>
                                                    <span>{slotInfo.name}</span>
                                                </div>
                                            }
                                            <div className={"flex justify-between gap-2"}>
                                                <span className={"font-bold"}>Giường</span>
                                                <span>{getValues().bedId}</span>
                                            </div>
                                            <div className={"flex justify-between gap-2"}>
                                                <span className={"font-bold"}>Thời gian</span>
                                                <span>{formatDate(getValues().date.toDateString())}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {userRole === USER_ROLE.sale_staff && (
                                <Group className={"mt-4"} position={"center"}>
                                    <Button type={"button"} onClick={() => stepByStep(0)} color={"gray"}>
                                        Return
                                    </Button>
                                </Group>
                            )}
                        </Stepper.Completed>
                    </Stepper>
                    <Divider my="xs" variant="dashed"/>
                    <div className={"flex flex-row items-center gap-3"}>
                        <span className={"min-w-48"}>NV kinh doanh</span>
                        <Input
                            className={"w-full"}
                            disabled
                            value={useAuthUser((s) => s.user?.name)}
                            {...register("saleStaffId")}
                        />
                    </div>
                    <div className={"flex flex-row gap-3"}>
                        <span className={"min-w-48"}>Ghi chú</span>
                        <Textarea
                            className={"w-full"}
                            autosize={false}
                            rows={4}
                            placeholder={"Full address"}
                            disabled={userRole !== USER_ROLE.sale_staff}
                            {...register("note")}
                        ></Textarea>
                    </div>
                </div>
            </form>
            {userRole === USER_ROLE.sale_staff && saveBtn && (
                <Group className={"mt-4"} position={"center"}>
                    <Button type={"button"} color={"gray"}>Cancel</Button>
                    <Button type={"button"}>Save</Button>
                </Group>
            )}
            {/*</>}*/}
        </div>
    );
};

export default BookingSchedule;
