import { ManagerCreateEntity } from "../../../model/manager.model";
import { FC } from "react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Avatar,
  Button,
  Divider,
  Input,
  Radio,
  Textarea,
  TextInput,
} from "@mantine/core";
import Link from "next/link";
import FormErrorMessage from "../../../components/form-error-message";
import MaskedInput from "react-text-mask";
import { PhoneNumberMask } from "../../../const/input-masking.const";
import { DatePicker } from "@mantine/dates";
import { GENDER } from "../../../const/gender.const";
import BtnSingleUploader from "../../../components/btn-single-uploader";
import { ACCEPTED_IMAGE_TYPES } from "../../../const/file.const";
import { IconPlus } from "@tabler/icons";
import dayjs from "dayjs";
import {
  managerModelSchema,
  userRegisterSchemaFn,
} from "../../../validation/account-model.schema";
import { USER_ROLE } from "../../../const/user-role.const";

/**
 * Component props
 * `onSave()` will trigger with the data from the form.
 */
type CreateManagerProp = {
  onSave: (managerData: ManagerCreateEntity) => void;
};

const CreateManager: FC<CreateManagerProp> = ({ onSave }) => {
  const createManagerSchema = userRegisterSchemaFn(managerModelSchema);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof createManagerSchema>>({
    resolver: zodResolver(createManagerSchema),
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      gender: GENDER.other,
      role: USER_ROLE.manager,
    },
  });

  return (
    <form onSubmit={onSave && handleSubmit(onSave)} className={"flex flex-col"}>
      <h3 className="my-2 mt-4 select-none border-l-2 pl-4 text-lg uppercase text-gray-500">
        Personal Information
      </h3>
      <TextInput
        label={"Manager Full Name"}
        description={
          <small className="mb-2 leading-tight text-gray-500">
            Please naming according to{" "}
            <Link href={"/404"}>
              <a className="inline text-blue-600 underline">the rule</a>
            </Link>
          </small>
        }
        placeholder={"full name of the manager"}
        required
        {...register("name")}
      />
      <FormErrorMessage errors={errors} name={"name"} />
      {/* Manual handle Form binding because mask-input does not expose `ref` for hook*/}
      <Controller
        name={"phone"}
        control={control}
        render={({ field }) => (
          <Input.Wrapper required id={"phone"} label={"Phone Number"}>
            <Input
              component={MaskedInput}
              mask={PhoneNumberMask}
              placeholder={"0127749999"}
              onChange={field.onChange}
              onBlur={field.onBlur}
            />
          </Input.Wrapper>
        )}
      />
      <FormErrorMessage errors={errors} name={"phone"} />
      <TextInput
        required
        type="email"
        label={"Email"}
        id={"email"}
        placeholder={"john_smith@domain.com"}
        {...register("email")}
      />
      <FormErrorMessage errors={errors} name={"email"} />
      <Controller
        render={({ field }) => (
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
      <FormErrorMessage errors={errors} name={"dateOfBirth"} />

      <Controller
        render={({ field }) => (
          <Radio.Group
            name={"gender"}
            label="Gender"
            onChange={(e) => {
              field.onChange(e);
              field.onBlur();
            }}
            onBlur={field.onBlur}
            defaultValue={field.value}
            withAsterisk
          >
            <Radio value={GENDER.male} label="Male" />
            <Radio value={GENDER.female} label="Female" />
            <Radio value={GENDER.other} label="Other" />
          </Radio.Group>
        )}
        name={"gender"}
        control={control}
      />
      <FormErrorMessage errors={errors} name={"gender"} />

      <Textarea
        label={"Address"}
        autosize={false}
        rows={4}
        placeholder={"permanent address..."}
        id={"branchAddress"}
        required
        {...register("address")}
      ></Textarea>
      <FormErrorMessage errors={errors} name={"address"} />

      <Divider my={8} />
      <h3 className="my-2 mt-4 select-none border-l-2 pl-4 text-lg uppercase text-gray-500">
        Account Information
        <small className="block text-xs normal-case text-gray-500">
          Use the email above and the password below to login
        </small>
      </h3>

      <TextInput
        label={"Password"}
        id={"password"}
        type="password"
        placeholder={"3-30 characters"}
        required
        {...register("password")}
      />
      <FormErrorMessage errors={errors} name={"password"} />

      <TextInput
        label={"Confirm Password"}
        id={"confirmPassword"}
        type="password"
        placeholder={"similar to password"}
        required
        {...register("confirmPassword")}
      />
      <FormErrorMessage errors={errors} name={"confirmPassword"} />

      <label htmlFor="file" className="text-[14px] font-[500] text-gray-900">
        Avatar<span className="text-red-500">*</span>
      </label>
      <small className="mb-1 text-[12px] leading-tight text-gray-400">
        The avatar must be less than 5MB, in *.PNG, *.JPEG, or *.WEBP format.
      </small>
      {/* Manual handle Form binding because btn does not expose `ref` for hook*/}
      <Controller
        name={"avatar"}
        control={control}
        render={({ field }) => (
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
                  <div className="mt-2 rounded-full border-2 border-gray-400 object-cover shadow-xl">
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
      <FormErrorMessage errors={errors} name={"avatar"} />

      <Divider my={8} />

      <Button
        disabled={!isValid}
        type={"submit"}
        variant={"filled"}
        leftIcon={<IconPlus />}
      >
        Tạo mới
      </Button>
    </form>
  );
};

export default CreateManager;
