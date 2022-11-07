import { ScheduleModel, ScheduleStatus } from "../../../../../model/schedule.model";
import { USER_ROLE } from "../../../../../const/user-role.const";
import { Input, Select, Textarea } from "@mantine/core";
import { slotWorkConst } from "../../../../../const/slot-work.const";

type DialogProps = {
  data: ScheduleModel | null
}

const BookingInfo = ({ data }: DialogProps) => {
  console.log(USER_ROLE);
  let user_role = "manager";
  const onSubmit = () => {
    //
  };
  return <div className={"w-full h-max p-2"}>
    {data && <>
      <form className="flex w-full">
        <div className={"flex w-full flex-col gap-4"}>
          <div className={"flex flex-row items-center gap-3"}>
            <span className={"min-w-48"}>Customer search</span>
            <Select
              className={"w-full"}
              placeholder="Pick one"
              searchable
              nothingFound="No options"
              data={["React", "Angular", "Svelte", "Vue"]}
              disabled={user_role !== USER_ROLE.sale_staff}
            />
          </div>
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
          <div className={"flex flex-row gap-3"}>
            <span className={"min-w-48"}>Customer info</span>
            <div className={"flex w-full justify-between gap-4"}>
              <div className={"w-full border p-4 rounded-xl text-sm"}>
                <div className={"flex justify-between gap-2"}>
                  <span className={"font-bold"}>Customer name</span>
                  <span>{data.customer_name}</span>
                </div>
                <div className={"flex justify-between gap-2"}>
                  <span className={"font-bold"}>Gender</span>
                  <span>Male</span>
                </div>
                <div className={"flex justify-between gap-2"}>
                  <span className={"font-bold"}>Age</span>
                  <span>48</span>
                </div>
                <div className={"flex justify-between gap-2"}>
                  <span className={"font-bold"}>Address</span>
                  <span>112 Cầu Giấy</span>
                </div>
                <div className={"flex justify-between gap-2"}>
                  <span className={"font-bold"}>Phone number</span>
                  <span>{data.customer_phone}</span>
                </div>
              </div>
              <div className={"w-full border p-4 rounded-xl text-sm"}>
                <div className={"flex justify-between gap-2"}>
                  <span className={"font-bold"}>Service code</span>
                  <span>LT-062022</span>
                </div>
                <div className={"flex justify-between gap-2"}>
                  <span className={"font-bold"}>Service name</span>
                  <span>Liệu trình trị mụn</span>
                </div>
                <div className={"flex justify-between gap-2"}>
                  <span className={"font-bold"}>Date count</span>
                  <span>5/10</span>
                </div>
                <div className={"flex justify-between gap-2"}>
                  <span className={"font-bold"}>Buy day</span>
                  <span>06/10/2022</span>
                </div>
                <div className={"flex justify-between gap-2"}>
                  <span className={"font-bold"}>Expired</span>
                  <span>06/08/2023</span>
                </div>
              </div>
            </div>
          </div>
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
          {/*<div className={"w-full"}>*/}
          {/*  <Input.Wrapper label={"Full name"}>*/}
          {/*    <Input placeholder="Full name" />*/}
          {/*  </Input.Wrapper>*/}
          {/*  <Input.Wrapper label={"Role"}>*/}
          {/*    <Input component={"select"} placeholder="Role">*/}
          {/*      <option value="3">sale_staff</option>*/}
          {/*      <option value="4">technical_staff</option>*/}
          {/*    </Input>*/}
          {/*  </Input.Wrapper>*/}
          {/*  <Input.Wrapper label={"Time working"}>*/}
          {/*    <Input component={"select"} placeholder="Phone number">*/}
          {/*      <option value="1">Full-time</option>*/}
          {/*      <option value="2">Part-time</option>*/}
          {/*    </Input>*/}
          {/*  </Input.Wrapper>*/}
          {/*</div>*/}
          {/*<div className="flex w-full justify-between gap-5">*/}
          {/*  <div className={"flex w-full flex-col gap-3"}>*/}
          {/*    <DatePicker*/}
          {/*      placeholder="Date of birth"*/}
          {/*      label="Date of Birth"*/}
          {/*      inputFormat="DD/MM/YYYY"*/}
          {/*    />*/}
          {/*    <Input.Wrapper label={"Phone number"}>*/}
          {/*      <Input*/}
          {/*        component={MaskedInput}*/}
          {/*        mask={PhoneNumberMask}*/}
          {/*        placeholder="Phone number"*/}
          {/*      />*/}
          {/*    </Input.Wrapper>*/}
          {/*    <Input.Wrapper label={"Email"}>*/}
          {/*      <Input placeholder="Email" />*/}
          {/*    </Input.Wrapper>*/}
          {/*  </div>*/}
          {/*  <div className={"flex w-full flex-col gap-3"}>*/}
          {/*    <Input.Wrapper label={"Address"}>*/}
          {/*      <Input placeholder="City" />*/}
          {/*    </Input.Wrapper>*/}
          {/*    <Input placeholder="District" />*/}
          {/*    <Input placeholder="Ward" />*/}
          {/*    <Textarea*/}
          {/*      autosize={false}*/}
          {/*      rows={4}*/}
          {/*      placeholder={"Full address"}*/}
          {/*    ></Textarea>*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>
      </form>
    </>}
  </div>;
};

export default BookingInfo;
