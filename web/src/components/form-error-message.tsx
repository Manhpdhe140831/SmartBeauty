import {
  ErrorMessage,
  FieldValuesFromFieldErrors,
} from "@hookform/error-message";
import * as React from "react";
import { DeepRequired, FieldErrorsImpl, FieldName } from "react-hook-form";

type ErrorProps<T> = {
  errors: FieldErrorsImpl<DeepRequired<T>>;
  name: FieldName<FieldValuesFromFieldErrors<FieldErrorsImpl<DeepRequired<T>>>>;
  render?: React.ReactNode;
  className?: string;
};

const FormErrorMessage = <T,>({
  errors,
  name,
  render,
  className,
}: ErrorProps<T>) => {
  return (
    <div className="min-h-6">
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) =>
          render ?? (
            <small className={`text-red-600 ${className}`}>{message}</small>
          )
        }
      ></ErrorMessage>
    </div>
  );
};

export default FormErrorMessage;
