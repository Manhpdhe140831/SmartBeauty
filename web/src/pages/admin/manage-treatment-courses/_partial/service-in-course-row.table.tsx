import { ActionIcon, Image, Select } from "@mantine/core";
import AutoCompleteItem, {
  AutoCompleteItemProp,
} from "../../../../components/auto-complete-item";
import { IconX } from "@tabler/icons";
import { ServiceModel } from "../../../../model/service.model";
import { formatPrice, formatTime } from "../../../../utilities/fn.helper";
import { useEffect, useState } from "react";

type rowProps = {
  no: number;
  serviceId: number | null;
  data: AutoCompleteItemProp<ServiceModel>[];
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
  const [viewingService, setViewingService] = useState<ServiceModel | null>();

  useEffect(() => {
    if (!serviceId || !listServices || listServices.length === 0) {
      setViewingService(null);
      return;
    }
    const inList = listServices.find((s) => s.data.id === serviceId);
    if (!inList) {
      setViewingService(null);
      console.error(`Unable to find service with ID: ${serviceId}`);
      return;
    }
    setViewingService(inList.data);
  }, [serviceId, listServices]);

  return (
    <tr key={serviceId}>
      <td>{no + 1}</td>
      <td>
        <div className="aspect-square w-full overflow-hidden rounded shadow-lg">
          {viewingService && (
            <Image
              width={"44px"}
              height={"44px"}
              fit={"cover"}
              src={viewingService.image}
              alt={viewingService.name}
            />
          )}
        </div>
      </td>
      <td>
        <Select
          data={listServices}
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
      <td>
        {viewingService && formatTime(viewingService.duration, "minutes")}
      </td>
      <td>{viewingService?.price && formatPrice(viewingService.price)}</td>
      <td>
        <ActionIcon onClick={() => onRemoved(no)} color={"red"}>
          <IconX size={18} />
        </ActionIcon>
      </td>
    </tr>
  );
};

export default ServiceInCourseRowTable;
