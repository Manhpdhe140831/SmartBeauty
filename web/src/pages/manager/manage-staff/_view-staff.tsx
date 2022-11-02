import { Button, Group, Image, Input } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import mockManager from "../../../mock/manager";
import { AutoCompleteItemProp } from "../../../components/auto-complete-item";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { nameSchema } from "../../../validation/field.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { StaffModel, StaffPayload } from "../../../model/staff.model";
import { DatePicker } from "@mantine/dates";
import dayjs from "dayjs";

type ViewStaffPropsType = {
  staffData: StaffModel;
  onClose: (staffData?: StaffPayload) => void;
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
  } = useForm<StaffPayload>({
    resolver: zodResolver(updateSchema),
    mode: "onChange",
    defaultValues: { ...staffData },
  });

  const { data: availableManager, isLoading: managerLoading } = useQuery<
    AutoCompleteItemProp[]
  >(["available-manager"], async () => {
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

  const setCancel = () => {};

  const saveInfo = () => {
    //Lưu thông tin
    setCancel();
  };

  const onSubmit = (data: StaffPayload) => onClose();

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
                <Input placeholder="City" disabled />
              </Input.Wrapper>
              <Input placeholder="District" disabled />
              <Input placeholder="Ward" disabled />
              <Input
                placeholder="Full address"
                disabled
                defaultValue={staffData.address}
              />
            </div>
          </div>
        </div>
      </form>

      <div className={"mt-3"}>
        <Group position="center">
          <Button
            variant={"outline"}
            color="gray"
            size="md"
            onClick={() => setCancel()}
          >
            Cancel
          </Button>
          <Button variant={"outline"} size="md" onClick={() => saveInfo()}>
            Save
          </Button>
        </Group>
      </div>
    </div>
  );
};

export default StaffInfo;
