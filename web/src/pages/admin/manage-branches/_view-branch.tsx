import {
  Button,
  Divider,
  Image as MantineImage,
  Input,
  Select,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import mockManager from "../../../mock/manager";
import { BranchModel, BranchPayload } from "../../../model/branch.model";
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
  mobileSchema,
  nameSchema,
} from "../../../validation/field.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import BtnSingleUploader from "../../../components/btn-single-uploader";
import { ACCEPTED_IMAGE_TYPES } from "../../../const/file.const";
import MaskedInput from "react-text-mask";
import { PhoneNumberMask } from "../../../const/input-masking.const";

type ViewBranchPropsType = {
  branchData: BranchModel<ManagerModel>;
  onClose: (branchData?: BranchPayload) => void;
};

const BranchInfo = ({ branchData, onClose }: ViewBranchPropsType) => {
  // schema validation
  const updateSchema = z.object({
    name: nameSchema,
    email: emailSchema,
    mobile: mobileSchema,
    manager: z.number().min(1),
    address: addressSchema,
    logo: fileUploadSchema.and(imageTypeSchema).or(z.string().url()),
  });

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<BranchPayload>({
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

  const onSubmit = (data: BranchPayload) => onClose(data);

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
              btnTitle={"Update Logo"}
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
                    alt="Logo image"
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
        <small className={"leading-none text-gray-500"}>Branch</small>
        <h1 className={"mb-2 text-2xl font-semibold"}>{branchData.name}</h1>

        <Controller
          render={({ field }) => (
            <Select
              data={!availableManager || managerLoading ? [] : availableManager}
              placeholder={"branch manager..."}
              label={"Branch Manager Name"}
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
        <FormErrorMessage errors={errors} name={"manager"} />

        <Textarea
          label={"Address"}
          autosize={false}
          rows={4}
          placeholder={"branch's address..."}
          id={"branchAddress"}
          required
          {...register("address")}
          className={"!text-black"}
        ></Textarea>
        <FormErrorMessage errors={errors} name={"address"} />

        {/* Manual handle Form binding because mask-input does not expose `ref` for hook*/}
        <Controller
          name={"mobile"}
          control={control}
          render={({ field }) => (
            <Input.Wrapper required id={"phone"} label={"Mobile"}>
              <Input
                component={MaskedInput}
                mask={PhoneNumberMask}
                placeholder={"012 774 9999"}
                onChange={field.onChange}
                onBlur={field.onBlur}
                defaultValue={field.value}
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

        <Divider my={8} />
        <div className="flex justify-end space-x-2">
          {isDirty ? (
            <>
              <Button onClick={() => reset()} color={"red"} variant={"subtle"}>
                Cancel
              </Button>
              <Button
                disabled={!isValid}
                type={"submit"}
                color={"green"}
                variant={"filled"}
              >
                Save
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
