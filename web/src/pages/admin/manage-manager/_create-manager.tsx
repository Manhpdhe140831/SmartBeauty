import { ManagerModel } from "../../../model/manager.model";
import { FC } from "react";
import { z } from "zod";
import {
  addressSchema,
  ageSchemaFn,
  createPasswordSchema,
  emailSchema,
  fileUploadSchema,
  genderSchema,
  imageTypeSchema,
  mobileSchema,
  nameSchema,
} from "../../../validation/field.schema";
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
import subYears from "date-fns/subYears";
import { GENDER } from "../../../const/gender.const";
import BtnSingleUploader from "../../../components/btn-single-uploader";
import { ACCEPTED_IMAGE_TYPES } from "../../../const/file.const";
import { IconPlus } from "@tabler/icons";

/**
 * Entity model to be sent to server.
 * This type omits the generated fields of the server (id, avatar) and
 * dataType from the server (dateOfBirth).
 */
type managerEntity = Omit<ManagerModel, "id" | "avatar" | "dateOfBirth"> & {
  avatar?: File;
  dateOfBirth: Date;
};

/**
 * Component props
 * `onSave()` will trigger with the data from the form.
 */
type CreateManagerProp = {
  onSave: (managerData: managerEntity) => void;
};

const CreateManager: FC<CreateManagerProp> = ({ onSave }) => {
  // validation schema.
  const accountInfo = z.object({
    name: nameSchema,
    mobile: mobileSchema,
    email: emailSchema,
    dateOfBirth: ageSchemaFn(),
    gender: genderSchema,
    address: addressSchema,
    avatar: fileUploadSchema.and(imageTypeSchema),
  });

  const validateSchema = accountInfo
    .merge(createPasswordSchema)
    // refine to check confirmPassword and password match.
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"], // path of error
    });

  const {
    control,
    register,
    handleSubmit,
    getValues, trigger,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof validateSchema>>({
    resolver: zodResolver(validateSchema),
    mode: "onChange",
    criteriaMode: "all",
    // defaultValues: {
    // gender: GENDER.other,
    // },
  });

  return (
    <form onSubmit={onSave && handleSubmit(onSave)} className={"flex flex-col"}>
      <h3 className="my-2 mt-4 select-none border-l-2 pl-4 text-lg uppercase text-gray-500">
        Thông tin cá nhân
      </h3>
      <TextInput
        label={"Tên quản lý"}
        description={
          <small className="mb-2 leading-tight text-gray-500">
            Vui lòng đặt tên theo đúng{" "}
            <Link href={"/404"}>
              <a className="inline text-blue-600 underline">quy định</a>
            </Link>
          </small>
        }
        placeholder={"họ và tên của quản lý"}
        required
        {...register("name")}
      />
      <FormErrorMessage errors={errors} name={"name"} />
      {/* Manual handle Form binding because mask-input does not expose `ref` for hook*/}
      <Controller
        name={"mobile"}
        control={control}
        render={({ field }) => (
          <Input.Wrapper required id={"phone"} label={"Số điện thoại"}>
            <Input
              component={MaskedInput}
              mask={PhoneNumberMask}
              placeholder={"012 774 9999"}
              onChange={field.onChange}
              onBlur={field.onBlur}
            />
          </Input.Wrapper>
        )}
      />
      <FormErrorMessage errors={errors} name={"mobile"} />
      <TextInput
        required
        type="email"
        label={"Email"}
        id={"email"}
        {...register("email")}
      />
      <FormErrorMessage errors={errors} name={"email"} />
      <Controller
        render={({ field }) => (
          <DatePicker
            minDate={subYears(new Date(), 64)}
            maxDate={subYears(new Date(), 18)}
            placeholder="trong khoảng 18-64 tuổi"
            label="Ngày sinh"
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
            label="Giới Tính"
            onChange={(e) => {
              field.onChange(e);
              field.onBlur();
            }}
            onBlur={field.onBlur}
            defaultValue={field.value}
            withAsterisk
          >
            <Radio value={GENDER.male} label="Nam" />
            <Radio value={GENDER.female} label="Nữ" />
            <Radio value={GENDER.other} label="Khác" />
          </Radio.Group>
        )}
        name={"gender"}
        control={control}
      />
      <FormErrorMessage errors={errors} name={"gender"} />

      <Textarea
        label={"Địa chỉ"}
        autosize={false}
        rows={4}
        placeholder={"địa chỉ thường trú..."}
        id={"branchAddress"}
        required
        {...register("address")}
      ></Textarea>
      <FormErrorMessage errors={errors} name={"address"} />

      <Divider my={8} />
      <h3 className="my-2 mt-4 select-none border-l-2 pl-4 text-lg uppercase text-gray-500">
        Thông tin đăng nhập
        <small className="block text-xs normal-case text-gray-500">
          Sử dụng email bên trên và mật khẩu dưới đây để đăng nhập
        </small>
      </h3>

      <TextInput
        label={"Mật khẩu"}
        id={"password"}
        type="password"
        placeholder={"từ 3-30 kí tự"}
        required
        {...register("password")}
      />
      <FormErrorMessage errors={errors} name={"password"} />

      <TextInput
        label={"Xác nhận Mật khẩu"}
        id={"confirmPassword"}
        type="password"
        placeholder={"từ 3-30 kí tự, giống mật khẩu"}
        required
        {...register("confirmPassword")}
      />
      <FormErrorMessage errors={errors} name={"confirmPassword"} />

      <label htmlFor="file" className="text-[14px] font-[500] text-gray-900">
        Ảnh đại diện<span className="text-red-500">*</span>
      </label>
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
            btnTitle={"Tải ảnh..."}
            btnPosition={"after"}
            render={(f) =>
              (f && (
                <div className={"flex justify-center"}>
                  <div className="mt-2 rounded-full border-2 border-gray-400 object-cover shadow-xl">
                    <Avatar
                      radius={60}
                      size={120}
                      src={URL.createObjectURL(f)}
                      alt="Ảnh người dùng"
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
        onClick={() =>
          console.log(
            getValues(),
            isValid,
            validateSchema.safeParse(getValues())
          )
        }
      >
        check
      </Button>

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
