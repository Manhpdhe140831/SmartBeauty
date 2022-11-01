import { FC, useEffect, useState } from "react";
import { Button, Table } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import { ServiceModel } from "../../../../model/service.model";
import { useQuery } from "@tanstack/react-query";
import mockService from "../../../../mock/service";
import RowPlaceholderTable from "../../../../components/row-placeholder.table";
import ServiceInCourseRowTable from "./service-in-course-row.table";

type TableProps = {
  services: number[];
  onChange: (serviceId: (number | null)[]) => void;
};

const ServiceInCourseTable: FC<TableProps> = ({ services, onChange }) => {
  const [serviceIds, setServiceIds] = useState<(number | null)[]>(services);

  const { data: availableServices, isLoading: serviceDbLoading } = useQuery<
    ServiceModel[]
  >(["available-services"], async () => mockService(), {
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

  useEffect(() => {
    onChange(serviceIds);
  }, [serviceIds]);

  return (
    <Table className={"table-fixed"}>
      <colgroup>
        <col className={"w-14"} />
        <col />
        <col className={"w-20"} />
        <col className={"w-14"} />
      </colgroup>
      <thead>
        <tr>
          <th>No.</th>
          <th>Service Name</th>
          <th>Price</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {serviceDbLoading || !availableServices ? (
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
              data={availableServices}
            />
          ))
        )}
        <tr className={"border-b"}>
          <td colSpan={4}>
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
