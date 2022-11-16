import { BillingProductCreateEntity } from "../../../../../model/invoice.model";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button, Text, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons";
import mockProduct from "../../../../../mock/product";
import FoundBillingItem, { BillingItemData } from "./_found-billing-item";
import { useQuery } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";

type props = {
  onChange?: (item: BillingProductCreateEntity) => void;
};

const SearchBillingItems: FC<props> = ({ onChange }) => {
  const [searchString, setSearchString] = useState<string>();
  const { data: foundItems, isLoading } = useQuery(
    ["search-bill-item", searchString],
    async () => searchItem(searchString),
    {
      enabled: !!searchString,
    }
  );

  const schema = z.object({
    name: z.string().min(1),
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { isValid },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    criteriaMode: "all",
  });

  async function searchItem(name?: string) {
    const productResult: BillingItemData[] = await mockProduct(name);
    return productResult.slice(0, 5);
  }

  const onSubmitSearch = (formData: z.infer<typeof schema>) =>
    setSearchString(formData.name);

  const onBillingItem = (data: BillingItemData) => {
    const newBillingData = {
      item: data.id,
      quantity: 1,
    } as BillingProductCreateEntity;
    onChange && onChange(newBillingData);
    reset();
    setSearchString("");
  };

  return (
    <div className={"flex flex-col space-y-4"}>
      <form
        onSubmit={handleSubmit(onSubmitSearch)}
        className="flex w-full space-x-2 py-4"
      >
        <TextInput
          placeholder={"tên sản phẩm, ít nhất 1 ký tự"}
          className={"flex-1"}
          {...register("name")}
        />

        <Button
          disabled={!isValid}
          type={"submit"}
          leftIcon={<IconSearch />}
          variant={"filled"}
          color={"blue"}
        >
          <Text>Tìm</Text>
        </Button>
      </form>

      <div className="flex max-h-72 flex-col overflow-auto p-2">
        {isLoading && !!searchString ? <>Loading...</> : ""}
        {foundItems &&
          foundItems?.map((i, index) => (
            <FoundBillingItem
              onSelected={onBillingItem}
              key={`${i.id}-${index}`}
              data={i}
            />
          ))}
      </div>
    </div>
  );
};

export default SearchBillingItems;
