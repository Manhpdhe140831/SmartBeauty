type DialogMode = "view" | "create";

export type DialogProps<dataType, updatedType, createdType> =
  | {
      mode: Extract<DialogMode, "view">;
      opened: boolean;
      onClosed: (updated?: updatedType) => void;
      data: dataType;
    }
  | {
      mode: Extract<DialogMode, "create">;
      opened: boolean;
      onClosed: (newSupplier?: createdType) => void;
      data?: dataType;
    };
