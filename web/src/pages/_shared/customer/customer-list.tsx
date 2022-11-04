import { useRouter } from "next/router";
import { USER_ROLE } from "../../../const/user-role.const";
import { Table } from "@mantine/core";
import ListHeaderTable from "./_partial/list/_header.table";
import RowPlaceholderTable from "../../../components/row-placeholder.table";
import { getItemNo } from "../../../hooks/pagination.hook";
import ListRowTable from "./_partial/list/_row.table";
import { CustomerModel } from "../../../model/customer.model";
import { FC } from "react";

type ListCustomerProps = {
  role: USER_ROLE;
  isLoading?: boolean;
  data?: CustomerModel[];

  page: number;
  pageSize: number;
};

const ListCustomer: FC<ListCustomerProps> = ({
  role,
  isLoading,
  data,
  page,
  pageSize,
}) => {
  const router = useRouter();

  function navigateToDetail(role: USER_ROLE, id: number, currentPage: number) {
    const url = `${router.pathname}/detail/${id}`;
    void router.push(
      {
        pathname: url,
        query: {
          previousUrl: router.pathname,
          page: currentPage,
        },
      },
      url
    );
  }

  return (
    <Table
      className={"table-fixed"}
      withBorder
      withColumnBorders
      highlightOnHover
      striped
      cellSpacing={16}
      horizontalSpacing={16}
      verticalSpacing={16}
    >
      <ListHeaderTable />

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
          data &&
          data.map((d, i) => (
            <ListRowTable
              key={d.id}
              data={d}
              no={getItemNo(i, page, pageSize)}
              onSelect={(data) => navigateToDetail(role, data.id, page)}
            />
          ))
        )}
      </tbody>
    </Table>
  );
};

export default ListCustomer;
