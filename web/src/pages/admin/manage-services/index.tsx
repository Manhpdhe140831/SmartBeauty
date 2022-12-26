import { AppPageInterface } from "../../../interfaces/app-page.interface";
import { USER_ROLE } from "../../../const/user-role.const";
import usePaginationHook from "../../../hooks/pagination.hook";
import { Button, Divider, Pagination, TextInput } from "@mantine/core";
import { useDialogDetailRow } from "../../../hooks/modal-detail-row.hook";
import {
  ServiceCreateEntity,
  ServiceModel,
  ServiceUpdateEntity,
} from "../../../model/service.model";
import { IconPlus, IconSearch } from "@tabler/icons";
import ServiceList from "../../_shared/services/service-list";
import { useListServiceQuery } from "../../../query/model-list";
import { useMutation } from "@tanstack/react-query";
import {
  createSpaService,
  deleteSpaService,
  updateSpaService,
} from "../../../services/spa-service.service";
import ServiceDetailDialog from "../../_shared/services/service-detail.dialog";
import { ChangeEvent } from "react";
import useDebounceHook from "../../../hooks/use-debounce.hook";
import {
  ShowFailedCreate,
  ShowFailedDelete,
  ShowFailedUpdate,
  ShowSuccessCreate,
  ShowSuccessDelete,
  ShowSuccessUpdate,
} from "../../../utilities/show-notification";

const Index: AppPageInterface = () => {
  const { value: searchKey, onChange: setSearchWord } = useDebounceHook();
  const { modal, openModal, resetModal } = useDialogDetailRow<ServiceModel>();
  const {
    pageSize,
    currentPage,
    totalPage,
    update: updatePagination,
  } = usePaginationHook();

  const {
    data: services,
    isLoading,
    refetch,
  } = useListServiceQuery(currentPage, updatePagination, {
    pageSize,
    searchQuery: searchKey ? { name: searchKey } : undefined,
  });

  const createServiceMutation = useMutation(
    ["create-spa-service"],
    async (d: ServiceCreateEntity) => createSpaService(d),
    {
      onSuccess: () => {
        ShowSuccessCreate();
        void refetch();
        resetModal();
      },
      onError: (err) => {
        console.error(err);
        ShowFailedCreate();
      },
    }
  );

  const updateServiceMutation = useMutation(
    ["update-spa-service"],
    async (d: ServiceUpdateEntity) => updateSpaService(d),
    {
      onSuccess: () => {
        ShowSuccessUpdate();
        void refetch();
        resetModal();
      },
      onError: (err) => {
        console.error(err);
        ShowFailedUpdate();
      },
    }
  );

  const deleteServiceMutation = useMutation(
    ["delete-spa-service"],
    async (d: number) => deleteSpaService(d),
    {
      onSuccess: () => {
        ShowSuccessDelete();
        void refetch();
        resetModal();
      },
      onError: (err) => {
        console.error(err);
        ShowFailedDelete();
      },
    }
  );

  return (
    <div className={"flex min-h-full flex-col space-y-4 p-4"}>
      <div className="flex justify-end space-x-2">
        <Button onClick={() => openModal("create")} leftIcon={<IconPlus />}>
          Dịch Vụ
        </Button>
        {/*Search by name*/}
        <TextInput
          icon={<IconSearch />}
          placeholder={"Tên dịch vụ..."}
          type={"text"}
          className="w-56"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchWord(e.currentTarget.value)
          }
        />
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
          <ServiceDetailDialog
            mode={modal.mode as never} // silent the TS-error
            data={modal.data}
            opened={!!modal}
            onClosed={async (
              update?: ServiceCreateEntity | ServiceUpdateEntity
            ) => {
              if (update) {
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
            onDeleted={() =>
              modal?.data && deleteServiceMutation.mutate(modal?.data?.id)
            }
          />
        )}
      </div>

      <Divider my={8} />

      {/*Total record / 10 (per-page)*/}
      <Pagination
        position={"center"}
        page={currentPage}
        onChange={(page) => updatePagination({ newPage: page })}
        total={totalPage}
      />
    </div>
  );
};

Index.guarded = USER_ROLE.admin;
Index.routerName = "Manage Services";

export default Index;
