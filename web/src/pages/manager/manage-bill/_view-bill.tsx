import { useQuery } from "@tanstack/react-query";
import mockManager from "../../../mock/manager";
import { AutoCompleteItemProp } from "../../../components/auto-complete-item";
import FormErrorMessage from "../../../components/form-error-message";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { nameSchema } from "../../../validation/field.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { BillModel, BillPayload } from "../../../model/bill.model";

type ViewBillPropsType = {
  billData: BillModel;
  onClose: (billData?: BillPayload) => void;
};

const BillInfo = ({ billData, onClose }: ViewBillPropsType) => {
  // schema validation
  const updateSchema = z.object({
    name: nameSchema,
    code_bill: nameSchema,
    date_bill: nameSchema,
    provider: nameSchema,
    cost: nameSchema,
  });

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<BillPayload>({
    resolver: zodResolver(updateSchema),
    mode: "onChange",
    defaultValues: { ...BillInfo },
  });

  const { data: availableManager, isLoading: managerLoading } = useQuery<
    AutoCompleteItemProp[]
  >(["available-manager"], async () => {
    const manager = await mockManager();
    return manager.map((m) => ({
      // add fields of SelectItemGeneric
      value: String(m.id),
      label: m.name,
      data: {
        description: m.phone,
      },
    }));
  });

  const onSubmit = (data: BillPayload) => onClose();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-[600px] space-x-4"
    >
      <div className="flex w-32 flex-col space-y-2">
        <FormErrorMessage className={"text-sm"} errors={errors} name={"logo"} />
      </div>

      <div className={"flex flex-1 flex-col"}>
        <small className={"leading-none text-gray-500"}>Bill</small>
        <h1 className={"mb-2 text-2xl font-semibold"}>{billData.provider}</h1>
      </div>
    </form>
  );
};

export default BillInfo;
