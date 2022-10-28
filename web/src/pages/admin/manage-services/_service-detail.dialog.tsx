import { FC, FormEvent } from "react";
import { DialogProps } from "../../../interfaces/dialog-detail-props.interface";
import {
  descriptionSchema,
  fileUploadSchema,
  idDbSchema,
  imageTypeSchema,
  nameSchema,
  saleSchema,
} from "../../../validation/field.schema";
import {
  ServiceCreateEntity,
  ServiceModel,
  ServiceUpdateEntity,
} from "../../../model/service.model";
import { z } from "zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import {
  Divider,
  Image as MantineImage,
  Modal,
  NumberInput,
  Table,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import DialogDetailAction from "../../../components/dialog-detail-action";
import FormErrorMessage from "../../../components/form-error-message";
import { DatePicker } from "@mantine/dates";
import { IconPercentage } from "@tabler/icons";
import BtnSingleUploader from "../../../components/btn-single-uploader";
import { ACCEPTED_IMAGE_TYPES } from "../../../const/file.const";
import { MAX_PRICE } from "../../../const/_const";
import {
  formatterNumberInput,
  parserNumberInput,
} from "../../../utilities/fn.helper";
import ProductInServiceRowTable from "./_partial/_product-in-service-row.table";

const ServiceDetailDialog: FC<
  DialogProps<ServiceModel, ServiceUpdateEntity, ServiceCreateEntity>
> = ({ data, opened, onClosed, mode }) => {
  const idSchema = mode === "create" ? idDbSchema.nullable() : idDbSchema;
  const validateSchema = z
    .object({
      id: idSchema,
      nameService: nameSchema,
      description: descriptionSchema,
      duration: z.number().min(0),
      image: fileUploadSchema
        .and(imageTypeSchema)
        .or(z.string().url())
        .nullable(),
      products: z.any(),
    })
    .extend(saleSchema.shape);

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
    fields: productsArray,
    append,
    update,
    remove,
  } = useFieldArray({
    control,
    name: "products",
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
          {mode === "view" ? "Service Detail" : "Service Product"}
        </h2>

        <form
          className="flex w-[800px] flex-wrap p-4"
          onReset={handleReset}
          onSubmit={onClosed && handleSubmit(onClosed as never)}
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
              required
              label={"Service Name"}
              {...register("nameService")}
            />
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

          <Divider mx={16} orientation={"vertical"} />

          <div className="flex w-48 flex-col">
            <label
              htmlFor="file"
              className="text-[14px] font-[500] text-gray-900"
            >
              Service Image <span className="text-red-500">*</span>
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
                  label={
                    <label
                      htmlFor="file"
                      className="text-[14px] font-[500] text-gray-900"
                    >
                      Product Price <span className="text-red-500">*</span>
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
            <Table className={"table-fixed"}>
              <colgroup>
                <col className={"w-14"} />
                <col className={"w-24"} />
                <col />
                <col className={"w-28"} />
                <col className={"w-28"} />
                <col className={"w-32"} />
                <col className={"w-14"} />
              </colgroup>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Dose</th>
                  <th>Unit</th>
                  <th>Uses</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {productsArray.map((item, index) => (
                  <ProductInServiceRowTable
                    key={item.id}
                    field={item}
                    index={index}
                    parentName={"products"}
                    remove={remove}
                    errors={errors}
                    register={register}
                  />
                ))}
              </tbody>
            </Table>
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

export default ServiceDetailDialog;
