import {
  Button,
  Divider,
  Image,
  Input,
  Select,
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
import { useQuery } from "@tanstack/react-query";
import { SelectItemGeneric } from "../../../interfaces/select-item-generic.interface";
import { ManagerModel } from "../../../model/manager.model";
import mockManager from "../../../mock/manager";
import AutoCompleteItem from "../../../components/auto-complete-item";
import { ACCEPTED_IMAGE_TYPES } from "../../../const/file.const";
import {
  addressSchema,
  emailSchema,
  fileUploadSchema,
  imageTypeSchema,
  phoneSchema,
  nameSchema,
} from "../../../validation/field.schema";
import { BranchModel } from "../../../model/branch.model";

/**
 * Entity model to be sent to server.
 * This type omits the generated fields of the server (id, logo).
 */
type branchEntity = Omit<BranchModel, "id" | "logo"> & {
  logo?: File;
};

/**
 * Component props
 * `onSave()` will trigger with the data from the form.
 */
type CreateBranchPropsType = {
  onSave?: (branchData: branchEntity) => void;
};

const CreateBranch = ({ onSave }: CreateBranchPropsType) => {
  // schema validation
  const createSchema = z.object({
    name: nameSchema,
    email: emailSchema,
    phone: phoneSchema,
    manager: z.number().min(1),
    address: addressSchema,
    logo: fileUploadSchema.and(imageTypeSchema),
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof createSchema>>({
    resolver: zodResolver(createSchema),
    mode: "onBlur",
  });

  const { data: availableManager, isLoading: managerLoading } = useQuery<
    SelectItemGeneric<ManagerModel>[]
  >(["available-manager"], async () => {
    const manager = await mockManager();
    return manager.map((m) => ({
      ...m,
      // add fields of SelectItemGeneric
      value: String(m.id),
      label: m.name,
      description: m.phone,
    }));
  });

  return (
    <form onSubmit={onSave && handleSubmit(onSave)} className={"flex flex-col"}>
      <TextInput
        label={"Branch Name"}
        description={
          <small className="mb-2 leading-tight text-gray-500">
            Please naming the branch according to{" "}
            <Link href={"/404"}>
              <a className="inline text-blue-600 underline">the rules</a>
            </Link>
          </small>
        }
        placeholder={"enter the branch name..."}
        required
        {...register("name")}
      ></TextInput>
      <FormErrorMessage errors={errors} name={"name"} />

      <Controller
        render={({ field }) => (
          <Select
            data={!availableManager || managerLoading ? [] : availableManager}
            placeholder={"branch's manager name..."}
            label={"Manager Name"}
            searchable
            itemComponent={AutoCompleteItem}
            nothingFound="No options"
            maxDropdownHeight={200}
            onChange={(v) => field.onChange(Number(v))}
            onBlur={field.onBlur}
            required
          />
        )}
        name={"manager"}
        control={control}
      />
      <FormErrorMessage errors={errors} name={"manager"} />

      <Textarea
        label={"Branch's Address"}
        autosize={false}
        rows={4}
        placeholder={"the address of the branch..."}
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
          <Input.Wrapper required id={"phone"} label={"Phone number"}>
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
        {...register("email")}
      />
      <FormErrorMessage errors={errors} name={"email"} />

      <label htmlFor="file" className="text-[14px] text-gray-900">
        Branch Logo <span className="text-red-500">*</span>
      </label>
      <small className="mb-1 text-[12px] leading-tight text-gray-400">
        The logo must be less than 5MB, in *.PNG, *.JPEG, or *.WEBP format.
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
            btnTitle={"Upload..."}
            render={(f) =>
              (f && (
                <>
                  <Text size="xs" align="left">
                    Picked file: {f.name}
                  </Text>
                  <Image
                    width={160}
                    height={160}
                    radius="md"
                    src={URL.createObjectURL(f)}
                    alt="Logo image"
                    className="mt-2 select-none rounded-lg border object-cover shadow-xl"
                  />
                </>
              )) ?? <></>
            }
          />
        )}
      />
      <FormErrorMessage errors={errors} name={"logo"} />

      <Divider my={16} />

      <Button
        disabled={!isValid}
        type={"submit"}
        variant={"filled"}
        color={"green"}
        leftIcon={<IconPlus />}
      >
        Create
      </Button>
    </form>
  );
};

export default CreateBranch;
