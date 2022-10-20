import {
  Button,
  Divider,
  FileButton,
  FileInput,
  Group,
  Image,
  Input,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import Link from "next/link";
import InputMask from "react-input-mask";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconPlus } from "@tabler/icons";
import FormErrorMessage from "../../../components/form-error-message";
import { useState } from "react";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "../../../const/file.const";

const createSchema = z.object({
  name: z.string().min(3).max(120),
  email: z.string().email().max(120),
  phone: z.string(),
  manager: z.string(),
  address: z.string(),
  logo: z
    .instanceof(File)
    .refine((f) => !!f, "Image is required.")
    .refine((f) => f.size <= MAX_FILE_SIZE, "Max file size is 5MB")
    .refine(
      (f) => ACCEPTED_IMAGE_TYPES.includes(f.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
});

type CreateBranchPropsType = {
  onSave(branchData: z.infer<typeof createSchema>): void;
};

const CreateBranch = ({ onSave }: CreateBranchPropsType) => {
  const [file, setFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof createSchema>>({
    resolver: zodResolver(createSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSave)} className={"flex flex-col"}>
      <h1 className="text-center font-thin capitalize">Mở chi nhánh mới</h1>

      <Divider my={16} />

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
        id={"name"}
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

      <Input.Wrapper required id={"phone"} label={"Số điện thoại"}>
        <Input
          component={InputMask}
          mask={"999-999-9999"}
          {...register("phone")}
        />
      </Input.Wrapper>
      <FormErrorMessage errors={errors} name={"phone"} />

      <TextInput required label={"Email"} id={"email"} {...register("email")} />
      <FormErrorMessage errors={errors} name={"email"} />

      <FileInput
        placeholder="chấp nhận các ảnh PNG, JPEG dưới 5mb"
        label="Logo chi nhánh"
        description={"Chi nhánh phải có ảnh đại diện"}
        withAsterisk
        accept={ACCEPTED_IMAGE_TYPES.join(",")}
      />
      <Group position="left">
        <FileButton onChange={setFile} accept="image/png,image/jpeg">
          {(props) => <Button {...props}>Upload image</Button>}
        </FileButton>
      </Group>
      {file && (
        <>
          <Text size="sm" align="left" mt="sm">
            Picked file: {file.name}
          </Text>
          <Image
            width={160}
            height={160}
            radius="md"
            src={URL.createObjectURL(file)}
            alt="Random unsplash image"
            className="mt-2 select-none rounded-lg border object-cover shadow-xl"
          />
        </>
      )}

      <Divider my={16} />

      <Button variant={"filled"} leftIcon={<IconPlus />}>
        Tạo mới
      </Button>
    </form>
  );
};

export default CreateBranch;
