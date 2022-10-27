import { Button } from "@mantine/core";
import { FC } from "react";

type DialogDetailActionProps = {
  mode: "view" | "create";
  isDirty: boolean;
  isValid: boolean;
  onClosed?: () => void;
};

const DialogDetailAction: FC<DialogDetailActionProps> = ({
  mode,
  isDirty,
  isValid,
}) => {
  return mode === "view" ? (
    isDirty ? (
      <div className={"flex space-x-2"}>
        <Button variant={"subtle"} type={"reset"}>
          Cancel
        </Button>
        <Button
          sx={{ width: "160px" }}
          color={"orange"}
          type={"submit"}
          disabled={!isValid}
        >
          Update
        </Button>
      </div>
    ) : (
      <Button type={"reset"}>Close</Button>
    )
  ) : (
    <div className="flex space-x-2">
      <Button variant={"subtle"} type={"reset"}>
        Cancel
      </Button>
      <Button
        sx={{ width: "160px" }}
        type={"submit"}
        color={"teal"}
        disabled={!isValid}
      >
        Create
      </Button>
    </div>
  );
};

export default DialogDetailAction;
