import { ProductModel } from "../../../model/product.model";
import { FC } from "react";
import {
  Button,
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
  priceSchema,
  saleSchema,
  unitProductSchema,
} from "../../../validation/field.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import BtnSingleUploader from "../../../components/btn-single-uploader";
import { ACCEPTED_IMAGE_TYPES } from "../../../const/file.const";
import { DatePicker } from "@mantine/dates";
import dayjs from "dayjs";
import { IconPercentage } from "@tabler/icons";

type DialogProps = {
  product: ProductModel;
  opened: boolean;
  onClosed?: (withUpdate?: ProductModel) => void;
};

const ProductDetailDialog: FC<DialogProps> = ({
  product,
  opened,
  onClosed,
}) => {
  const validateSchema = z
    .object({
      id: idDbSchema,
      name: nameSchema,
      description: descriptionSchema,
      unitType: unitProductSchema,
      quantity: amountPerUnitSchema,
      price: priceSchema,
      provider: idDbSchema,
      image: fileUploadSchema.and(imageTypeSchema).or(z.string().url()),
    })
    .extend(saleSchema.shape);

  const {
    control,
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<z.infer<typeof validateSchema>>({
    resolver: zodResolver(validateSchema),
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      ...product,
      discountStart: product.discountStart
        ? dayjs(product.discountStart).toDate()
        : null,
      discountEnd: product.discountEnd
        ? dayjs(product.discountEnd).toDate()
        : null,
      salePercent: product.salePercent ?? null,
    },
  });

  return (
    <Modal
      title={<h2 className={"text-xl font-semibold"}>Product Detail</h2>}
      onClose={() => onClosed && onClosed()}
      opened={opened}
      closeOnClickOutside={false}
      size={"auto"}
    >
      <form className="flex w-[800px] flex-wrap space-x-4">
        <div className="flex flex-1 flex-col">
          <h2
            className={
              "mb-2 select-none border-l pl-2 text-lg font-semibold uppercase text-gray-500"
            }
          >
            Information
          </h2>
          <TextInput required label={"Product Name"} {...register("name")} />
          <FormErrorMessage errors={errors} name={""} />

          <Textarea
            required
            label={"Description"}
            {...register("description")}
          />
          <FormErrorMessage errors={errors} name={"description"} />

          <div className="flex space-x-1">
            <div className="flex-1">
              <Controller
                name={"quantity"}
                control={control}
                render={({ field }) => (
                  <NumberInput
                    placeholder={"amount of quantity per unit"}
                    defaultValue={field.value}
                    label={"Product quantity"}
                    onChange={(v) => field.onChange(v)}
                    onBlur={field.onBlur}
                    hideControls
                  />
                )}
              ></Controller>
            </div>

            <div className="w-40">
              <TextInput
                required
                label={"Unit Type"}
                placeholder={"g, ml, etc..."}
                {...register("unitType")}
              />
            </div>
          </div>

          <FormErrorMessage errors={errors} name={"quantity"} />
          <FormErrorMessage errors={errors} name={"unitType"} />

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
            name={"salePercent"}
            control={control}
            render={({ field }) => (
              <NumberInput
                disabled={
                  !getValues("discountStart") && !getValues("discountEnd")
                }
                placeholder={"sale percentage..."}
                withAsterisk
                hideControls
                min={0}
                label={"Discount Percent"}
                defaultValue={field.value ?? undefined}
                onChange={(v) => field.onChange(v ?? null)}
                onBlur={field.onBlur}
                rightSection={<IconPercentage color={"#939393"} className={'mr-2'} />}
              />
            )}
          ></Controller>
          <FormErrorMessage errors={errors} name={"salePercent"} />
        </div>

        <Divider orientation={"vertical"} />

        <div className="flex flex-1 flex-col">
          <label
            htmlFor="file"
            className="text-[14px] font-[500] text-gray-900"
          >
            Product Image <span className="text-red-500">*</span>
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
                withAsterisk
                hideControls
                min={0}
                label={"Price"}
                defaultValue={field.value}
                onChange={(v) => field.onChange(v)}
                onBlur={field.onBlur}
              />
            )}
          ></Controller>
          <FormErrorMessage errors={errors} name={"price"} />
        </div>

        <div className="mt-4 flex w-full justify-end">
          <Button>Save</Button>
        </div>
      </form>
    </Modal>
  );
};

export default ProductDetailDialog;
