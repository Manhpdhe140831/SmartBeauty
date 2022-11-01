import { FC, useEffect, useState } from "react";
import { ActionIcon, Button, Select, Table } from "@mantine/core";
import { IconPlus, IconX } from "@tabler/icons";
import { ServiceModel } from "../../../../model/service.model";
import { useQuery } from "@tanstack/react-query";
import mockService from "../../../../mock/service";
import RowPlaceholderTable from "../../../../components/row-placeholder.table";
import { formatPrice } from "../../../../utilities/fn.helper";
import AutoCompleteItem, {
  AutoCompleteItemProp,
} from "../../../../components/auto-complete-item";

type TableProps = {
  services: number[];
  onChange: (serviceId: (number | null)[]) => void;
};

const ServiceInCourseTable: FC<TableProps> = ({ services, onChange }) => {
  const [displayServices, setDisplayServices] = useState<
    (ServiceModel | null)[]
  >([]);
  const [serviceId, setServiceId] = useState<(number | null)[]>(services);

  const { data: availableServices, isLoading: serviceDbLoading } = useQuery<
    AutoCompleteItemProp<ServiceModel>[]
  >(
    ["available-services"],
    async () => {
      const p = await mockService();
      return p.map((p) => ({
        // add fields of SelectItemGeneric
        value: String(p.id),
        label: p.name,
        data: {
          ...p,
          description: `${formatPrice(p.price)} VND`,
        },
      }));
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  const { data, isLoading } = useQuery(
    ["course-services", services],
    () => getServices(services),
    {
      onSuccess: (data) => setDisplayServices(data),
      refetchOnWindowFocus: false,
    }
  );

  async function getServices(idList: number[]) {
    const fromServer = await mockService();
    return fromServer.filter((s) => idList.includes(s.id));
  }

  async function getServiceById(id: number | null, fromList: ServiceModel[]) {
    if (id === null) {
      return undefined;
    }
    return fromList.find((p) => p.id === id);
  }

  function addingService() {
    setDisplayServices((existing) => [...existing, null]);
  }

  function removeService(atIndex: number) {
    const arr = [...displayServices];
    arr.splice(atIndex, 1);
    setDisplayServices(arr);
  }

  function onAddedService() {}

  useEffect(() => {
    onChange(serviceId);
  }, [serviceId]);

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
        {isLoading ? (
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
          displayServices &&
          displayServices.map((item, index) => (
            <tr key={item?.id}>
              <td>{index + 1}</td>
              <td>
                <Select
                  data={
                    !availableServices || serviceDbLoading
                      ? []
                      : availableServices
                  }
                  placeholder={"service's name..."}
                  searchable
                  itemComponent={AutoCompleteItem}
                  nothingFound="No options"
                  maxDropdownHeight={200}
                  onChange={(id) => {
                    // debugger;
                    onAddedService(
                      getServiceById(
                        Number(id),
                        availableServices.map((s) => s.data)
                      )
                    );
                    ControlledField.onChange(id ? Number(id) : null);
                  }}
                  onBlur={ControlledField.onBlur}
                  required
                  defaultValue={field.product ? String(field.product) : null}
                />
              </td>
              <td>{item?.price}</td>
              <td>
                <ActionIcon onClick={() => removeService(index)} color={"red"}>
                  <IconX size={18} />
                </ActionIcon>
              </td>
            </tr>
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
