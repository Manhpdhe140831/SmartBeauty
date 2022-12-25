import { AppPageInterface } from "../../../interfaces/app-page.interface";
import usePaginationHook, { getItemNo } from "../../../hooks/pagination.hook";
import { useDialogDetailRow } from "../../../hooks/modal-detail-row.hook";
import {
  CourseCreateEntity,
  CourseModel,
  CourseUpdateEntity,
} from "../../../model/course.model";
import { Button, Divider, Pagination, Table, TextInput } from "@mantine/core";
import { IconPlus, IconSearch } from "@tabler/icons";
import CourseHeaderTable from "./_partial/course-header.table";
import RowPlaceholderTable from "../../../components/row-placeholder.table";
import CourseRowTable from "./_partial/course-row.table";
import CourseDetailDialog from "./_course-detail.dialog";
import { useListCourseQuery } from "../../../query/model-list";
import { useMutation } from "@tanstack/react-query";
import { IErrorResponse } from "../../../interfaces/api.interface";
import {
  createSpaCourse,
  updateSpaCourse,
} from "../../../services/spa-course.service";
import { ServiceModel } from "../../../model/service.model";
import useDebounceHook from "../../../hooks/use-debounce.hook";
import { ChangeEvent } from "react";
import {
  ShowFailedCreate,
  ShowFailedUpdate,
  ShowSuccessCreate,
  ShowSuccessUpdate,
} from "../../../utilities/show-notification";

const Index: AppPageInterface = () => {
  const { value: searchKey, onChange: setSearchWord } = useDebounceHook();
  const { modal, openModal, resetModal } =
    useDialogDetailRow<CourseModel<ServiceModel>>();
  const {
    pageSize,
    currentPage,
    totalPage,
    update: updatePagination,
  } = usePaginationHook();

  const {
    data: course,
    isLoading,
    refetch,
  } = useListCourseQuery(currentPage, updatePagination, {
    pageSize,
    searchQuery: searchKey
      ? {
          name: searchKey,
        }
      : undefined,
  });

  const updateMutation = useMutation<
    boolean,
    IErrorResponse,
    CourseUpdateEntity
  >((d) => updateSpaCourse(d), {
    onSuccess: () => {
      ShowSuccessUpdate();
      resetModal();
      refetch();
    },
    onError: (e) => {
      console.error(e);
      ShowFailedUpdate();
    },
  });

  const createMutation = useMutation<
    boolean,
    IErrorResponse,
    CourseCreateEntity
  >((data: CourseCreateEntity) => createSpaCourse(data), {
    onSuccess: () => {
      ShowSuccessCreate();
      resetModal();
      refetch();
    },
    onError: (e) => {
      console.error(e);
      ShowFailedCreate();
    },
  });

  return (
    <div className={"flex min-h-full flex-col space-y-4 p-4"}>
      <div className="flex justify-end space-x-2">
        <Button onClick={() => openModal("create")} leftIcon={<IconPlus />}>
          Liệu Trình
        </Button>
        {/*Search by name*/}
        <TextInput
          icon={<IconSearch />}
          placeholder={"Tên liệu trình..."}
          type={"text"}
          className="w-56"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchWord(e.currentTarget.value)
          }
        />
      </div>

      <Divider my={8} />

      <div className="flex-1">
        <Table className={"table-fixed"} withBorder highlightOnHover striped>
          <CourseHeaderTable />

          <tbody>
            {isLoading ? (
              <RowPlaceholderTable
                colSpan={7}
                className={"min-h-12"}
                message={
                  <div className="text-center font-semibold text-gray-500">
                    Loading...
                  </div>
                }
              />
            ) : (
              course &&
              course.data.map((s, i) => (
                <CourseRowTable
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
          <CourseDetailDialog
            mode={modal.mode as never} // silent the TS-error
            data={modal.data}
            opened={!!modal}
            onClosed={async (u?: CourseCreateEntity | CourseUpdateEntity) => {
              if (u) {
                if (modal.mode === "create") {
                  await createMutation.mutateAsync(u as CourseCreateEntity);
                  return;
                } else {
                  await updateMutation.mutateAsync(u as CourseUpdateEntity);
                  return;
                }
              }
              resetModal();
            }}
          />
        )}
      </div>

      <Divider my={8} />

      <Pagination
        position={"center"}
        page={currentPage}
        onChange={(page) => updatePagination({ newPage: page })}
        total={totalPage}
      />
    </div>
  );
};

export default Index;
