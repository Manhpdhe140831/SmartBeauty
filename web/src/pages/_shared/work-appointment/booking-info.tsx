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
import { ScheduleModel, ScheduleStatus } from "../../../model/schedule.model";
import { slotWorkConst } from "../../../const/slot-work.const";
import { USER_ROLE } from "../../../const/user-role.const";
import { useAuthUser } from "../../../store/auth-user.state";

const BookingInfo = () => {
  const [active, setActive] = useState(0);
  const [saveBtn, showSave] = useState(false);
  const [data, setData] = useState<ScheduleModel | null>(null);
  const [customerData, setCustomer] = useState<any>(null);
  const [serviceData, setService] = useState<any>(null);

  const userRole = useAuthUser((s) => s.user?.role);

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

      setActive(2);
    } else {
      if (userRole !== USER_ROLE.sale_staff) {
        void router.push("/");
      }
    }
  }, [router, router.query.scheduleId, userRole]);

  const stepByStep = (step: number) => {
    switch (step) {
      case 0:
        setCustomer(null);
        setService(null);
        showSave(false);
        break;
      case 1:
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
        break;
      case 2:
        // call API lấy thông tin service
        const serviceInfo = {
          service_code: "LT-062022",
          service_name: "Liệu trình trị mụn",
          date_count: "5/10",
          buy_day: "06/10/2022",
          expired: "06/08/2023",
        };

        // Gán service vào biến serviceData
        setService(serviceInfo);
        showSave(true);
    }

    // set button show/hide
    setActive(step);
    if (step === 2) {
      showSave(true);
    } else {
      showSave(false);
    }
  };

  return (
    <div className={"h-max w-full p-12"}>
      <form className="flex w-full">
        <div className={"flex w-full flex-col gap-4"}>
          <Stepper active={active} onStepClick={setActive} breakpoint="sm">
            <Stepper.Step
              label="Tìm kiếm khách hàng"
              description="Tìm kiếm theo tên"
              allowStepSelect={userRole === USER_ROLE.sale_staff}
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
              label="Tìm kiếm dịch vụ"
              description="Tìm kiếm theo tên/mã dịch vụ"
              allowStepSelect={userRole === USER_ROLE.sale_staff}
            >
              <div className={"flex flex-row gap-3"}>
                <span className={"min-w-48"}>Dịch vụ</span>
                <div className={"flex w-full flex-col gap-4"}>
                  <div className={"flex justify-between gap-4"}>
                    <Input
                      className={"w-full"}
                      component={"select"}
                      placeholder="Service"
                      disabled={userRole !== USER_ROLE.sale_staff}
                    >
                      <option value="0">Something 1</option>
                      <option value="1">Something 2</option>
                      <option value="2">Something 3</option>
                      <option value="3">Something 4</option>
                    </Input>
                    <Input
                      className={"w-full"}
                      placeholder="Service code/ service name"
                      disabled={userRole !== USER_ROLE.sale_staff}
                    />
                  </div>
                  <div className={"flex justify-between gap-4"}>
                    <Input
                      className={"w-full"}
                      component={"select"}
                      placeholder="Customer status"
                      disabled={userRole !== USER_ROLE.sale_staff}
                    >
                      {Object.keys(ScheduleStatus).map((status: any, i) => {
                        if (isNaN(status)) {
                          return (
                            <option key={i} value={ScheduleStatus[status]}>
                              {status}
                            </option>
                          );
                        }
                      })}
                    </Input>
                    <Input
                      className={"w-full"}
                      component={"select"}
                      placeholder="Bed number"
                      disabled={userRole !== USER_ROLE.sale_staff}
                    >
                      <option value="1">Bed 1</option>
                      <option value="2">Bed 2</option>
                      <option value="3">Bed 3</option>
                      <option value="4">Bed 4</option>
                    </Input>
                    <Input
                      className={"w-full"}
                      component={"select"}
                      placeholder="Slot"
                      disabled={userRole !== USER_ROLE.sale_staff}
                    >
                      {Object.keys(slotWorkConst).map((slot, i) => {
                        return (
                          <option key={i} value="1">
                            {slotWorkConst[slot].name}
                          </option>
                        );
                      })}
                    </Input>
                  </div>
                </div>
              </div>
              <Group className={"mt-4"} position={"center"}>
                <Button onClick={() => stepByStep(0)} color={"gray"}>
                  Trở lại
                </Button>
                <Button onClick={() => stepByStep(2)}>Tìm kiếm</Button>
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
                        <span className={"font-bold"}>Mã dịch vụ</span>
                        <span>{serviceData.service_code}</span>
                      </div>
                      <div className={"flex justify-between gap-2"}>
                        <span className={"font-bold"}>Dịch vụ</span>
                        <span>{serviceData.service_name}</span>
                      </div>
                      <div className={"flex justify-between gap-2"}>
                        <span className={"font-bold"}>Số lần</span>
                        <span>{serviceData.date_count}</span>
                      </div>
                      <div className={"flex justify-between gap-2"}>
                        <span className={"font-bold"}>Ngày mua</span>
                        <span>{serviceData.buy_day}</span>
                      </div>
                      <div className={"flex justify-between gap-2"}>
                        <span className={"font-bold"}>Ngày hết hạn</span>
                        <span>{serviceData.expired}</span>
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
            <span className={"min-w-48"}>NV kỹ thuật</span>
            <Select
              className={"w-full"}
              placeholder="Pick one"
              searchable
              nothingFound="No options"
              data={["React", "Angular", "Svelte", "Vue"]}
              disabled={userRole !== USER_ROLE.sale_staff}
            />
          </div>
          <div className={"flex flex-row items-center gap-3"}>
            <span className={"min-w-48"}>NV kinh doanh</span>
            <Select
              className={"w-full"}
              placeholder="Pick one"
              searchable
              nothingFound="No options"
              data={["React", "Angular", "Svelte", "Vue"]}
              disabled={userRole !== USER_ROLE.sale_staff}
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

export default BookingInfo;
