import { FC, FormEvent } from "react";
import { DialogProps } from "../../../interfaces/dialog-detail-props.interface";
import { CourseModel, CourseUpdateEntity } from "../../../model/course.model";
import {
  Divider,
  Modal,
  NumberInput,
  Textarea,
  TextInput,
} from "@mantine/core";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import DialogDetailAction from "../../../components/dialog-detail-action";
import FormErrorMessage from "../../../components/form-error-message";
import { DatePicker } from "@mantine/dates";
import dayjs from "dayjs";
import { IconPercentage } from "@tabler/icons";
import { getCourseModelSchema } from "../../../validation/course.schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const CourseDetailDialog: FC<
  DialogProps<CourseModel, CourseUpdateEntity, CourseUpdateEntity>
> = ({ data, opened, onClosed, mode }) => {
  const validateSchema = getCourseModelSchema(mode);

  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<z.infer<typeof validateSchema>>({
    resolver: zodResolver(validateSchema),
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues:
      mode === "view" && data
        ? {
            ...data,
            discountStart: data.discountStart
              ? dayjs(data.discountStart).toDate()
              : null,
            discountEnd: data.discountEnd
              ? dayjs(data.discountEnd).toDate()
              : null,
            discountPercent: data.discountPercent ?? null,
          }
        : undefined,
  });

  const {
    fields: servicesArray,
    append,
    update,
    remove,
  } = useFieldArray<
    z.infer<typeof validateSchema> & {
      services: z.ZodArray<z.ZodNumber, "atleastone">;
    },
    "services"
  >({
    control,
    name: "services",
  });

  const handleReset = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    reset();
    onClosed && onClosed();
  };

  return (
    <Modal
      onClose={() => {
        onClosed && onClosed();
        reset();
      }}
      opened={opened}
      closeOnClickOutside={false}
      withCloseButton={false}
      size={"auto"}
      padding={0}
    >
      <div
        className={`rounded-[4px] border-2 ${
          mode === "view" && isDirty
            ? "border-yellow-600"
            : "border-transparent"
        }`}
      >
        <h2 className={"m-4 text-xl font-semibold uppercase"}>
          {mode === "view"
            ? "Treatment Course Detail"
            : "Treatment Course Product"}
        </h2>

        <form
          onReset={handleReset}
          onSubmit={onClosed && handleSubmit(onClosed as never)}
          className="flex w-[800px] flex-wrap p-4"
        >
          <div className="flex flex-1 flex-col">
            <h2
              className={
                "mb-2 select-none border-l pl-2 text-lg font-semibold uppercase text-gray-500"
              }
            >
              Information
            </h2>
            <TextInput required label={"Course Name"} {...register("name")} />
            <FormErrorMessage errors={errors} name={"name"} />

            <Textarea
              required
              label={"Description"}
              {...register("description")}
            />
            <FormErrorMessage errors={errors} name={"description"} />

            <Divider my={8} />

            <h2
              className={
                "mb-2 select-none border-l pl-2 text-lg font-semibold uppercase text-gray-500"
              }
            >
              Discount Event
              <small className={"block w-full text-xs text-gray-400"}>
                Optional section
              </small>
            </h2>

            <Controller
              render={({ field }) => (
                <DatePicker
                  minDate={dayjs(new Date()).toDate()}
                  placeholder={"must after today"}
                  label={"Discount start at"}
                  onChange={(e) => {
                    field.onChange(e);
                    field.onBlur();
                  }}
                  defaultValue={field.value}
                  onBlur={field.onBlur}
                />
              )}
              name={"discountStart"}
              control={control}
            />
            <FormErrorMessage errors={errors} name={"discountStart"} />

            <Controller
              render={({ field }) => (
                <DatePicker
                  minDate={dayjs(new Date()).toDate()}
                  placeholder={"must after discount start date"}
                  label={"Discount End at"}
                  onChange={(e) => {
                    field.onChange(e);
                    field.onBlur();
                  }}
                  defaultValue={field.value}
                  onBlur={field.onBlur}
                />
              )}
              name={"discountEnd"}
              control={control}
            />
            <FormErrorMessage errors={errors} name={"discountEnd"} />

            <Controller
              name={"discountPercent"}
              control={control}
              render={({ field }) => (
                <NumberInput
                  disabled={!watch("discountStart") && !watch("discountEnd")}
                  placeholder={"sale percentage..."}
                  withAsterisk
                  hideControls
                  min={0}
                  precision={2}
                  step={0.05}
                  max={100}
                  label={"Discount Percent"}
                  defaultValue={field.value ?? undefined}
                  onChange={(v) => field.onChange(v ?? null)}
                  onBlur={field.onBlur}
                  rightSection={
                    <IconPercentage color={"#939393"} className={"mr-2"} />
                  }
                />
              )}
            ></Controller>
            <FormErrorMessage errors={errors} name={"discountPercent"} />
          </div>

          <div className="mt-4 flex w-full justify-end">
            <DialogDetailAction
              mode={mode}
              isDirty={isDirty}
              isValid={isValid}
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CourseDetailDialog;
