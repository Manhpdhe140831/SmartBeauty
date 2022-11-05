import { Button, Group, Image, Input, Textarea } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import mockManager from "../../../mock/manager";
import { AutoCompleteItemProp } from "../../../components/auto-complete-item";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { nameSchema } from "../../../validation/field.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { StaffModel, StaffCreateEntity } from "../../../model/staff.model";
import { DatePicker } from "@mantine/dates";
import dayjs from "dayjs";
import { PhoneNumberMask } from "../../../const/input-masking.const";
import MaskedInput from "react-text-mask";

type ViewStaffPropsType = {
  staffData: StaffModel;
  onClose: (staffData?: StaffCreateEntity) => void;
};

const StaffInfo = ({ staffData, onClose }: ViewStaffPropsType) => {
  // schema validation
  const updateSchema = z.object({
    name: nameSchema,
    Role: nameSchema,
    PhoneNumber: nameSchema,
  });

  console.log(staffData);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<StaffCreateEntity>({
    resolver: zodResolver(updateSchema),
    mode: "onChange",
    defaultValues: { ...staffData },
  });

  const { data: availableManager, isLoading: managerLoading } = useQuery(["available-manager"], async () => {
    const manager = await mockManager();
    return manager.map((m) => ({
      // add fields of SelectItemGeneric
      value: String(m.id),
      label: m.name,
      data: {
        description: m.phone,
      },
    }));
  });

  const dateParse = (dateString: string) => {
    // return dateString
    console.log(dayjs(dateString).toDate());
    return dayjs(dateString).toDate();
  };

  const setCancel = () => {
    //
  };

  const saveInfo = () => {
    //Lưu thông tin
    setCancel();
  };

  const onSubmit = (data: StaffCreateEntity) => onClose();

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-[600px] space-x-4"
      >
        <div className={"flex w-full flex-col"}>
          <div className={"flex w-full justify-between gap-5"}>
            <div style={{ width: 220 }} className={"h-full"}>
              <Image
                height={180}
                fit={"cover"}
                radius="sm"
                src={staffData.image}
                alt=""
              />
            </div>
            <div className={"w-full"}>
              <Input.Wrapper label={"Full name"}>
                <Input placeholder="Full name" defaultValue={staffData.name} />
              </Input.Wrapper>
              <Input.Wrapper label={"Role"}>
                <Input placeholder="Full name" defaultValue={staffData.role} />
              </Input.Wrapper>
              <Input.Wrapper label={"Time working"}>
                <Input component={"select"} placeholder="Phone number">
                  <option value="1">Full-time</option>
                  <option value="2">Part-time</option>
                </Input>
              </Input.Wrapper>
            </div>
          </div>
          <div className="flex w-full justify-between gap-5">
            <div className={"flex w-full flex-col gap-3"}>
              <DatePicker
                placeholder="Date of birth"
                label="Date of Birth"
                defaultValue={dateParse(staffData.dateOfBirth)}
                inputFormat="DD/MM/YYYY"
              />
              <Input.Wrapper label={"Phone number"}>
                <Input
                  component={MaskedInput}
                  mask={PhoneNumberMask}
                  placeholder="Phone number"
                  defaultValue={staffData.phone}
                />
              </Input.Wrapper>
              <Input.Wrapper label={"Email"}>
                <Input placeholder="Email" defaultValue={staffData.email} />
              </Input.Wrapper>
            </div>
            <div className={"flex w-full flex-col gap-3"}>
              <Input.Wrapper label={"Address"}>
                <Textarea placeholder="City" disabled />
              </Input.Wrapper>
              <Input placeholder="District" disabled />
              <Input placeholder="Ward" disabled />
              <Textarea
                autosize={false}
                rows={4}
                placeholder={"Full address"}
                defaultValue={staffData.address}
                disabled
              ></Textarea>
            </div>
          </div>
        </div>
      </form>

      <div className={"mt-3"}>
        <Group position="center">
          <Button
            color="gray"
            size="md"
            onClick={() => setCancel()}
          >
            Cancel
          </Button>
          <Button size="md" onClick={() => saveInfo()}>
            Save
          </Button>
        </Group>
      </div>
    </div>
  );
};

export default StaffInfo;
