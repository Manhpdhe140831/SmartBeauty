import {
  Button,
  Divider,
  Image as MantineImage,
  Select,
  Text,
  Textarea,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import mockManager from "../../../mock/manager";
import { BranchModel } from "../../../model/branch.model";
import { ManagerModel } from "../../../model/manager.model";
import AutoCompleteItem from "../../../components/auto-complete-item";
import FormErrorMessage from "../../../components/form-error-message";
import { SelectItemGeneric } from "../../../interfaces/select-item-generic.interface";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import {
  addressSchema,
  emailSchema,
  fileUploadSchema,
  imageTypeSchema,
  nameSchema,
  phoneSchema,
} from "../../../validation/field.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import BtnSingleUploader from "../../../components/btn-single-uploader";
import { ACCEPTED_IMAGE_TYPES } from "../../../const/file.const";

type ViewBranchPropsType = {
  branchData: BranchModel<ManagerModel>;
  onClose: <T>(branchData?: T) => void;
};

const BranchInfo = ({ branchData, onClose }: ViewBranchPropsType) => {
  const [isViewing, setIsViewing] = useState(true);

  // schema validation
  const updateSchema = z.object({
    name: nameSchema,
    email: emailSchema,
    mobile: phoneSchema,
    manager: z.number().min(1),
    address: addressSchema,
    logo: fileUploadSchema.and(imageTypeSchema).or(z.string().url()),
  });

  const {
    control,
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isValid, isDirty },
  } = useForm<z.infer<typeof updateSchema>>({
    resolver: zodResolver(updateSchema),
    mode: "onChange",
    defaultValues: { ...branchData, manager: branchData.manager.id },
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
      description: m.mobile,
    }));
  });

  const onSubmit = (data: z.infer<typeof updateSchema>) => onClose(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-[600px] space-x-4"
    >
      <div className="flex w-32 flex-col space-y-2">
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
              btnPosition={"after"}
              btnTitle={"Tải ảnh..."}
              render={(f) => (
                <>
                  {f && (
                    <Text size="xs" align="left">
                      Picked file: {f.name}
                    </Text>
                  )}
                  <MantineImage
                    width={128}
                    height={128}
                    radius="md"
                    src={f ? URL.createObjectURL(f) : (field.value as string)}
                    alt="Random unsplash image"
                    className="mb-2 select-none rounded-lg border object-cover shadow-xl"
                  />
                </>
              )}
            />
          )}
        />
        <FormErrorMessage className={"text-sm"} errors={errors} name={"logo"} />
      </div>

      <div className={"flex flex-1 flex-col"}>
        <small className={"leading-none text-gray-500"}>Chi nhánh</small>
        <h1 className={"mb-2 text-2xl font-semibold"}>{branchData.name}</h1>

        <Controller
          render={({ field }) => (
            <Select
              data={!availableManager || managerLoading ? [] : availableManager}
              placeholder={"tên người quản lý chi nhánh..."}
              label={"Tên quản lý"}
              searchable
              itemComponent={AutoCompleteItem}
              nothingFound="No options"
              maxDropdownHeight={200}
              onChange={(v) => field.onChange(Number(v))}
              onBlur={field.onBlur}
              defaultValue={String(branchData.manager.id)}
              required
            />
          )}
          name={"manager"}
          control={control}
        />
        <FormErrorMessage errors={errors} name={"address"} />

        <Textarea
          label={"Địa chỉ"}
          autosize={false}
          rows={4}
          placeholder={"địa chỉ của chi nhánh..."}
          id={"branchAddress"}
          required
          {...register("address")}
          className={"!text-black"}
        ></Textarea>
        <FormErrorMessage errors={errors} name={"address"} />

        <Button onClick={() => console.log(isValid, errors, getValues())}>
          Check error
        </Button>

        <Divider my={8} />
        <div className="flex justify-end space-x-2">
          {isDirty ? (
            <>
              <Button onClick={() => reset()} color={"red"} variant={"subtle"}>
                Hủy thay đổi
              </Button>
              <Button
                disabled={!isValid}
                type={"submit"}
                color={"green"}
                variant={"filled"}
              >
                Lưu
              </Button>
            </>
          ) : (
            <Button type={"submit"} onClick={() => onClose()}>
              Close
            </Button>
          )}
        </div>
      </div>
    </form>
  );
};

export default BranchInfo;
