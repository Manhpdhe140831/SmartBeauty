import {
  ProductCreateEntity,
  ProductModel,
  ProductUpdateEntity,
} from "../../../model/product.model";
import { FormEvent, useEffect, useState } from "react";
import {
  Button,
  Divider,
  Image,
  Modal,
  NumberInput,
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
import { stateInputProps } from "../../../utilities/mantine.helper";
import ImageUpload from "../../../components/image-upload";
import { linkImage } from "../../../utilities/image.helper";
import { USER_ROLE } from "../../../const/user-role.const";
import { useAuthUser } from "../../../store/auth-user.state";

const ProductDetailDialog = ({
  data,
  opened,
  onClosed,
  mode,
  readonly,
  onDeleted,
}: DialogProps<
  ProductModel<SupplierModel>,
  ProductUpdateEntity,
  ProductCreateEntity
>) => {
  const userRole = useAuthUser((s) => s.user?.role);
  const [selectedSupplier, setSelectedSupplier] = useState<number | null>(
    data?.supplier.id ?? null
  );
  const idSchema = mode === "create" ? idDbSchema.optional() : idDbSchema;
  const imageSchema =
    mode === "create"
      ? fileUploadSchema.and(imageTypeSchema).nullable().optional()
      : fileUploadSchema
          .and(imageTypeSchema)
          .or(z.string())
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
            supplier: data.supplier.id,
          }
        : undefined,
  });

  const handleReset = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onClosed && onClosed();
  };

  const fnHelper = (s: SupplierModel) => ({
    id: s.id,
    name: s.name,
    description: s.address,
  });

  useEffect(() => {
    if (isDirty) {
      trigger("discountStart");
      trigger("discountEnd");
      trigger("discountPercent");
    }
  }, [isDirty]);

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
      <fieldset
        disabled={readonly}
        className={`rounded-[4px] border-2 ${
          mode === "view" && isDirty
            ? "border-yellow-600"
            : "border-transparent"
        }`}
      >
        <h2 className={"m-4 text-xl font-semibold uppercase"}>
          {mode === "view" ? "Chi ti???t s???n ph???m" : "T???o s???n ph???m"}
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
              Th??ng tin
            </h2>
            <TextInput
              {...register("name")}
              {...stateInputProps("T??n s???n ph???m", readonly, {
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

            <div className="flex space-x-1">
              <div className="flex-1">
                <Controller
                  name={"dose"}
                  control={control}
                  render={({ field }) => (
                    <NumberInput
                      defaultValue={field.value}
                      onChange={(v) => field.onChange(v)}
                      onBlur={field.onBlur}
                      hideControls
                      max={10000}
                      {...stateInputProps("Li???u L?????ng", readonly, {
                        required: true,
                        size: "sm",
                        placeholder: "tr??n m???i ????n v???...",
                      })}
                    />
                  )}
                ></Controller>
                <FormErrorMessage errors={errors} name={"dose"} />
              </div>

              <div className="w-50">
                <TextInput
                  {...register("unit")}
                  {...stateInputProps("????n v???/l?????ng", readonly, {
                    required: true,
                    size: "sm",
                    placeholder: "g, ml, etc...",
                  })}
                />
                <FormErrorMessage errors={errors} name={"unit"} />
              </div>
            </div>

            <label
              htmlFor="supplier"
              className="text-[14px] font-[500] text-gray-900"
            >
              ????n v??? cung ???ng<span className="text-red-500">*</span>
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
                    {...stateInputProps(undefined, readonly, {
                      required: true,
                      size: "sm",
                    })}
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
              S??? ki???n khuy???n m??i
              <small className={"block w-full text-xs text-gray-400"}>
                Kh??ng b???t bu???c
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
                  {...stateInputProps("Ng??y b???t ?????u khuy???n m??i", readonly, {
                    size: "sm",
                    placeholder: "Ph???i sau h??m nay",
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
                  {...stateInputProps("Ng??y k???t th??c khuy???n m??i", readonly, {
                    size: "sm",
                    placeholder: "ph???i sau ng??y b???t ?????u",
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
                    placeholder: "5%, 10%...",
                  })}
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
              ???nh s???n ph???m <span className="text-red-500">*</span>
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
                      alt="product image"
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
                  {...stateInputProps("Gi?? s???n ph???m", readonly, {
                    required: true,
                    size: "lg",
                    placeholder: "xxxxxx",
                  })}
                />
              )}
            ></Controller>
            <FormErrorMessage errors={errors} name={"price"} />
          </div>

          <div className="!ml-0 mt-4 flex w-full flex-row justify-between">
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

export default ProductDetailDialog;
