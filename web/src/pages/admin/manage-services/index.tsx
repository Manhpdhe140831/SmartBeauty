import { AppPageInterface } from "../../../interfaces/app-page.interface";
import { USER_ROLE } from "../../../const/user-role.const";
import usePaginationHook, { getItemNo } from "../../../hooks/pagination.hook";
import { Button, Divider, Pagination, Table } from "@mantine/core";
import ServiceHeaderTable from "./_partial/service-header.table";
import { useDialogDetailRow } from "../../../hooks/modal-detail-row.hook";
import {
  ServiceCreateEntity,
  ServiceModel,
  ServiceUpdateEntity,
} from "../../../model/service.model";
import { IconPlus } from "@tabler/icons";
import { useQuery } from "@tanstack/react-query";
import mockService from "../../../mock/service";
import RowPlaceholderTable from "../../../components/row-placeholder.table";
import ServiceRowTable from "./_partial/service-row.table";
import ServiceDetailDialog from "./_service-detail.dialog";

const Index: AppPageInterface = () => {
  const { modal, openModal, resetModal } = useDialogDetailRow<ServiceModel>();
  const {
    pageSize,
    currentPage,
    totalRecord,
    update: updatePagination,
  } = usePaginationHook();

  const {
    data: services,
    isLoading,
    refetch,
  } = useQuery<ServiceModel[]>(
    ["list-service", currentPage],
    async () => {
      const serviceList = await mockService();
      updatePagination({ total: serviceList.length });
      return serviceList;
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  return (
    <div className={"flex h-full flex-col space-y-4 p-4"}>
      <div className="flex justify-end space-x-2">
        <Button onClick={() => openModal("create")} leftIcon={<IconPlus />}>
          Service
        </Button>
      </div>

      <Divider my={8} />

      <div className="flex-1">
        <Table className={"table-fixed"} withBorder highlightOnHover striped>
          <ServiceHeaderTable />

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
              services &&
              services.map((s, i) => (
                <ServiceRowTable
                  onClick={(service) => openModal("view", service)}
                  key={s.id}
                  data={s}
                  no={getItemNo(i, currentPage, pageSize)}
                />
              ))
            )}
          </tbody>
        </Table>
        {modal && (
          <ServiceDetailDialog
            mode={modal.mode as never} // silent the TS-error
            data={modal.data}
            opened={!!modal}
            onClosed={(update?: ServiceCreateEntity | ServiceUpdateEntity) => {
              if (update) {
                console.log(update);
                // TODO update
                refetch();
              }
              resetModal();
            }}
          />
        )}
      </div>

      <Divider my={8} />

      {/*Total record / 10 (per-page)*/}
      <Pagination
        position={"center"}
        page={currentPage}
        onChange={(page) => updatePagination({ newPage: page })}
        total={totalRecord / pageSize}
      />
    </div>
  );
};

Index.guarded = USER_ROLE.admin;
Index.routerName = "Manage Services";

export default Index;
