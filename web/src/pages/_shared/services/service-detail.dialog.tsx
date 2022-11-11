import { FC, FormEvent } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import dayjs from "dayjs";
import {
  Button,
  Divider,
  Image as MantineImage,
  NumberInput,
  Table,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import DialogDetailAction from "../../../components/dialog-detail-action";
import FormErrorMessage from "../../../components/form-error-message";
import { DatePicker } from "@mantine/dates";
import { IconPercentage, IconPlus } from "@tabler/icons";
import BtnSingleUploader from "../../../components/btn-single-uploader";
import { ACCEPTED_IMAGE_TYPES } from "../../../const/file.const";
import { MAX_PRICE } from "../../../const/_const";
import {
  formatterNumberInput,
  parserNumberInput,
} from "../../../utilities/fn.helper";
import ProductInServiceRowTable from "./_partial/product-in-service-row.table";
import ProductInServiceHeaderTable from "./_partial/product-in-service-header.table";
import { getServiceModelSchema } from "../../../validation/service-model.schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { stateInputProps } from "../../../utilities/mantine.helper";
import { DialogSubmit } from "../../../utilities/form-data.helper";

type DetailDialogProps = {
  readOnly?: boolean;
  mode: "view" | "create";

  validateSchema: ReturnType<typeof getServiceModelSchema>;
  defaultValue?: z.infer<ReturnType<typeof getServiceModelSchema>>;

  title: string;
  onFormReset?: () => void;
  onFormSubmit?: (d: z.infer<ReturnType<typeof getServiceModelSchema>>) => void;
};

const ServiceDetailDialog: FC<DetailDialogProps> = ({
  readOnly,
  mode,
  title,
  validateSchema,
  defaultValue,
  onFormSubmit,
  onFormReset,
}) => {
  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isDirty, isValid, dirtyFields },
  } = useForm<z.infer<typeof validateSchema>>({
    resolver: zodResolver(validateSchema),
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: defaultValue,
  });

  const {
    fields: productsArray,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "products",
  });

  const handleReset = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    reset();
    onFormReset && onFormReset();
  };

  return (
    <fieldset
      className={`rounded-[4px] border-2 ${
        mode === "view" && isDirty ? "border-yellow-600" : "border-transparent"
      }`}
      disabled={readOnly}
    >
      <h2 className={"m-4 text-xl font-semibold uppercase"}>{title}</h2>

      <form
        className="flex w-[800px] flex-wrap p-4"
        onReset={handleReset}
        onSubmit={
          onFormSubmit &&
          handleSubmit(
            DialogSubmit(mode, dirtyFields, onFormSubmit, {
              id: defaultValue?.id ?? undefined,
            })
          )
        }
      >
        <div className="flex flex-1 flex-col">
          <h2
            className={
              "mb-2 select-none border-l pl-2 text-lg font-semibold uppercase text-gray-500"
            }
          >
            Information
          </h2>
          <TextInput
            {...stateInputProps("Service Name", readOnly, {
              required: true,
              variant: "default",
            })}
            {...register("name")}
          />
          <FormErrorMessage errors={errors} name={"name"} />

          <Textarea
            {...stateInputProps("Description", readOnly, {
              required: true,
              variant: "default",
              size: "sm",
            })}
            {...register("description")}
          />
          <FormErrorMessage errors={errors} name={"description"} />

          <Controller
            name={"duration"}
            control={control}
            render={({ field }) => (
              <NumberInput
                placeholder={"perform duration (1 - 90 minutes)..."}
                hideControls
                min={1}
                precision={0}
                step={1}
                max={90}
                defaultValue={field.value ?? undefined}
                onChange={(v) => field.onChange(v ?? null)}
                onBlur={field.onBlur}
                rightSectionWidth={75}
                rightSection={
                  <Text color={"dimmed"} size={"sm"}>
                    minutes
                  </Text>
                }
                {...stateInputProps("Service Duration", readOnly, {
                  required: true,
                  variant: "default",
                  size: "sm",
                })}
              />
            )}
          ></Controller>
          <FormErrorMessage errors={errors} name={"duration"} />

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
                onChange={(e) => {
                  field.onChange(e);
                  field.onBlur();
                }}
                defaultValue={field.value}
                onBlur={field.onBlur}
                {...stateInputProps("Discount start at", readOnly, {
                  variant: "default",
                  size: "sm",
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
                minDate={dayjs(new Date()).toDate()}
                placeholder={"must after discount start date"}
                onChange={(e) => {
                  field.onChange(e);
                  field.onBlur();
                }}
                defaultValue={field.value}
                onBlur={field.onBlur}
                {...stateInputProps("Discount End at", readOnly, {
                  variant: "default",
                  size: "sm",
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
                placeholder={"sale percentage..."}
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
                {...stateInputProps("Discount Percent", readOnly, {
                  required: true,
                  variant: "default",
                  size: "sm",
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
            Service Image <span className="text-red-500">*</span>
          </label>
          <small className="mb-1 text-[12px] leading-tight text-gray-400">
            The image must be less than 5MB, in *.PNG, *.JPEG, or *.WEBP format.
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
                      src={f ? URL.createObjectURL(f) : (field.value as string)}
                      alt="Product image"
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
                placeholder={"price of the product..."}
                hideControls
                min={0}
                max={MAX_PRICE}
                defaultValue={field.value}
                onChange={(v) => field.onChange(v)}
                onBlur={field.onBlur}
                parser={parserNumberInput}
                formatter={formatterNumberInput}
                rightSection={<span className={"text-xs"}>VND</span>}
                {...stateInputProps("Product Price", readOnly, {
                  required: true,
                  variant: "default",
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
            Products
            <small className={"block w-full text-xs text-gray-400"}>
              Product included in the service
            </small>
          </h2>
          <Table className={"table-fixed"}>
            <ProductInServiceHeaderTable />
            <tbody>
              {productsArray.map((item, index) => (
                <ProductInServiceRowTable
                  control={control}
                  key={item.id}
                  field={item}
                  index={index}
                  remove={remove}
                  errors={errors}
                  register={register}
                  readonly={readOnly}
                />
              ))}
              <tr className={"border-b"}>
                <td colSpan={7}>
                  {!readOnly && (
                    <Button
                      onClick={() =>
                        append({
                          productId: null as unknown as number,
                          usage: 0,
                        })
                      }
                      leftIcon={<IconPlus />}
                      color={"green"}
                      fullWidth
                    >
                      Product
                    </Button>
                  )}
                </td>
              </tr>
            </tbody>
          </Table>
        </div>

        <div className="mt-4 flex w-full justify-end">
          <DialogDetailAction
            mode={mode ?? "view"}
            isDirty={isDirty}
            isValid={isValid}
          />
        </div>
      </form>
    </fieldset>
  );
};

export default ServiceDetailDialog;
