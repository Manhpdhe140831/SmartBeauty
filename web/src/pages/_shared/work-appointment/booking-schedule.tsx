import {
  Button,
  Divider,
  Group,
  Input,
  Select,
  Stepper,
  Textarea,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { slotWorkConst } from "../../../const/slot-work.const";
import { USER_ROLE } from "../../../const/user-role.const";
import { DatePicker } from "@mantine/dates";
import { useAuthUser } from "../../../store/auth-user.state";
import { Beds } from "../../../mock/bed";

const BookingSchedule = () => {
  const [active, setActive] = useState(0);
  const [saveBtn, showSave] = useState(false);
  const [customerData, setCustomer] = useState<any>(null);
  const [serviceData, setService] = useState<any>(null);
  const [datePicked, setDatePicked] = useState<Date>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const [loadingStep1, setLoadingStep1] = useState<boolean>(false);
  const [loadingStep2, setLoadingStep2] = useState<boolean>(false);

  // const userRole = useAuthUser((s) => s.user?.role);
  const userRole = USER_ROLE.sale_staff;

  const router = useRouter();

  useEffect(() => {
    if (router.query.scheduleId) {
      // query data with dataId

      // set data
      setCustomer({
        customer_name: "Tôn Ngộ Không",
        gender: "Nam",
        age: "1000",
        address: "369 Hoa Quả sơn",
        phone_number: "0987654321",
      });
      setService({
        service_code: "LT-062022",
        service_name: "Liệu trình trị mụn",
        date_count: "5/10",
        buy_day: "06/10/2022",
        expired: "06/08/2023",
      });

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
        setCustomer(null);
        setService(null);
        setSelectedSlot(null);
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
        setCustomer(customerInfo);
        showSave(false);

        //set loading
        setLoadingStep1(false);
        break;
      case 2:
        //set loading
        setLoadingStep2(true);

        // Todo: Call API with datePicked
        console.log(datePicked);

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

  useEffect(() => {
    console.log(selectedSlot);
  }, [selectedSlot]);

  return (
    <div className={"h-max w-full p-12"}>
      <form className="flex w-full">
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
                <Select
                  className={"w-full"}
                  placeholder="Pick one"
                  searchable
                  nothingFound="No options"
                  data={["React", "Angular", "Svelte", "Vue"]}
                  disabled={userRole !== USER_ROLE.sale_staff}
                />
              </div>
              <Group className={"mt-4"} position={"center"}>
                <Button onClick={() => stepByStep(1)}>Tìm kiếm</Button>
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
                  <DatePicker
                    placeholder="Pick date"
                    value={datePicked}
                    withAsterisk
                    onChange={(date: Date) => setDatePicked(date)}
                    disabled={userRole !== USER_ROLE.sale_staff}
                  />
                </div>
              </div>
              <Group className={"mt-4"} position={"center"}>
                <Button onClick={() => stepByStep(0)} color={"gray"}>
                  Trở lại
                </Button>
                <Button onClick={() => stepByStep(2)}>Tìm kiếm</Button>
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
                  {/*<div className={"flex justify-between gap-4"}>*/}
                  {/*  <Input*/}
                  {/*    className={"w-full"}*/}
                  {/*    component={"select"}*/}
                  {/*    placeholder="Service"*/}
                  {/*    disabled={userRole !== USER_ROLE.sale_staff}*/}
                  {/*  >*/}
                  {/*    <option value="0">Something 1</option>*/}
                  {/*    <option value="1">Something 2</option>*/}
                  {/*    <option value="2">Something 3</option>*/}
                  {/*    <option value="3">Something 4</option>*/}
                  {/*  </Input>*/}
                  {/*  <Input*/}
                  {/*    className={"w-full"}*/}
                  {/*    placeholder="Service code/ service name"*/}
                  {/*    disabled={userRole !== USER_ROLE.sale_staff}*/}
                  {/*  />*/}
                  {/*</div>*/}
                  <div className={"flex justify-between gap-4"}>
                    <Select
                      className={"w-full"}
                      placeholder="Slot"
                      searchable
                      nothingFound="No options"
                      data={Object.keys(slotWorkConst).map((slot) => {
                        return {
                          value: slot,
                          label: slotWorkConst[slot].name,
                        };
                      })}
                      onChange={setSelectedSlot}
                      disabled={userRole !== USER_ROLE.sale_staff}
                    />
                    <Select
                      className={"w-full"}
                      placeholder="NV kỹ thuật"
                      searchable
                      nothingFound="No options"
                      data={["React", "Angular", "Svelte", "Vue"]}
                      disabled={
                        userRole !== USER_ROLE.sale_staff || !selectedSlot
                      }
                    />
                    <Select
                      className={"w-full"}
                      placeholder="Giường"
                      searchable
                      nothingFound="Trống"
                      data={Beds.map((bed) => bed.name)}
                      disabled={
                        userRole !== USER_ROLE.sale_staff || !selectedSlot
                      }
                    />
                  </div>
                </div>
              </div>
              <Group className={"mt-4"} position={"center"}>
                <Button onClick={() => stepByStep(0)} color={"gray"}>
                  Trở lại
                </Button>
                <Button onClick={() => stepByStep(3)}>Tìm kiếm</Button>
              </Group>
            </Stepper.Step>
            <Stepper.Completed>
              <div className={"flex flex-row gap-3"}>
                <span className={"min-w-48"}>Thông tin khách hàng</span>
                <div className={"flex w-full justify-between gap-4"}>
                  {customerData && (
                    <div
                      className={
                        "w-full rounded-xl border p-4 text-sm shadow-md"
                      }
                    >
                      <div className={"flex justify-between gap-2"}>
                        <span className={"font-bold"}>Tên khách hàng</span>
                        <span>{customerData.customer_name}</span>
                      </div>
                      <div className={"flex justify-between gap-2"}>
                        <span className={"font-bold"}>Giới tính</span>
                        <span>{customerData.gender}</span>
                      </div>
                      <div className={"flex justify-between gap-2"}>
                        <span className={"font-bold"}>Tuổi</span>
                        <span>{customerData.age}</span>
                      </div>
                      <div className={"flex justify-between gap-2"}>
                        <span className={"font-bold"}>Địa chỉ</span>
                        <span>{customerData.address}</span>
                      </div>
                      <div className={"flex justify-between gap-2"}>
                        <span className={"font-bold"}>SĐT</span>
                        <span>{customerData.phone_number}</span>
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
                  <Button onClick={() => stepByStep(0)} color={"gray"}>
                    Return
                  </Button>
                </Group>
              )}
            </Stepper.Completed>
          </Stepper>
          <Divider my="xs" variant="dashed" />
          <div className={"flex flex-row items-center gap-3"}>
            <span className={"min-w-48"}>Dịch vụ</span>
            <Select
              className={"w-full"}
              placeholder="Liệu trình/ Dịch vụ"
              searchable
              nothingFound="Trống"
              data={["Dịch vụ làm mặt", "Tẩy trắng", "Cắt tóc", "Yểm bùa"]}
            />
          </div>
          <div className={"flex flex-row items-center gap-3"}>
            <span className={"min-w-48"}>NV kinh doanh</span>
            <Input
              className={"w-full"}
              disabled
              value={useAuthUser((s) => s.user?.name)}
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
            ></Textarea>
          </div>
        </div>
      </form>
      {userRole === USER_ROLE.sale_staff && saveBtn && (
        <Group className={"mt-4"} position={"center"}>
          <Button color={"gray"}>Cancel</Button>
          <Button>Save</Button>
        </Group>
      )}
      {/*</>}*/}
    </div>
  );
};

export default BookingSchedule;
