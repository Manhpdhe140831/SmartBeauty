import { FC, FormEvent } from "react";
import { DialogProps } from "../../../interfaces/dialog-detail-props.interface";
import { CourseModel, CourseUpdateEntity } from "../../../model/course.model";
import {
  Divider,
  Image as MantineImage,
  Modal,
  NumberInput,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { Controller, useForm } from "react-hook-form";
import DialogDetailAction from "../../../components/dialog-detail-action";
import FormErrorMessage from "../../../components/form-error-message";
import { DatePicker } from "@mantine/dates";
import dayjs from "dayjs";
import { IconPercentage } from "@tabler/icons";
import { getCourseModelSchema } from "../../../validation/course.schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import BtnSingleUploader from "../../../components/btn-single-uploader";
import { ACCEPTED_IMAGE_TYPES } from "../../../const/file.const";
import { MAX_PRICE } from "../../../const/_const";
import {
  formatterNumberInput,
  parserNumberInput,
} from "../../../utilities/fn.helper";
import ServiceInCourseTable from "./_partial/service-in-course.table";
import { formatTime } from "../../../utilities/time.helper";

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
              : undefined,
            discountEnd: data.discountEnd
              ? dayjs(data.discountEnd).toDate()
              : undefined,
            discountPercent: data.discountPercent ?? undefined,
          }
        : undefined,
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

            <div className="flex space-x-2">
              <div className="flex w-64 flex-col">
                <label
                  htmlFor="timeOfUse"
                  className="text-[14px] font-[500] text-gray-900"
                >
                  Time of use <span className="text-red-500">*</span>
                </label>
                <small className="mb-1 text-[12px] leading-[1.2] text-gray-400">
                  amount of treatment in the course
                </small>
                <Controller
                  name={"timeOfUse"}
                  control={control}
                  render={({ field }) => (
                    <NumberInput
                      placeholder={"2,3 times..."}
                      hideControls
                      min={0}
                      max={99}
                      required
                      defaultValue={field.value}
                      onChange={(v) => field.onChange(v)}
                      onBlur={field.onBlur}
                      step={1}
                    />
                  )}
                ></Controller>
                <FormErrorMessage errors={errors} name={"timeOfUse"} />
              </div>

              <div className="flex flex-1 flex-col">
                <label
                  htmlFor="expireIn"
                  className="text-[14px] font-[500] text-gray-900"
                >
                  Course Duration <span className="text-red-500">*</span>
                </label>
                <small className="mb-1 text-[12px] leading-[1.2] text-gray-400">
                  treatment process in days
                </small>
                <Controller
                  name={"expireIn"}
                  control={control}
                  render={({ field }) => (
                    <div
                      className={
                        "flex items-center space-x-2 rounded border border-solid border-[#ced4da] px-2"
                      }
                    >
                      <NumberInput
                        placeholder={"31, 60 days..."}
                        hideControls
                        min={0}
                        max={9999}
                        required
                        defaultValue={field.value}
                        onChange={(v) => field.onChange(v)}
                        onBlur={field.onBlur}
                        step={1}
                        variant={"unstyled"}
                        className={"flex-1"}
                        sx={{ input: { height: 34 } }}
                      />
                      {field.value && (
                        <Text size={"xs"} color={"dimmed"}>
                          ~ {formatTime(field.value, "day")}
                        </Text>
                      )}
                    </div>
                  )}
                ></Controller>
                <FormErrorMessage errors={errors} name={"expireIn"} />
              </div>
            </div>

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

          <Divider mx={16} orientation={"vertical"} />

          <div className="flex w-48 flex-col">
            <label
              htmlFor="file"
              className="text-[14px] font-[500] text-gray-900"
            >
              Course Image <span className="text-red-500">*</span>
            </label>
            <small className="mb-1 text-[12px] leading-tight text-gray-400">
              The image must be less than 5MB, in *.PNG, *.JPEG, or *.WEBP
              format.
            </small>
            <Controller
              name={"image"}
              control={control}
              render={({ field }) => (
                <BtnSingleUploader
                  accept={ACCEPTED_IMAGE_TYPES.join(",")}
                  onChange={(f) => {
                    field.onChange(f);
                    field.onBlur();
                  }}
                  btnPosition={"after"}
                  btnTitle={"Upload Image"}
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
                          f ? URL.createObjectURL(f) : (field.value as string)
                        }
                        alt="Course image"
                        className="mb-2 select-none rounded-lg border object-cover shadow-xl"
                      />
                    </>
                  )}
                />
              )}
            />
            <FormErrorMessage
              className={"text-sm"}
              errors={errors}
              name={"image"}
            />

            <Controller
              name={"price"}
              control={control}
              render={({ field }) => (
                <NumberInput
                  placeholder={"price of the course..."}
                  hideControls
                  min={0}
                  max={MAX_PRICE}
                  label={
                    <label
                      htmlFor="file"
                      className="text-[14px] font-[500] text-gray-900"
                    >
                      Course Price <span className="text-red-500">*</span>
                    </label>
                  }
                  defaultValue={field.value}
                  onChange={(v) => field.onChange(v)}
                  onBlur={field.onBlur}
                  size={"lg"}
                  parser={parserNumberInput}
                  formatter={formatterNumberInput}
                  rightSection={<span className={"text-xs"}>VND</span>}
                />
              )}
            ></Controller>
            <FormErrorMessage errors={errors} name={"price"} />
          </div>

          <div className="mt-4 flex w-full flex-col">
            <Divider my={8} />
            <h2
              className={
                "mb-2 select-none border-l pl-2 text-lg font-semibold uppercase text-gray-500"
              }
            >
              Products
              <small className={"block w-full text-xs text-gray-400"}>
                Product included in the service
              </small>
            </h2>

            <Controller
              render={({ field }) => (
                <ServiceInCourseTable
                  services={field.value}
                  onChange={(e) => {
                    field.onChange(e);
                    field.onBlur();
                  }}
                />
              )}
              name={"services"}
              control={control}
            />
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
