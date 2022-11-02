import { ActionIcon, Image } from "@mantine/core";
import { AutoCompleteItemProp } from "../../../../components/auto-complete-item";
import { IconX } from "@tabler/icons";
import { ServiceModel } from "../../../../model/service.model";
import {
  formatPrice,
  formatTime,
  rawToAutoItem,
} from "../../../../utilities/fn.helper";
import DatabaseSearchSelect from "../../../../components/database-search.select";
import { useQuery } from "@tanstack/react-query";
import mockService from "../../../../mock/service";

type rowProps = {
  no: number;
  disableServices?: number[];
  serviceId: number | null;
  onSelected: (id: number | null) => void;
  onRemoved: (index: number) => void;
};

const ServiceInCourseRowTable = ({
  no,
  serviceId,
  onSelected,
  onRemoved,
  disableServices,
}: rowProps) => {
  const fnHelper = (s: ServiceModel) => ({
    id: s.id,
    name: s.name,
    description: `${formatPrice(s.price)} VND`,
  });

  const { data: viewingService, isLoading: viewLoading } =
    useQuery<ServiceModel | null>(
      ["available-service", serviceId],
      async () => {
        if (serviceId === undefined || serviceId === null) {
          return null;
        }
        const p = await mockService();
        const f = p.find((p) => p.id === serviceId);
        return f ?? null;
      }
    );

  // TODO transfer to service.
  async function searchService(
    serviceName: string,
    disableList: number[]
  ): Promise<AutoCompleteItemProp<ServiceModel>[]> {
    const listProduct = await mockService();
    return listProduct
      .filter((p) => p.name.includes(serviceName))
      .map((i) => ({
        ...rawToAutoItem(i, fnHelper),
        disabled: disableList.includes(i.id),
      }));
  }

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
        {viewLoading ? (
          <>loading...</>
        ) : (
          <DatabaseSearchSelect
            value={serviceId ? String(serviceId) : null}
            displayValue={
              viewingService
                ? {
                    ...rawToAutoItem(viewingService, fnHelper),
                    disabled: true,
                  }
                : null
            }
            onSearching={(k) => searchService(k, disableServices ?? [])}
            onSelected={(_id) => {
              const id = _id ? Number(_id) : null;
              onSelected(id);
            }}
          />
        )}
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
