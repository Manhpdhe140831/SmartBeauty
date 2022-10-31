import { AppPageInterface } from "../../../interfaces/app-page.interface";
import usePaginationHook, { getItemNo } from "../../../hooks/pagination.hook";
import { useDialogDetailRow } from "../../../hooks/modal-detail-row.hook";
import {
  CourseCreateEntity,
  CourseModel,
  CourseUpdateEntity,
} from "../../../model/course.model";
import { useQuery } from "@tanstack/react-query";
import mockCourse from "../../../mock/course";
import { Button, Divider, Pagination, Table } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import CourseHeaderTable from "./_partial/course-header.table";
import RowPlaceholderTable from "../../../components/row-placeholder.table";
import CourseRowTable from "./_partial/course-row.table";
import CourseDetailDialog from "./_course-detail.dialog";

const Index: AppPageInterface = () => {
  const {
    pageSize,
    currentPage,
    totalRecord,
    update: updatePagination,
  } = usePaginationHook();
  const { modal, openModal, resetModal } = useDialogDetailRow<CourseModel>();

  const {
    data: course,
    isLoading,
    refetch,
  } = useQuery<CourseModel[]>(
    ["list-course", currentPage],
    () => mockCourse(),
    {
      onSuccess: (d) => updatePagination({ total: d.length }),
      refetchOnWindowFocus: false,
    }
  );

  return (
    <div className={"flex h-full flex-col space-y-4 p-4"}>
      <div className="flex justify-end space-x-2">
        <Button onClick={() => openModal("create")} leftIcon={<IconPlus />}>
          Course
        </Button>
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
              course.map((s, i) => (
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
            onClosed={(update?: CourseCreateEntity | CourseUpdateEntity) => {
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

      <Pagination
        position={"center"}
        page={currentPage}
        onChange={(page) => updatePagination({ newPage: page })}
        total={totalRecord / pageSize}
      />
    </div>
  );
};

export default Index;
