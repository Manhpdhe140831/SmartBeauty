import { FC, FormEvent, useEffect } from "react";
import { DialogProps } from "../../../interfaces/dialog-detail-props.interface";
import { CourseModel, CourseUpdateEntity } from "../../../model/course.model";
import {
  Button,
  Divider,
  Image,
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
import { MAX_PRICE } from "../../../const/_const";
import {
  formatterNumberInput,
  parserNumberInput,
} from "../../../utilities/fn.helper";
import ServiceInCourseTable from "./_partial/service-in-course.table";
import { formatTime } from "../../../utilities/time.helper";
import { DialogSubmit } from "../../../utilities/form-data.helper";
import { ServiceModel } from "../../../model/service.model";
import { stateInputProps } from "../../../utilities/mantine.helper";
import ImageUpload from "../../../components/image-upload";
import { linkImage } from "../../../utilities/image.helper";
import { USER_ROLE } from "../../../const/user-role.const";
import { useAuthUser } from "../../../store/auth-user.state";

const CourseDetailDialog: FC<
  DialogProps<CourseModel<ServiceModel>, CourseUpdateEntity, CourseUpdateEntity>
> = ({ data, opened, onClosed, mode, readonly, onDeleted }) => {
  const userRole = useAuthUser((s) => s.user?.role);
  const validateSchema = getCourseModelSchema(mode);

  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    formState: { errors, isDirty, isValid, dirtyFields },
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
          services: data.services.map((s) => s.id),
        }
        : undefined,
  });

  const handleReset = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    reset();
    onClosed && onClosed();
  };

  const onSubmit = (submitData: z.infer<typeof validateSchema>) =>
    DialogSubmit(mode, dirtyFields, onClosed, data)(submitData);

  useEffect(() => {
    if (isDirty) {
      trigger("discountStart");
      trigger("discountEnd");
      trigger("discountPercent");
      trigger("services");
    }
  }, [isDirty]);

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
      <fieldset
        disabled={readonly}
        className={`rounded-[4px] border-2 ${mode === "view" && isDirty
            ? "border-yellow-600"
            : "border-transparent"
          }`}
      >
        <h2 className={"m-4 text-xl font-semibold uppercase"}>
          {mode === "view" ? "Chi ti???t Li???u Tr??nh" : "T???o Li???u Tr??nh"}
        </h2>

        <form
          onReset={handleReset}
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-[800px] flex-wrap p-4"
        >
          <div className="flex flex-1 flex-col">
            <h2
              className={
                "mb-2 select-none border-l pl-2 text-lg font-semibold uppercase text-gray-500"
              }
            >
              Th??ng Tin
            </h2>
            <TextInput
              {...register("name")}
              {...stateInputProps("T??n li???u tr??nh", readonly, {
                required: true,
                size: "sm",
              })}
            />
            <FormErrorMessage errors={errors} name={"name"} />

            <Textarea
              {...register("description")}
              {...stateInputProps("Mi??u t???", readonly, {
                required: true,
                size: "sm",
              })}
            />
            <FormErrorMessage errors={errors} name={"description"} />

            <div className="flex space-x-2">
              <div className="flex w-64 flex-col">
                <label
                  htmlFor="timeOfUse"
                  className="text-[14px] font-[500] text-gray-900"
                >
                  S??? l???n <span className="text-red-500">*</span>
                </label>
                <small className="mb-1 text-[12px] leading-[1.2] text-gray-400">
                  S??? l???ch h???n c?? th??? v???i m???t li???u tr??nh
                </small>
                <Controller
                  name={"timeOfUse"}
                  control={control}
                  render={({ field }) => (
                    <NumberInput
                      hideControls
                      min={0}
                      max={99}
                      defaultValue={field.value}
                      onChange={(v) => field.onChange(v)}
                      onBlur={field.onBlur}
                      step={1}
                      {...stateInputProps(undefined, readonly, {
                        required: true,
                        size: "sm",
                        placeholder: "1, 2, ...",
                      })}
                    />
                  )}
                ></Controller>
                <FormErrorMessage errors={errors} name={"timeOfUse"} />
              </div>

              <div className="flex flex-1 flex-col">
                <label
                  htmlFor="duration"
                  className="text-[14px] font-[500] text-gray-900"
                >
                  Th???i l?????ng <span className="text-red-500">*</span>
                </label>
                <small className="mb-1 text-[12px] leading-[1.2] text-gray-400">
                  s??? ng??y li???u tr??nh s??? k??o d??i
                </small>
                <Controller
                  name={"duration"}
                  control={control}
                  render={({ field }) => (
                    <NumberInput
                      hideControls
                      min={0}
                      max={9999}
                      defaultValue={field.value}
                      onChange={(v) => field.onChange(v)}
                      onBlur={field.onBlur}
                      step={1}
                      className={"flex-1"}
                      {...stateInputProps(undefined, readonly, {
                        required: true,
                        size: "sm",
                        placeholder: "31, 60 ng??y...",
                      })}
                      rightSection={
                        field.value && (
                          <div className={"w-full px-4 text-right"}>
                            <Text size={"xs"} color={"dimmed"}>
                              ~ {formatTime(field.value, "day")}
                            </Text>
                          </div>
                        )
                      }
                      rightSectionWidth={150}
                    />
                  )}
                ></Controller>
                <FormErrorMessage errors={errors} name={"duration"} />
              </div>
            </div>

            <Divider my={8} />

            <h2
              className={
                "mb-2 select-none border-l pl-2 text-lg font-semibold uppercase text-gray-500"
              }
            >
              S??? ki???n khuy???n m??i
              <small className={"block w-full text-xs text-gray-400"}>
                m???c t??y ch???n
              </small>
            </h2>

            <Controller
              render={({ field }) => (
                <DatePicker
                  locale={"vi"}
                  minDate={dayjs(new Date()).toDate()}
                  onChange={(e) => {
                    field.onChange(e);
                    field.onBlur();
                  }}
                  defaultValue={field.value}
                  onBlur={field.onBlur}
                  {...stateInputProps("Th???i gian b???t ?????u", readonly, {
                    required: true,
                    size: "sm",
                    placeholder: "ph???i sau hi???n t???i",
                  })}
                />
              )}
              name={"discountStart"}
              control={control}
            />
            <FormErrorMessage errors={errors} name={"discountStart"} />

            <Controller
              render={({ field }) => (
                <DatePicker
                  locale={"vi"}
                  minDate={dayjs(new Date()).toDate()}
                  onChange={(e) => {
                    field.onChange(e);
                    field.onBlur();
                  }}
                  defaultValue={field.value}
                  onBlur={field.onBlur}
                  {...stateInputProps("Th???i gian k???t th??c", readonly, {
                    required: true,
                    size: "sm",
                    placeholder: "ph???i sau ng??y b???t ?????u...",
                  })}
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
                  hideControls
                  min={0}
                  precision={2}
                  step={0.05}
                  max={100}
                  defaultValue={field.value ?? undefined}
                  onChange={(v) => field.onChange(v ?? null)}
                  onBlur={field.onBlur}
                  rightSection={
                    <IconPercentage color={"#939393"} className={"mr-2"} />
                  }
                  {...stateInputProps("% Gi???m gi??", readonly, {
                    required: true,
                    size: "sm",
                    placeholder: "5, 10, ...",
                  })}
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
              ???nh minh h???a <span className="text-red-500">*</span>
            </label>
            <small className="mb-1 text-[12px] leading-tight text-gray-400">
              ???nh ??t h??n 5mb, ?????nh d???ng PNG, JPEG, WEBG
            </small>
            <Controller
              name={"image"}
              control={control}
              render={({ field }) => (
                <ImageUpload
                  onChange={(f) => {
                    field.onChange(f);
                    field.onBlur();
                  }}
                  defaultSrc={field.value as string}
                  render={(file) => (
                    <Image
                      radius={4}
                      width={160}
                      height={160}
                      fit={"cover"}
                      className={"rounded border"}
                      src={linkImage(file)}
                      alt="???nh li???u tr??nh"
                    />
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
                  hideControls
                  min={0}
                  max={MAX_PRICE}
                  defaultValue={field.value}
                  onChange={(v) => field.onChange(v)}
                  onBlur={field.onBlur}
                  parser={parserNumberInput}
                  formatter={formatterNumberInput}
                  rightSection={<span className={"text-xs"}>VND</span>}
                  {...stateInputProps("Gi?? ti???n", readonly, {
                    required: true,
                    size: "lg",
                  })}
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
              Danh s??ch d???ch v???
              <small className={"block w-full text-xs text-gray-400"}>
                D???ch v??? ??i k??m
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
                  readonly={readonly === true}
                />
              )}
              name={"services"}
              control={control}
            />
          </div>

          <div className="!ml-0 mt-4 flex w-full justify-between">
            <div>
              {mode === "view" && onDeleted && userRole === USER_ROLE.admin && (
                <Button
                  type={"button"}
                  onClick={() => onDeleted()}
                  variant={"subtle"}
                  color={"red"}
                >
                  X??a s???n ph???m
                </Button>
              )}
            </div>

            {!readonly ? (
              <DialogDetailAction
                mode={mode}
                isDirty={isDirty && Object.keys(dirtyFields).length > 0}
                isValid={isValid}
                readonly={readonly}
              />
            ) : (
              <div
                className={
                  "cursor-pointer rounded bg-blue-500 px-6 py-2 font-semibold text-white hover:bg-blue-600"
                }
                onClick={() => onClosed()}
              >
                H???y
              </div>
            )}
          </div>
        </form>
      </fieldset>
    </Modal>
  );
};

export default CourseDetailDialog;
