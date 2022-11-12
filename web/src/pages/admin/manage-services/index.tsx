import { AppPageInterface } from "../../../interfaces/app-page.interface";
import { USER_ROLE } from "../../../const/user-role.const";
import usePaginationHook from "../../../hooks/pagination.hook";
import { Button, Divider, Pagination } from "@mantine/core";
import { useDialogDetailRow } from "../../../hooks/modal-detail-row.hook";
import {
  ServiceCreateEntity,
  ServiceModel,
  ServiceUpdateEntity,
} from "../../../model/service.model";
import { IconPlus } from "@tabler/icons";
import ServiceList from "../../_shared/services/service-list";
import { useListServiceQuery } from "../../../query/model-list";
import AdminServiceDetailDialog from "./_detail.dialog";
import { useMutation } from "@tanstack/react-query";
import {
  createSpaService,
  updateSpaService,
} from "../../../services/spa-service.service";

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
  } = useListServiceQuery(currentPage, updatePagination);

  const createServiceMutation = useMutation(
    ["create-spa-service"],
    async (d: ServiceCreateEntity) => createSpaService(d),
    {
      onSuccess: () => {
        void refetch();
        resetModal();
      },
    }
  );

  const updateServiceMutation = useMutation(
    ["update-spa-service"],
    async (d: ServiceUpdateEntity) => updateSpaService(d),
    {
      onSuccess: () => {
        void refetch();
        resetModal();
      },
    }
  );

  return (
    <div className={"flex min-h-full flex-col space-y-4 p-4"}>
      <div className="flex justify-end space-x-2">
        <Button onClick={() => openModal("create")} leftIcon={<IconPlus />}>
          Service
        </Button>
      </div>

      <Divider my={8} />

      <div className="flex-1">
        <ServiceList
          pageSize={pageSize}
          page={currentPage}
          data={services?.data}
          isLoading={isLoading}
          onRowClick={(d) => openModal("view", d)}
        />
        {modal && (
          <AdminServiceDetailDialog
            mode={modal.mode as never} // silent the TS-error
            data={modal.data}
            opened={!!modal}
            onClosed={async (
              update?: ServiceCreateEntity | ServiceUpdateEntity
            ) => {
              if (update) {
                console.log(update);
                if (modal?.mode === "create") {
                  await createServiceMutation.mutateAsync(
                    update as ServiceCreateEntity
                  );
                } else {
                  await updateServiceMutation.mutateAsync(
                    update as ServiceUpdateEntity
                  );
                }
                return;
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
