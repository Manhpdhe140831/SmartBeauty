import { ScheduleModel, ScheduleStatus } from "../../../../model/schedule.model";
import { USER_ROLE } from "../../../../const/user-role.const";
import { Button, Divider, Group, Input, Select, Stepper, Textarea } from "@mantine/core";
import { slotWorkConst } from "../../../../const/slot-work.const";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const BookingInfo = () => {
  const [active, setActive] = useState(0);
  const [saveBtn, showSave] = useState(false);
  const [data, setData] = useState<ScheduleModel | null>(null);
  const [customerData, setCustomer] = useState<any>(null);
  const [serviceData, setService] = useState<any>(null);

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
        phone_number: "0987654321"
      });
      setService({
        service_code: "LT-062022",
        service_name: "Liệu trình trị mụn",
        date_count: "5/10",
        buy_day: "06/10/2022",
        expired: "06/08/2023"
      });

      setActive(2)
    }
  }, [router.query.scheduleId])

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
          phone_number: "0987654321"
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
          expired: "06/08/2023"
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

  let user_role = "sale_staff";
  const onSubmit = () => {
    //
  };

  return <div className={"w-full h-max p-12"}>
    <form className="flex w-full">
      <div className={"flex w-full flex-col gap-4"}>
        <Stepper active={active} onStepClick={setActive} breakpoint="sm">
          <Stepper.Step label="Customer search" description="Search for customer" allowStepSelect={active >= 0}>
            <div className={"flex flex-row items-center gap-3"}>
              <span className={"min-w-48"}>Customer search</span>
              <Select
                className={"w-full"}
                placeholder="Pick one"
                searchable
                nothingFound="No options"
                data={["React", "Angular", "Svelte", "Vue"]}
                disabled={user_role !== USER_ROLE.sale_staff} />
            </div>
            <Group className={"mt-4"} position={"center"}>
              <Button onClick={() => stepByStep(1)}>Search</Button>
            </Group>
          </Stepper.Step>
          <Stepper.Step label="Services search" description="Search for services" allowStepSelect={active > 1}>
            <div className={"flex flex-row gap-3"}>
              <span className={"min-w-48"}>Service</span>
              <div className={"flex flex-col gap-4 w-full"}>
                <div className={"flex justify-between gap-4"}>
                  <Input className={"w-full"}
                         component={"select"}
                         placeholder="Service"
                         disabled={user_role !== USER_ROLE.sale_staff}>
                    <option value="0">Something 1</option>
                    <option value="1">Something 2</option>
                    <option value="2">Something 3</option>
                    <option value="3">Something 4</option>
                  </Input>
                  <Input className={"w-full"}
                         placeholder="Service code/ service name"
                         disabled={user_role !== USER_ROLE.sale_staff} />
                </div>
                <div className={"flex justify-between gap-4"}>
                  <Input className={"w-full"}
                         component={"select"}
                         placeholder="Customer status"
                         disabled={user_role !== USER_ROLE.sale_staff}>
                    {
                      Object.keys(ScheduleStatus).map((status: any, i) => {
                        if (isNaN(status)) {
                          return <option key={i} value={ScheduleStatus[status]}>{status}</option>;
                        }
                      })
                    }
                  </Input>
                  <Input className={"w-full"}
                         component={"select"}
                         placeholder="Bed number"
                         disabled={user_role !== USER_ROLE.sale_staff}>
                    <option value="1">Bed 1</option>
                    <option value="2">Bed 2</option>
                    <option value="3">Bed 3</option>
                    <option value="4">Bed 4</option>
                  </Input>
                  <Input className={"w-full"}
                         component={"select"}
                         placeholder="Slot"
                         disabled={user_role !== USER_ROLE.sale_staff}>
                    {
                      Object.keys(slotWorkConst).map((slot, i) => {
                        return <option key={i} value="1">{slotWorkConst[slot].name}</option>;
                      })
                    }
                  </Input>
                </div>
              </div>
            </div>
            <Group className={"mt-4"} position={"center"}>
              <Button onClick={() => stepByStep(0)} color={"gray"}>Back</Button>
              <Button onClick={() => stepByStep(2)}>Search</Button>
            </Group>
          </Stepper.Step>
          <Stepper.Completed>
            <div className={"flex flex-row gap-3"}>
              <span className={"min-w-48"}>Customer info</span>
              <div className={"flex w-full justify-between gap-4"}>
                {
                  customerData &&
                  <div className={"w-full border p-4 rounded-xl text-sm shadow-md"}>
                    <div className={"flex justify-between gap-2"}>
                      <span className={"font-bold"}>Customer name</span>
                      <span>{customerData.customer_name}</span>
                    </div>
                    <div className={"flex justify-between gap-2"}>
                      <span className={"font-bold"}>Gender</span>
                      <span>{customerData.gender}</span>
                    </div>
                    <div className={"flex justify-between gap-2"}>
                      <span className={"font-bold"}>Age</span>
                      <span>{customerData.age}</span>
                    </div>
                    <div className={"flex justify-between gap-2"}>
                      <span className={"font-bold"}>Address</span>
                      <span>{customerData.address}</span>
                    </div>
                    <div className={"flex justify-between gap-2"}>
                      <span className={"font-bold"}>Phone number</span>
                      <span>{customerData.phone_number}</span>
                    </div>
                  </div>
                }
                {
                  serviceData &&
                  <div className={"w-full border p-4 rounded-xl text-sm shadow-md"}>
                    <div className={"flex justify-between gap-2"}>
                      <span className={"font-bold"}>Service code</span>
                      <span>{serviceData.service_code}</span>
                    </div>
                    <div className={"flex justify-between gap-2"}>
                      <span className={"font-bold"}>Service name</span>
                      <span>{serviceData.service_name}</span>
                    </div>
                    <div className={"flex justify-between gap-2"}>
                      <span className={"font-bold"}>Date count</span>
                      <span>{serviceData.date_count}</span>
                    </div>
                    <div className={"flex justify-between gap-2"}>
                      <span className={"font-bold"}>Buy day</span>
                      <span>{serviceData.buy_day}</span>
                    </div>
                    <div className={"flex justify-between gap-2"}>
                      <span className={"font-bold"}>Expired</span>
                      <span>{serviceData.expired}</span>
                    </div>
                  </div>
                }
              </div>
            </div>
            <Group className={"mt-4"} position={"center"}>
              <Button onClick={() => stepByStep(0)} color={"gray"}>Return</Button>
            </Group>
          </Stepper.Completed>
        </Stepper>
        <Divider
          my="xs"
          variant="dashed" />
        <div className={"flex flex-row items-center gap-3"}>
          <span className={"min-w-48"}>Technical staff</span>
          <Select
            className={"w-full"}
            placeholder="Pick one"
            searchable
            nothingFound="No options"
            data={["React", "Angular", "Svelte", "Vue"]}
            disabled={user_role !== USER_ROLE.sale_staff} />
        </div>
        <div className={"flex flex-row items-center gap-3"}>
          <span className={"min-w-48"}>Sale staff</span>
          <Select
            className={"w-full"}
            placeholder="Pick one"
            searchable
            nothingFound="No options"
            data={["React", "Angular", "Svelte", "Vue"]}
            disabled={user_role !== USER_ROLE.sale_staff} />
        </div>
        <div className={"flex flex-row gap-3"}>
          <span className={"min-w-48"}>Note</span>
          <Textarea
            className={"w-full"}
            autosize={false}
            rows={4}
            placeholder={"Full address"}
            disabled={user_role !== USER_ROLE.sale_staff}>
          </Textarea>
        </div>
      </div>
    </form>
    {
      saveBtn && (
        <Group className={"mt-4"} position={"center"}>
          <Button color={"gray"}>Cancel</Button>
          <Button>Save</Button>
        </Group>
      )
    }
    {/*</>}*/}
  </div>;
};

export default BookingInfo;
