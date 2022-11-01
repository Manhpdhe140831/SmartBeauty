import { FC, useEffect, useState } from "react";
import { Button, Table, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import { ServiceModel } from "../../../../model/service.model";
import { useQuery } from "@tanstack/react-query";
import mockService from "../../../../mock/service";
import RowPlaceholderTable from "../../../../components/row-placeholder.table";
import ServiceInCourseRowTable from "./service-in-course-row.table";
import { AutoCompleteItemProp } from "../../../../components/auto-complete-item";
import { formatPrice } from "../../../../utilities/fn.helper";

type TableProps = {
  services?: number[];
  onChange: (serviceId: (number | null)[]) => void;
};

const ServiceInCourseTable: FC<TableProps> = ({ services, onChange }) => {
  const [serviceIds, setServiceIds] = useState<(number | null)[]>(
    services ?? []
  );
  const [listServices, setListServices] = useState<
    AutoCompleteItemProp<ServiceModel>[]
  >([]);

  const { data: servicesDb, isLoading: serviceDbLoading } = useQuery<
    ServiceModel[]
  >(["available-services"], () => mockService(), {
    refetchOnWindowFocus: false,
  });

  function addingService() {
    setServiceIds((existing) => [...existing, null]);
  }

  function removeService(atIndex: number) {
    const arr = [...serviceIds];
    arr.splice(atIndex, 1);
    setServiceIds(arr);
  }

  function onServiceChanged(rowIndex: number, id: number | null) {
    const arr = [...serviceIds];
    arr.splice(rowIndex, 1, id);
    setServiceIds(arr);
  }

  function toAutoCompleteItems(
    original: ServiceModel[],
    selected: number[]
  ): AutoCompleteItemProp<ServiceModel>[] {
    return original.map((s) => ({
      value: String(s.id),
      label: s.name,
      data: {
        ...s,
        description: `${formatPrice(s.price)} VND`,
        disabled: selected.includes(s.id),
      },
    }));
  }

  useEffect(() => {
    if (!servicesDb) {
      setListServices([]);
      return;
    }
    setListServices(toAutoCompleteItems(servicesDb, services ?? []));
  }, [services, servicesDb]);

  useEffect(() => {
    onChange(serviceIds);
  }, [serviceIds]);

  return (
    <Table className={"table-fixed"}>
      <colgroup>
        <col className={"w-14"} />
        <col className={"w-16"} />
        <col />
        <col className={"w-32"} />
        <col className={"w-32"} />
        <col className={"w-14"} />
      </colgroup>
      <thead>
        <tr>
          <th>No.</th>
          <th>Image</th>
          <th>Name</th>
          <th>
            Duration{" "}
            <Text size={"xs"} color={"dimmed"}>
              (minutes)
            </Text>
          </th>
          <th>
            Price{" "}
            <Text size={"xs"} color={"dimmed"}>
              (VND)
            </Text>
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {serviceDbLoading ? (
          <RowPlaceholderTable
            colSpan={4}
            className={"min-h-12"}
            message={
              <div className="text-center font-semibold text-gray-500">
                Loading...
              </div>
            }
          />
        ) : (
          serviceIds &&
          serviceIds.map((item, index) => (
            <ServiceInCourseRowTable
              key={index}
              no={index}
              onRemoved={removeService}
              onSelected={(i) => onServiceChanged(index, i)}
              serviceId={item}
              data={listServices}
            />
          ))
        )}
        <tr className={"border-b"}>
          <td colSpan={6}>
            <Button
              onClick={() => addingService()}
              leftIcon={<IconPlus />}
              color={"green"}
              fullWidth
            >
              Product
            </Button>
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export default ServiceInCourseTable;
