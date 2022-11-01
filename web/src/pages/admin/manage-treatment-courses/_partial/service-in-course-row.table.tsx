import { ActionIcon, Select } from "@mantine/core";
import AutoCompleteItem, {
  AutoCompleteItemProp,
} from "../../../../components/auto-complete-item";
import { IconX } from "@tabler/icons";
import { ServiceModel } from "../../../../model/service.model";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { formatPrice } from "../../../../utilities/fn.helper";

type rowProps = {
  no: number;
  serviceId: number | null;
  data: ServiceModel[];
  onSelected: (id: number | null) => void;
  onRemoved: (index: number) => void;
};

const ServiceInCourseRowTable = ({
  no,
  serviceId,
  onSelected,
  data: listServices,
  onRemoved,
}: rowProps) => {
  const [services, setServices] = useState<
    AutoCompleteItemProp<ServiceModel>[]
  >([]);

  const { data: viewingService } = useQuery<ServiceModel>(
    ["viewing-service", serviceId],
    () => {
      const inList = listServices.find((s) => s.id === serviceId);
      if (!inList) {
        throw new Error(`Unable to find service with ID: ${serviceId}`);
      }
      return inList;
    },
    {
      onError: (err) => alert(err),
    }
  );

  useEffect(() => {
    setServices(toAutoCompleteItems(listServices));
  }, [listServices]);

  function toAutoCompleteItems(
    original: ServiceModel[]
  ): AutoCompleteItemProp<ServiceModel>[] {
    return original.map((s) => ({
      value: String(s.id),
      label: s.name,
      data: {
        ...s,
        description: `${formatPrice(s.price)} VND`,
      },
    }));
  }

  return (
    <tr key={serviceId}>
      <td>{no + 1}</td>
      <td>
        <Select
          data={services}
          placeholder={"service's name..."}
          searchable
          itemComponent={AutoCompleteItem}
          nothingFound="No options"
          maxDropdownHeight={200}
          onChange={(id) => onSelected(id !== null ? Number(id) : null)}
          required
          defaultValue={serviceId !== null ? String(serviceId) : null}
        />
      </td>
      <td>{viewingService?.price}</td>
      <td>
        <ActionIcon onClick={() => onRemoved(no)} color={"red"}>
          <IconX size={18} />
        </ActionIcon>
      </td>
    </tr>
  );
};

export default ServiceInCourseRowTable;
