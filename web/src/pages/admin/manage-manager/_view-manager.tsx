import { ManagerModel, ManagerPayload } from "../../../model/manager.model";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import BtnSingleUploader from "../../../components/btn-single-uploader";
import { ACCEPTED_IMAGE_TYPES } from "../../../const/file.const";
import {
  Button,
  Divider,
  Image as MantineImage,
  Input,
  Radio,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import FormErrorMessage from "../../../components/form-error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import MaskedInput from "react-text-mask";
import { PhoneNumberMask } from "../../../const/input-masking.const";
import { DatePicker } from "@mantine/dates";
import { GENDER } from "../../../const/gender.const";
import { managerModelSchema } from "../../../validation/account-model.schema";

type DialogProps = {
  manager: ManagerModel;
  onClosed?: (manager?: ManagerPayload) => void;
};

const ViewManagerDialog: FC<DialogProps> = ({ manager, onClosed }) => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<ManagerPayload>({
    resolver: zodResolver(managerModelSchema),
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      ...manager,
      dateOfBirth: dayjs(manager.dateOfBirth).toDate(),
    },
  });
  const onSubmit = (data: ManagerPayload) => onClosed && onClosed(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={"flex w-[500px] space-x-2"}
    >
      <div className="flex flex-col">
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
              btnPosition={"after"}
              btnTitle={"Update"}
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
                    src={
                      f
                        ? URL.createObjectURL(f)
                        : (field.value as unknown as string)
                    }
                    alt="Logo image"
                    className="mb-2 select-none rounded-lg border object-cover shadow-xl"
                  />
                  <small className="mb-1 max-w-32 text-[12px] leading-tight text-gray-400">
                    The avatar must be less than 5MB, in *.PNG, *.JPEG, or
                    *.WEBP format.
                  </small>
                </>
              )}
            />
          )}
        />
        <FormErrorMessage
          className={"text-sm"}
          errors={errors}
          name={"avatar"}
        />
      </div>

      <div className="flex flex-1 flex-col">
        <small className={"leading-none text-gray-500"}>Manager</small>
        <h1 className={"mb-2 text-2xl font-semibold"}>{manager.name}</h1>

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
          id={"address"}
          required
          {...register("address")}
          className={"!text-black"}
        ></Textarea>
        <FormErrorMessage errors={errors} name={"address"} />

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
            <Button type={"submit"} onClick={() => onClosed && onClosed()}>
              Close
            </Button>
          )}
        </div>
      </div>
    </form>
  );
};

export default ViewManagerDialog;
