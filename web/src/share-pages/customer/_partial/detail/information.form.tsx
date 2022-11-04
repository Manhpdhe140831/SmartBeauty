import { CustomerModel } from "../../../../model/customer.model";
import {
  Input,
  InputVariant,
  MantineSize,
  Select,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import FormErrorMessage from "../../../../components/form-error-message";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import {
  addressSchema,
  ageSchemaFn,
  emailSchema,
  genderSchema,
  nameSchema,
  phoneSchema,
} from "../../../../validation/field.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { GENDER } from "../../../../const/gender.const";
import { DatePicker } from "@mantine/dates";
import { ageTilToday } from "../../../../utilities/fn.helper";
import MaskedInput from "react-text-mask";
import { PhoneNumberMask } from "../../../../const/input-masking.const";

type FormProps = {
  data: CustomerModel;
  readonly?: boolean;
  onChanged?: () => void;
};

const InformationForm = ({ data, readonly }: FormProps) => {
  const schema = z.object({
    name: nameSchema,
    phone: phoneSchema,
    email: emailSchema,
    gender: genderSchema,
    dateOfBirth: ageSchemaFn(),
    address: addressSchema,
  });

  const {
    register,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      ...data,
      dateOfBirth: data.dateOfBirth
        ? dayjs(data.dateOfBirth).toDate()
        : undefined,
    },
  });

  const generalProps = (
    label: string,
    readonly?: boolean,
    otp?: { withStyle?: boolean; required?: boolean }
  ) => ({
    label: (
      <Text color={"dimmed"} size={"sm"}>
        {label}{" "}
        {!readonly && otp?.required ? (
          <span className="text-red-500">*</span>
        ) : (
          ""
        )}
      </Text>
    ),
    variant: (readonly ? "unstyled" : "filled") as InputVariant,
    readOnly: readonly,
    sx:
      readonly && otp?.withStyle !== false
        ? {
            input: {
              height: 32,
              lineHeight: 32,
              fontWeight: 500,
              color: "#000",
              opacity: 1,
            },
            textarea: {
              padding: 0,
            },
          }
        : undefined,
    width: "100%",
    size: "lg" as MantineSize,
  });

  return (
    <form className={""}>
      <fieldset disabled={readonly} className={"flex w-80 flex-col"}>
        <TextInput
          {...generalProps("Customer Name", readonly, { required: true })}
          {...register("name")}
        />
        <FormErrorMessage name={"name"} errors={errors} />

        <Controller
          render={({ field }) => (
            <Select
              data={[
                { value: GENDER.male, label: "Male" },
                { value: GENDER.female, label: "Female" },
                { value: GENDER.other, label: "other" },
              ]}
              onChange={(e) => {
                field.onChange(e);
                field.onBlur();
              }}
              onBlur={field.onBlur}
              defaultValue={field.value}
              {...generalProps("Gender", readonly, { required: true })}
            />
          )}
          name={"gender"}
          control={control}
        />
        <FormErrorMessage errors={errors} name={"gender"} />

        <Controller
          render={({ field }) => (
            <DatePicker
              minDate={dayjs(new Date()).subtract(64, "years").toDate()}
              maxDate={dayjs(new Date()).subtract(18, "years").toDate()}
              placeholder="In range of 18-64 years old"
              onChange={(e) => {
                field.onChange(e);
                field.onBlur();
              }}
              onBlur={field.onBlur}
              defaultValue={field.value}
              rightSectionWidth={150}
              rightSection={
                <Text className={"w-full"} size={"xs"}>
                  {field.value ? `(${ageTilToday(field.value)} old)` : "-"}
                </Text>
              }
              {...generalProps("Date of Birth", readonly, { required: true })}
            />
          )}
          name={"dateOfBirth"}
          control={control}
        />
        <FormErrorMessage errors={errors} name={"dateOfBirth"} />

        <Controller
          name={"phone"}
          control={control}
          render={({ field }) => (
            <Input.Wrapper
              label={
                <Text color={"dimmed"} size={"sm"}>
                  Phone Number{" "}
                  {readonly ? "" : <span className="text-red-500">*</span>}
                </Text>
              }
            >
              <Input
                component={MaskedInput}
                mask={PhoneNumberMask}
                placeholder={"012 774 9999"}
                onChange={field.onChange}
                onBlur={field.onBlur}
                defaultValue={field.value}
                {...generalProps("Phone Number", readonly, { required: true })}
              />
            </Input.Wrapper>
          )}
        />
        <FormErrorMessage errors={errors} name={"phone"} />

        <TextInput
          type="email"
          placeholder={"john_smith@domain.com"}
          {...generalProps("Email", readonly)}
          {...register("email")}
        />
        <FormErrorMessage errors={errors} name={"email"} />

        <Textarea
          autosize={false}
          rows={4}
          placeholder={"the address of the customer..."}
          {...generalProps("Address", readonly)}
          {...register("address")}
        ></Textarea>
        <FormErrorMessage errors={errors} name={"address"} />
      </fieldset>
    </form>
  );
};

export default InformationForm;
