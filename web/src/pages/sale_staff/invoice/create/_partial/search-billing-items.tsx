import { BillItemsModel } from "../../../../../model/invoice.model";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { idDbSchema } from "../../../../../validation/field.schema";

type props = {
  onChange: (item: BillItemsModel) => void;
};

const SearchBillingItems = () => {
  const [id, setId] = useState<number | undefined>();

  const schema = z.object({
    itemId: idDbSchema,
    type: z.enum(["product", "service", "course"]),
    quantity: z.number().min(1).max(100),
  });

  const {} = useForm();

  return <div className={"flex space-x-4"}></div>;
};

export default SearchBillingItems;
