import { BillItemsModel } from "../../../../../model/invoice.model";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button, Text, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons";
import mockProduct from "../../../../../mock/product";
import BillingItem, { BillingItemData } from "./_billing-item";
import mockService from "../../../../../mock/service";
import mockCourse from "../../../../../mock/course";
import { useQuery } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";

type props = {
  onChange?: (item: BillItemsModel) => void;
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
    const servicesResult: BillingItemData[] = await mockService(name);
    const coursesResult: BillingItemData[] = await mockCourse(name);

    return {
      products: productResult.slice(0, 5),
      services: servicesResult.slice(0, 5),
      courses: coursesResult.slice(0, 5),
    };
  }

  const onSubmitSearch = (formData: z.infer<typeof schema>) =>
    setSearchString(formData.name);

  const onBillingItem = (
    data: BillingItemData,
    type: BillItemsModel["type"]
  ) => {
    const newBillingData = {
      type,
      item: data,
      quantity: 1,
    } as BillItemsModel;
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
          placeholder={"item name, at least 1 character"}
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
          <Text>Find</Text>
        </Button>
      </form>

      <div className="flex flex-col">
        {isLoading && !!searchString ? <>Loading...</> : ""}
        {foundItems && (
          <>
            {foundItems.products?.map((i, index) => (
              <BillingItem
                onSelected={onBillingItem}
                key={`${i.id}-${index}`}
                data={i}
                type={"product"}
              />
            ))}
            {foundItems.services?.map((i, index) => (
              <BillingItem
                onSelected={onBillingItem}
                key={`${i.id}-${index}`}
                data={i}
                type={"service"}
              />
            ))}
            {foundItems.courses?.map((i, index) => (
              <BillingItem
                onSelected={onBillingItem}
                key={`${i.id}-${index}`}
                data={i}
                type={"course"}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchBillingItems;
