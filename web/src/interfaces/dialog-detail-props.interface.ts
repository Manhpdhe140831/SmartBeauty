export type DialogTypeMode<dataType> =
  | {
      mode: "view";
      data: dataType;
      readonly?: boolean;
      onDeleted?: () => void;
    }
  | {
      mode: "create";
      data?: dataType;
      readonly?: boolean;
      onDeleted?: () => void;
    };

export type DialogViewProps<dataType, updatedType> = {
  mode: "view";
  opened: boolean;
  onClosed: (updated?: updatedType) => void;
} & DialogTypeMode<dataType>;

export type DialogCreateProps<dataType, createdType> = {
  mode: "create";
  opened: boolean;
  onClosed: (newSupplier?: createdType) => void;
} & DialogTypeMode<dataType>;

export type DialogProps<dataType, updatedType, createdType> =
  | DialogViewProps<dataType, updatedType>
  | DialogCreateProps<dataType, createdType>;
