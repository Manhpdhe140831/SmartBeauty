import {Avatar, Button, Group, Image, Input, PasswordInput, Select, Textarea, TextInput} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import mockManager from "../../../mock/manager";
import { AutoCompleteItemProp } from "../../../components/auto-complete-item";
import {Controller, useForm} from "react-hook-form";
import { z } from "zod";
import { nameSchema } from "../../../validation/field.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { StaffModel, StaffCreateEntity } from "../../../model/staff.model";
import { DatePicker } from "@mantine/dates";
import dayjs from "dayjs";
import { PhoneNumberMask } from "../../../const/input-masking.const";
import MaskedInput from "react-text-mask";
import {FC, FormEvent} from "react";
import {employeeModelSchema, userRegisterSchemaFn} from "../../../validation/account-model.schema";
import {GENDER} from "../../../const/gender.const";
import {DialogSubmit} from "../../../utilities/form-data.helper";
import BtnSingleUploader from "../../../components/btn-single-uploader";
import {ACCEPTED_IMAGE_TYPES} from "../../../const/file.const";
import {STAFF_USER_ROLE} from "../../../const/user-role.const";
import DialogDetailAction from "../../../components/dialog-detail-action";

type ViewStaffPropsType = {
  staffData: StaffModel;
  onClosed: (staffData?: StaffCreateEntity) => void;
};

const ViewStaff: FC<ViewStaffPropsType> = ({onClosed, staffData}) => {
  const createStaffSchema = userRegisterSchemaFn(employeeModelSchema, false);

  console.log(staffData);

  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    getValues,
    formState: {errors, isValid, isDirty, dirtyFields},
  } = useForm<z.infer<typeof createStaffSchema>>({
    resolver: zodResolver(createStaffSchema),
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      gender: GENDER.other,
    },
  });

  const handleReset = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    reset();
    onClosed && onClosed();
  };

  return (
      <div>
        <form
            onReset={handleReset}
            onSubmit={handleSubmit(DialogSubmit("create", dirtyFields, onClosed))}
            className="flex w-[600px] space-x-4">
          <div className={"flex w-full flex-col"}>
            <div className={"flex w-full justify-between gap-5"}>
              <div style={{width: 220}} className={"flex flex-col items-center space-y-2 h-full"}>
                <Controller
                    name={"image"}
                    control={control}
                    render={({field}) => (
                        <BtnSingleUploader
                            accept={ACCEPTED_IMAGE_TYPES.join(",")}
                            onChange={(f) => {
                              field.onChange(f);
                              field.onBlur();
                            }}
                            btnTitle={"Upload"}
                            btnPosition={"after"}
                            render={(f) =>
                                (f && (
                                    <div className={"flex justify-center"}>
                                      <div
                                          className="mt-2 rounded-full border-2 border-gray-400 object-cover shadow-xl">
                                        <Avatar
                                            radius={60}
                                            size={120}
                                            src={URL.createObjectURL(f)}
                                            alt="User Avatar"
                                        />
                                      </div>
                                    </div>
                                )) ?? <></>
                            }
                        />
                    )}
                />
              </div>
              <div className={"w-full"}>
                <TextInput label={"Full name"} placeholder="Full name" {...register("name")} />
                <Input.Wrapper label={"Role"}
                               withAsterisk>
                  <Input component={"select"}
                         placeholder="Role"
                         {...register("role")}>
                    <option value={STAFF_USER_ROLE.sale_staff}>Sale staff</option>
                    <option value={STAFF_USER_ROLE.technical_staff}>Technical staff</option>
                  </Input>
                </Input.Wrapper>
                <PasswordInput
                    placeholder="Password"
                    label="Password"
                    withAsterisk
                    {...register("password")}
                />
              </div>
            </div>
            <div className="flex w-full justify-between gap-5">
              <div className={"flex w-full flex-col gap-3"}>
                <Input.Wrapper label={"Gender"}
                               withAsterisk>
                  <Select
                      data={[
                        {value: GENDER.male, label: "Nam"},
                        {value: GENDER.female, label: "Nữ"},
                        {value: GENDER.other, label: "Khác"},
                      ]}
                  ></Select>
                </Input.Wrapper>
                <Controller
                    render={({field}) => (
                        <DatePicker
                            minDate={dayjs(new Date()).subtract(64, "years").toDate()}
                            maxDate={dayjs(new Date()).subtract(18, "years").toDate()}
                            placeholder="In range of 18-64 years old"
                            label="Date of Birth"
                            withAsterisk
                            onChange={(e) => {
                              field.onChange(e);
                              field.onBlur();
                            }}
                            onBlur={field.onBlur}
                            defaultValue={field.value}
                        />
                    )}
                    name={"dateOfBirth"}
                    control={control}
                />
              </div>
              <div className={"flex w-full flex-col gap-3"}>
                <Controller
                    name={"phone"}
                    control={control}
                    render={({field}) => (
                        <Input.Wrapper required id={"phone"} label={"Phone Number"}>
                          <Input
                              component={MaskedInput}
                              mask={PhoneNumberMask}
                              placeholder={"0127749999"}
                              defaultValue={field.value}
                              onChange={field.onChange}
                              onBlur={field.onBlur}
                          />
                        </Input.Wrapper>
                    )}
                />
                <TextInput
                    required
                    type="email"
                    label={"Email"}
                    id={"email"}
                    placeholder={"john_smith@domain.com"}
                    {...register("email")}
                />
              </div>
            </div>
            <Textarea
                autosize={false}
                rows={6}
                label={"Address"}
                placeholder={"Full address"}
                {...register("address")}
                withAsterisk
            ></Textarea>
            <div className={"flex justify-end mt-3"}>
              <button type={"button"}
                  onClick={() => console.log(createStaffSchema.safeParse(getValues()))}>check
              </button>
              <DialogDetailAction mode={"create"} isDirty={isDirty} isValid={isValid}/>
            </div>
          </div>
        </form>
      </div>
  );
};

export default ViewStaff;
