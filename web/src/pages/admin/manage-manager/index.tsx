import { AppPageInterface } from "../../../interfaces/app-page.interface";
import { Button, Divider, Input, Pagination, Table } from "@mantine/core";
import ManagerHeaderTable from "./_partial/manager-header.table";
import RowPlaceholderTable from "../../../components/row-placeholder.table";
import ManageRowTable from "./_partial/manager-row.table";
import usePaginationHook, { getItemNo } from "../../../hooks/pagination.hook";
import { USER_ROLE } from "../../../const/user-role.const";
import { useListUserQuery } from "../../../query/model-list";
import {
  ManagerCreateEntity,
  ManagerModel,
  ManagerUpdateEntity,
} from "../../../model/manager.model";
import { useDialogDetailRow } from "../../../hooks/modal-detail-row.hook";
import { IconPlus, IconSearch } from "@tabler/icons";
import ViewManagerDialog from "./_view-manager";
import { useMutation } from "@tanstack/react-query";
import { IErrorResponse } from "../../../interfaces/api.interface";
import {
  createUser,
  deleteUser,
  updateUser,
} from "../../../services/user.service";
import CreateManager from "./_create-manager";
import useDebounceHook from "../../../hooks/use-debounce.hook";
import { ChangeEvent } from "react";
import {
  ShowFailedCreate,
  ShowFailedDelete,
  ShowFailedUpdate,
  ShowSuccessCreate,
  ShowSuccessDelete,
  ShowSuccessUpdate,
} from "../../../utilities/show-notification";

const ManageManager: AppPageInterface = () => {
  const { value: searchKey, onChange: setSearchWord } = useDebounceHook();
  const { modal, openModal, resetModal } = useDialogDetailRow<ManagerModel>();

  const {
    pageSize,
    currentPage,
    totalPage,
    update: updatePagination,
  } = usePaginationHook();

  // query to get the list of the manager
  const {
    data: allManager,
    isLoading,
    refetch,
  } = useListUserQuery<ManagerModel>(
    USER_ROLE.manager,
    currentPage,
    updatePagination,
    {
      pageSize,
      searchQuery: searchKey ? { name: searchKey } : undefined,
    }
  );

  const updateMutation = useMutation<
    boolean,
    IErrorResponse,
    ManagerUpdateEntity
  >(["update-manager-password"], (payload) => updateUser(payload), {
    onSuccess: () => {
      ShowSuccessUpdate();
      resetModal();
      void refetch();
    },
    onError: (e) => {
      console.error(e);
      ShowFailedUpdate();
    },
  });

  const createMutation = useMutation<
    boolean,
    IErrorResponse,
    ManagerCreateEntity
  >((v: ManagerCreateEntity) => createUser(v), {
    onSuccess: (result) => {
      if (result) {
        ShowSuccessCreate();
        resetModal();
      } else {
        ShowFailedCreate();
      }
      refetch();
    },
    onError: (error) => {
      console.warn(error);
      ShowFailedCreate();
    },
  });

  const deleteMutation = useMutation(
    ["delete-user"],
    (id: number) => deleteUser(id),
    {
      onSuccess: (d) => {
        if (d) {
          ShowSuccessDelete();
          resetModal();
          return refetch();
        }
        ShowFailedDelete();
      },
      onError: (e) => {
        console.error(e);
        ShowFailedDelete();
      },
    }
  );

  return (
    <div className="flex min-h-full flex-col space-y-4 p-4">
      {/*  Search section   */}
      <div className="flex justify-end space-x-2">
        {/*  Btn create new manager   */}
        <Button
          leftIcon={<IconPlus />}
          color={"green"}
          onClick={() => openModal("create")}
        >
          T???o t??i kho???n
        </Button>

        {modal && modal.mode === "create" && (
          <CreateManager
            mode={"create"}
            opened={!!modal}
            onClosed={async (manager) => {
              if (manager) {
                // action and event will be handled by mutation process.
                await createMutation.mutate(manager);
                return;
              }
              resetModal();
            }}
          />
        )}
        {/*Search by name*/}
        <Input
          icon={<IconSearch />}
          placeholder={"T??n ng?????i d??ng..."}
          type={"text"}
          className="w-56"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchWord(e.currentTarget.value)
          }
        />
      </div>

      <Divider my={8}></Divider>

      <div className="flex-1">
        <Table
          className={"table-fixed"}
          withBorder
          highlightOnHover
          horizontalSpacing={8}
          verticalSpacing={12}
        >
          <ManagerHeaderTable />

          <tbody>
            {isLoading ? (
              <RowPlaceholderTable
                colSpan={5}
                className={"min-h-12"}
                message={
                  <div className="text-center font-semibold text-gray-500">
                    Loading...
                  </div>
                }
              />
            ) : (
              allManager?.data &&
              allManager.data.map((d, i) => (
                <ManageRowTable
                  key={d.id}
                  no={getItemNo(i, currentPage, pageSize)}
                  data={d}
                  onClick={(d) => openModal("view", d)}
                />
              ))
            )}
          </tbody>
        </Table>
        {modal && modal.mode === "view" && (
          <ViewManagerDialog
            mode={"view"}
            opened={!!modal}
            data={modal.data}
            onDeleted={() =>
              modal?.data && deleteMutation.mutate(modal.data.id)
            }
            onClosed={async (newData) => {
              if (newData) {
                // update the user.
                await updateMutation.mutateAsync(newData);
                return;
              }
              resetModal();
            }}
          />
        )}
      </div>

      <Divider my={8}></Divider>

      {/*Total record / 10 (per-page)*/}
      <Pagination
        position={"center"}
        page={currentPage}
        onChange={(page) => updatePagination({ newPage: page })}
        total={totalPage}
      ></Pagination>
    </div>
  );
};

ManageManager.routerName = "Account Manager";
ManageManager.guarded = USER_ROLE.admin;

export default ManageManager;
