import { InputVariant, MantineSize, Text } from "@mantine/core";

export const stateInputProps = (
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
