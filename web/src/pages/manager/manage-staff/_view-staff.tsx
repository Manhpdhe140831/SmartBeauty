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
import { StaffModel, StaffPayload } from "../../../model/staff.model";
  
  type ViewStaffPropsType = {
    staffData: StaffModel<ManagerModel>;
    onClose: (staffData?: StaffPayload) => void;
  };
  
  const StaffInfo = ({ staffData, onClose }: ViewStaffPropsType) => {
    // schema validation
    const updateSchema = z.object({
      name: nameSchema,
      Role: nameSchema,
      PhoneNumber: nameSchema
    });
  
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
  
    const onSubmit = (data: StaffPayload) => onClose();
  
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
          <h1 className={"mb-2 text-2xl font-semibold"}>{staffData.name}</h1>
  
          
          <FormErrorMessage errors={errors} name={"manager"} />
  
         
          <FormErrorMessage errors={errors} name={"address"} />
  
          {/* Manual handle Form binding because mask-input does not expose `ref` for hook*/}
        
          <FormErrorMessage errors={errors} name={"phone"} />
  
          <FormErrorMessage errors={errors} name={"email"} />
  
          
        </div>
      </form>
    );
  };
  
  export default StaffInfo;
  