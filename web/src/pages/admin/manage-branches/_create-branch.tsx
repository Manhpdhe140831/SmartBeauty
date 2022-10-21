import {
  Button,
  Divider,
  Image,
  Input,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import Link from "next/link";
import MaskedInput from "react-text-mask";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconPlus } from "@tabler/icons";
import FormErrorMessage from "../../../components/form-error-message";
import { PhoneNumberMask } from "../../../const/input-masking.const";
import BtnSingleUploader from "../../../components/btn-single-uploader";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

type CreateBranchPropsType = {
  onSave?: <T>(branchData: T) => void;
};

const createSchema = z.object({
  name: z.string().min(3).max(120),
  email: z.string().email().max(120),
  phone: z
    .string()
    .refine((p) => !!p && p.replace(/\s/g, "").match(/^0\d{9}$/), {
      message: "Số điện thoại không đúng định dạng.",
    }),
  manager: z.string(),
  address: z.string(),
  logo: z
    .any()
    .refine((f) => !!f, { message: "Yêu cầu có file upload" })
    .refine((f) => !!f && f.size <= 5000000, {
      message: "Chỉ upload file tối đa 5MB",
    })
    .refine((f) => !!f && ACCEPTED_IMAGE_TYPES.includes(f.type), {
      message: "Chỉ chấp nhận các file có đuôi .jpg, .jpeg, .png and .webp",
    }),
});

const CreateBranch = ({ onSave }: CreateBranchPropsType) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof createSchema>>({
    resolver: zodResolver(createSchema),
    mode: "onBlur",
  });

  return (
    <form onSubmit={onSave && handleSubmit(onSave)} className={"flex flex-col"}>
      <TextInput
        label={"Tên chi nhánh"}
        description={
          <small className="mb-2 leading-tight text-gray-500">
            Vui lòng đặt tên theo đúng{" "}
            <Link href={"/404"}>
              <a className="inline text-blue-600 underline">quy định</a>
            </Link>
          </small>
        }
        placeholder={"nhập tên của hàng của bạn..."}
        required
        {...register("name")}
      ></TextInput>
      <FormErrorMessage errors={errors} name={"name"} />

      <TextInput
        label={"Tên quản lý"}
        placeholder={"tên người quản lý chi nhánh..."}
        id={"manager"}
        required
        {...register("manager")}
      ></TextInput>
      <FormErrorMessage errors={errors} name={"manager"} />

      <Textarea
        label={"Địa chỉ"}
        autosize={false}
        rows={4}
        placeholder={"địa chỉ của chi nhánh..."}
        id={"branchAddress"}
        required
        {...register("address")}
      ></Textarea>
      <FormErrorMessage errors={errors} name={"address"} />

      {/* Manual handle Form binding because mask-input does not expose `ref` for hook*/}
      <Controller
        name={"phone"}
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
      <FormErrorMessage errors={errors} name={"phone"} />

      <TextInput
        required
        type="email"
        label={"Email"}
        id={"email"}
        {...register("email")}
      />
      <FormErrorMessage errors={errors} name={"email"} />

      <label htmlFor="file" className="text-[14px] text-gray-900">
        Logo chi nhánh <span className="text-red-500">*</span>
      </label>
      <small className="mb-1 text-[12px] leading-tight text-gray-400">
        Chi nhánh phải có ảnh đại diện
      </small>
      {/* Manual handle Form binding because btn does not expose `ref` for hook*/}
      <Controller
        name={"logo"}
        control={control}
        render={({ field }) => (
          <BtnSingleUploader
            accept={ACCEPTED_IMAGE_TYPES.join(",")}
            onChange={(f) => {
              field.onChange(f);
              field.onBlur();
            }}
            btnTitle={"Tải ảnh..."}
            render={(f) => (
              <>
                <Text size="xs" align="left">
                  Picked file: {f.name}
                </Text>
                <Image
                  width={160}
                  height={160}
                  radius="md"
                  src={URL.createObjectURL(f)}
                  alt="Random unsplash image"
                  className="mt-2 select-none rounded-lg border object-cover shadow-xl"
                />
              </>
            )}
          />
        )}
      />
      <FormErrorMessage errors={errors} name={"logo"} />

      <Divider my={16} />

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

export default CreateBranch;
