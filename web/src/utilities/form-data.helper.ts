export function jsonToFormData<T extends object>(
  rawJSON: T,
  formData: FormData = new FormData()
) {
  for (const field of Object.keys(rawJSON)) {
    const formKey = field as unknown as keyof T;
    if (!Object.hasOwn(rawJSON, formKey)) {
      continue;
    }

    if (rawJSON[formKey] === null || rawJSON[formKey] === undefined) {
      continue;
    }
    const valueField = rawJSON[formKey];
    if (valueField instanceof File) {
      formData.append(field, valueField);
    } else if (valueField instanceof Date) {
      formData.append(field, valueField.toISOString());
    } else {
      formData.append(
        field,
        typeof valueField === "string" ? valueField : JSON.stringify(valueField)
      );
    }
  }

  return formData;
}
