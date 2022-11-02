import AutoCompleteItem, { AutoCompleteItemProp } from "./auto-complete-item";
import { Select } from "@mantine/core";
import { FocusEventHandler, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";

type searchFn<dataType extends object> = (
  key: string
) => Promise<AutoCompleteItemProp<dataType>[]>;

type ItemSearchSelectProps<dataType extends object> = {
  value: string | null;
  displayValue: AutoCompleteItemProp<dataType> | null;
  onSearching: searchFn<dataType>;
  onSelected: (value: string | null) => void;
  onBlur?: FocusEventHandler;
  debouncedBy?: number;
  placeholder?: string;
  required?: boolean;
};

/**
 * Generic autocomplete-select with API-searchable.
 * @param props
 * @constructor
 */
const DatabaseSearchSelect = <dataType extends object>(
  props: ItemSearchSelectProps<dataType>
) => {
  const [searchWord, setSearchWord] = useState<string | undefined>();
  const [searchKey, { isPending }] = useDebounce(
    searchWord,
    props.debouncedBy ?? 300
  );

  const { data: collection, isLoading: collectionLoading } = useQuery<
    AutoCompleteItemProp<dataType>[]
  >(
    ["search-mutation", searchKey, props.onSearching, props.value],
    async () => {
      const fnSearch: searchFn<dataType> =
        props.onSearching ?? (() => Promise.resolve([]));
      const foundCollection = searchKey ? await fnSearch(searchKey) : [];
      const filtered = foundCollection.filter((c) => c.value !== props.value);
      return [
        ...(props.displayValue ? [props.displayValue] : []),
        ...filtered,
      ] as AutoCompleteItemProp<dataType>[];
    }
  );

  return (
    <Select
      data={collectionLoading || !collection ? [] : collection}
      placeholder={props.placeholder}
      searchable
      itemComponent={AutoCompleteItem}
      nothingFound={
        collectionLoading || isPending() ? "loading..." : "No result found"
      }
      maxDropdownHeight={200}
      required={props.required}
      defaultValue={props.value}
      onSearchChange={setSearchWord}
      onChange={props.onSelected}
      onFocus={props.onBlur}
    />
  );
};

export default DatabaseSearchSelect;
