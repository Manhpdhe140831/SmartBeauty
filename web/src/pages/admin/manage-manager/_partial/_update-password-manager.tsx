import { ManagerModel } from "../../../../model/manager.model";
import { FC } from "react";
import { Button, Divider, TextInput } from "@mantine/core";
import FormErrorMessage from "../../../../components/form-error-message";
import { z } from "zod";
import { passwordSchema } from "../../../../validation/field.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type props = {
  manager: ManagerModel;
  onClosed: (update?: {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => void;
};

const UpdatePasswordManagerDialog: FC<props> = ({ manager, onClosed }) => {
  const schemaValidation = z
    .object({
      oldPassword: passwordSchema,
      newPassword: passwordSchema,
      confirmPassword: passwordSchema,
    })
    .refine(
      (data) => {
        return data.confirmPassword === data.newPassword;
      },
      {
        message: "New password and confirm password don't match",
        path: ["confirmPassword"], // path of error,
      }
    )
    .refine(
      (data) => {
        return data.oldPassword !== data.newPassword;
      },
      {
        message: "Old and new password must not match",
        path: ["newPassword"], // path of error,
      }
    );

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof schemaValidation>>({
    resolver: zodResolver(schemaValidation),
    mode: "onBlur",
    criteriaMode: "all",
  });

  const submit = (data: z.infer<typeof schemaValidation>) => {
    onClosed && onClosed(data);
  };

  return (
    <form onSubmit={handleSubmit(submit)} className={"flex w-[300px] flex-col"}>
      <small className={"leading-none text-gray-500"}>Manager</small>
      <h1 className={"text-2xl font-semibold"}>{manager.name}</h1>
      <p className={"mb-2 text-sm text-gray-500"}>{manager.email}</p>

      <Divider my={8} />

      <TextInput
        label={"Old Password"}
        id={"oldPassword"}
        type="password"
        placeholder={"3-30 characters"}
        required
        {...register("oldPassword")}
      />
      <FormErrorMessage errors={errors} name={"oldPassword"} />

      <TextInput
        label={"New Password"}
        id={"newPassword"}
        type="password"
        placeholder={"3-30 characters"}
        required
        {...register("newPassword")}
      />
      <FormErrorMessage errors={errors} name={"newPassword"} />

      <TextInput
        label={"Confirm Password"}
        id={"confirmPassword"}
        type="password"
        placeholder={"similar to new password"}
        required
        {...register("confirmPassword")}
      />
      <FormErrorMessage errors={errors} name={"confirmPassword"} />

      <Divider my={8} />

      <Button disabled={!isValid} type={"submit"} variant={"filled"}>
        Update
      </Button>
    </form>
  );
};

export default UpdatePasswordManagerDialog;
