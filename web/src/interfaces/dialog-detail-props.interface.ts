export type DialogTypeMode<dataType> =
  | {
      mode: "view";
      data: dataType;
    }
  | {
      mode: "create";
      data?: dataType;
    };

export type DialogProps<dataType, updatedType, createdType> = (
  | {
      mode: "view";
      opened: boolean;
      onClosed: (updated?: updatedType) => void;
    }
  | {
      mode: "create";
      opened: boolean;
      onClosed: (newSupplier?: createdType) => void;
    }
) &
  DialogTypeMode<dataType>;
