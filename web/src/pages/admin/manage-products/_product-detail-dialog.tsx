import {
  ProductCreateEntity,
  ProductModel,
  ProductUpdateEntity,
} from "../../../model/product.model";
import { FormEvent, useState } from "react";
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
import FormErrorMessage from "../../../components/form-error-message";
import { z } from "zod";
import {
  amountPerUnitSchema,
  descriptionSchema,
  fileUploadSchema,
  idDbSchema,
  imageTypeSchema,
  nameSchema,
  refineSaleSchema,
  saleSchema,
  unitProductSchema,
} from "../../../validation/field.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import BtnSingleUploader from "../../../components/btn-single-uploader";
import { ACCEPTED_IMAGE_TYPES } from "../../../const/file.const";
import { DatePicker } from "@mantine/dates";
import dayjs from "dayjs";
import { IconPercentage } from "@tabler/icons";
import {
  formatterNumberInput,
  parserNumberInput,
  rawToAutoItem,
} from "../../../utilities/fn.helper";
import { MAX_PRICE } from "../../../const/_const";
import { DialogProps } from "../../../interfaces/dialog-detail-props.interface";
import DialogDetailAction from "../../../components/dialog-detail-action";
import { useQuery } from "@tanstack/react-query";
import { SupplierModel } from "../../../model/supplier.model";
import DatabaseSearchSelect from "../../../components/database-search.select";
import { AutoCompleteItemProp } from "../../../components/auto-complete-item";
import {
  getListSupplier,
  getSupplierById,
} from "../../../services/supplier.service";
import { DialogSubmit } from "../../../utilities/form-data.helper";

const ProductDetailDialog = ({
  data,
  opened,
  onClosed,
  mode,
}: DialogProps<
  ProductModel<SupplierModel>,
  ProductUpdateEntity,
  ProductCreateEntity
>) => {
  const [selectedSupplier, setSelectedSupplier] = useState<number | null>(
    data?.supplier.id ?? null
  );
  const idSchema = mode === "create" ? idDbSchema.optional() : idDbSchema;
  const imageSchema =
    mode === "create"
      ? fileUploadSchema.and(imageTypeSchema).nullable().optional()
      : fileUploadSchema
          .and(imageTypeSchema)
          .or(z.string().url())
          .nullable()
          .optional();
  const schema = z
    .object({
      id: idSchema,
      name: nameSchema,
      description: descriptionSchema,
      unit: unitProductSchema,
      dose: amountPerUnitSchema,
      supplier: idDbSchema,
      image: imageSchema,
    })
    .extend(saleSchema.shape);
  const validateSchema = refineSaleSchema(schema);

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
            supplier: data.supplier.id,
          }
        : undefined,
  });

  const handleReset = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    reset();
    onClosed && onClosed();
  };

  const fnHelper = (s: SupplierModel) => ({
    id: s.id,
    name: s.name,
    description: s.address,
  });

  const { data: viewingSupplier, isLoading: viewLoading } =
    useQuery<SupplierModel | null>(
      ["available-supplier", selectedSupplier],
      () => {
        if (selectedSupplier === undefined || selectedSupplier === null) {
          return null;
        }
        return getSupplierById(selectedSupplier);
      }
    );

  async function searchSupplier(
    supplierName: string
  ): Promise<AutoCompleteItemProp<SupplierModel>[]> {
    const response = await getListSupplier(1, 50, { name: supplierName });
    return response.data.map((i) => rawToAutoItem(i, fnHelper));
  }

  return (
    <Modal
      onClose={() => reset()}
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
          {mode === "view" ? "Product Detail" : "Create Product"}
        </h2>
        <form
          onReset={handleReset}
          onSubmit={handleSubmit(
            DialogSubmit(mode, dirtyFields, onClosed, data)
          )}
          className={`flex w-[800px] flex-wrap space-x-4 p-4`}
        >
          <div className="flex flex-1 flex-col">
            <h2
              className={
                "mb-2 select-none border-l pl-2 text-lg font-semibold uppercase text-gray-500"
              }
            >
              Information
            </h2>
            <TextInput required label={"Product Name"} {...register("name")} />
            <FormErrorMessage errors={errors} name={"name"} />

            <Textarea
              required
              label={"Description"}
              {...register("description")}
            />
            <FormErrorMessage errors={errors} name={"description"} />

            <div className="flex space-x-1">
              <div className="flex-1">
                <Controller
                  name={"dose"}
                  control={control}
                  render={({ field }) => (
                    <NumberInput
                      placeholder={"amount of quantity per unit"}
                      defaultValue={field.value}
                      label={"Product Dose"}
                      onChange={(v) => field.onChange(v)}
                      onBlur={field.onBlur}
                      hideControls
                    />
                  )}
                ></Controller>
                <FormErrorMessage errors={errors} name={"dose"} />
              </div>

              <div className="w-50">
                <TextInput
                  required
                  label={"Unit Type"}
                  placeholder={"g, ml, etc..."}
                  {...register("unit")}
                />
                <FormErrorMessage errors={errors} name={"unit"} />
              </div>
            </div>

            <label
              htmlFor="supplier"
              className="text-[14px] font-[500] text-gray-900"
            >
              Product Supplier <span className="text-red-500">*</span>
            </label>
            {viewLoading ? (
              <>loading...</>
            ) : (
              <Controller
                render={({ field: ControlledField }) => (
                  <DatabaseSearchSelect
                    value={selectedSupplier ? String(selectedSupplier) : null}
                    displayValue={
                      viewingSupplier
                        ? {
                            ...rawToAutoItem(viewingSupplier, fnHelper),
                            disabled: true,
                          }
                        : null
                    }
                    onSearching={searchSupplier}
                    onSelected={(_id) => {
                      const id = _id ? Number(_id) : null;
                      ControlledField.onChange(id);
                      setSelectedSupplier(id);
                    }}
                  />
                )}
                control={control}
                name={"supplier"}
              />
            )}
            <FormErrorMessage errors={errors} name={"supplier"} />

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

          <Divider orientation={"vertical"} />

          <div className="flex w-48 flex-col">
            <label
              htmlFor="file"
              className="text-[14px] font-[500] text-gray-900"
            >
              Product Image <span className="text-red-500">*</span>
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

export default ProductDetailDialog;
