import {Button, Divider, Group, Input, Select, Stepper, Textarea,} from "@mantine/core";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {USER_ROLE} from "../../../const/user-role.const";
import {DatePicker} from "@mantine/dates";
import {useAuthUser} from "../../../store/auth-user.state";
import {Beds} from "../../../mock/bed";
import DatabaseSearchSelect from "../../../components/database-search.select";
import {AutoCompleteItemProp} from "../../../components/auto-complete-item";
import {CustomerModel} from "../../../model/customer.model";
import {ScheduleSchema} from "../../../validation/schedule-model.schema";
import {Controller, useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {UserModel} from "../../../model/user.model";
import {slotModal} from "../../../model/slot.model";
import {RawServices} from "../../../mock/service";

type searchFn<dataType extends object> = (
    key: string
) => Promise<AutoCompleteItemProp<dataType>[]>;

type BookingSchedule = {
    searchCustomer: searchFn<CustomerModel>,
    getSlot: slotModal[]
}

const BookingSchedule = ({searchCustomer, getSlot}: BookingSchedule) => {
    const [active, setActive] = useState(0);
    const [saveBtn, showSave] = useState(false);

    const [loadingStep1, setLoadingStep1] = useState<boolean>(false);
    const [loadingStep2, setLoadingStep2] = useState<boolean>(false);

    const [selectedCustomer, setSelectedCustomer] = useState<UserModel | null>(null);
    const [serviceData, setService] = useState<any>(null);

    const {
        control,
        register,
        handleSubmit,
        reset,
        watch,
        getValues,
        formState: {errors, isValid, isDirty, dirtyFields},
    } = useForm<z.infer<typeof ScheduleSchema>>({
        resolver: zodResolver(ScheduleSchema),
        mode: "onBlur",
        criteriaMode: "all",
        defaultValues: {
            date: new Date()
        },
    });

    // const userRole = useAuthUser((s) => s.user?.role);
    const userRole = USER_ROLE.sale_staff;

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

    const stepByStep = (step: number) => {
        console.log(step);
        switch (step) {
            case 0:
                setSelectedCustomer(null);
                setService(null);
                setLoadingStep1(false);
                setLoadingStep2(false);
                showSave(false);
                break;
            case 1:
                //set loading
                setLoadingStep1(true);

                // call API lấy thông tin customer
                const customerInfo = {
                    customer_name: "Tôn Ngộ Không",
                    gender: "Nam",
                    age: "1000",
                    address: "369 Hoa Quả sơn",
                    phone_number: "0987654321",
                };

                // Gán customer vào biến customerData
                // setSelectedCustomer(customerInfo);
                showSave(false);

                //set loading
                setLoadingStep1(false);
                break;
            case 2:
                //set loading
                setLoadingStep2(true);

                // Todo: Call API with datePicked

                //set loading
                setLoadingStep2(false);
                break;
            case 3:
                // call API lấy thông tin service
                const serviceInfo = {
                    service_name: "Liệu trình trị mụn",
                    sale_staff: "Tôn Hành Giả",
                    tech_staff: "Naruto",
                    slot: "Slot 1",
                    bed: "Giường số 1",
                    time: "13/11/2022 12:12",
                };

                // Gán service vào biến serviceData
                setService(serviceInfo);
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
                            allowStepSelect={false}
                            loading={loadingStep1}
                        >
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
                                                console.log(_id);
                                                const id = _id ? Number(_id) : null;
                                                ControlledField.onChange(id);

                                                // Gán customer selected to state
                                                // setSelectedCustomer(customer);
                                            }}
                                        />
                                    }
                                    control={control}
                                    name={"customerId"}
                                />
                            </div>
                            <Group className={"mt-4"} position={"center"}>
                                <Button type={"button"} onClick={() => stepByStep(1)}>Xác nhận khách hàng</Button>
                            </Group>
                        </Stepper.Step>
                        <Stepper.Step
                            label="Chọn ngày"
                            description="Chọn ngày khách đến"
                            allowStepSelect={false}
                            loading={loadingStep2}
                        >
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
                            label="Tìm kiếm dịch vụ"
                            description="Tìm kiếm theo tên/mã dịch vụ"
                            allowStepSelect={false}
                        >
                            <div className={"flex flex-row gap-3"}>
                                <span className={"min-w-48"}>Dịch vụ</span>
                                <div className={"flex w-full flex-col gap-4"}>
                                    <div className={"flex justify-between gap-4"}>
                                        <Controller
                                            render={({field}) => (
                                                <Select className={"w-full"}
                                                        placeholder="Slot"
                                                        searchable
                                                        nothingFound="Trống"
                                                        data={getSlot.map((slot) => {
                                                            return {
                                                                value: slot.id.toString(),
                                                                label: slot.name,
                                                            };
                                                        })}
                                                        onChange={(e) => {
                                                            field.onChange(e);
                                                            field.onBlur();
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
                                                        placeholder="NV kỹ thuật"
                                                        searchable
                                                        nothingFound="Trống"
                                                        data={["React", "Angular", "Svelte", "Vue"]}
                                                        onChange={(e) => {
                                                            field.onChange(e);
                                                            field.onBlur();
                                                        }}
                                                        onBlur={field.onBlur}
                                                        disabled={userRole !== USER_ROLE.sale_staff || !getValues().slotId}>
                                                </Select>
                                            )}
                                            name={"techStaffId"}
                                            control={control}
                                        />
                                        <Controller
                                            render={({field}) => (
                                                <Select className={"w-full"}
                                                        placeholder="Giường"
                                                        searchable
                                                        nothingFound="Trống"
                                                        data={Beds.map((bed) => bed.name)}
                                                        onChange={(e) => {
                                                            field.onChange(e);
                                                            field.onBlur();
                                                        }}
                                                        onBlur={field.onBlur}
                                                        disabled={userRole !== USER_ROLE.sale_staff || !getValues().slotId}>
                                                </Select>
                                            )}
                                            name={"bedId"}
                                            control={control}
                                        />
                                    </div>
                                </div>
                            </div>
                            <Group className={"mt-4"} position={"center"}>
                                <Button type={"button"} onClick={() => stepByStep(0)} color={"gray"}>
                                    Trở lại
                                </Button>
                                <Button type={"button"} onClick={() => stepByStep(3)}>Xác nhận lịch</Button>
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
                                        </div>
                                    )}
                                    {serviceData && (
                                        <div
                                            className={
                                                "w-full rounded-xl border p-4 text-sm shadow-md"
                                            }
                                        >
                                            <div className={"flex justify-between gap-2"}>
                                                <span className={"font-bold"}>Dịch vụ</span>
                                                <span>{serviceData.service_name}</span>
                                            </div>
                                            <div className={"flex justify-between gap-2"}>
                                                <span className={"font-bold"}>NV bán hàng</span>
                                                <span>{serviceData.sale_staff}</span>
                                            </div>
                                            <div className={"flex justify-between gap-2"}>
                                                <span className={"font-bold"}>NV kỹ thuật</span>
                                                <span>{serviceData.tech_staff}</span>
                                            </div>
                                            <div className={"flex justify-between gap-2"}>
                                                <span className={"font-bold"}>Slot</span>
                                                <span>{serviceData.slot}</span>
                                            </div>
                                            <div className={"flex justify-between gap-2"}>
                                                <span className={"font-bold"}>Giường</span>
                                                <span>{serviceData.bed}</span>
                                            </div>
                                            <div className={"flex justify-between gap-2"}>
                                                <span className={"font-bold"}>Thời gian</span>
                                                <span>{serviceData.time}</span>
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
                        <span className={"min-w-48"}>Dịch vụ</span>
                        <Controller
                            render={({field}) => (
                                <Select className={"w-full"}
                                        placeholder="Liệu trình/ Dịch vụ"
                                        searchable
                                        nothingFound="Trống"
                                        data={RawServices.map(s => {
                                            return {
                                                value: s.id.toString(),
                                                label: s.name
                                            }
                                        })}
                                        onChange={(e) => {
                                            field.onChange(e);
                                            field.onBlur();
                                        }}
                                        onBlur={field.onBlur}>
                                </Select>
                            )}
                            name={"services"}
                            control={control}
                        />
                    </div>
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
