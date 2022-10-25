import { AppPageInterface } from "../../../interfaces/app-page.interface";
import { USER_ROLE } from "../../../const/user-role.const";
import { Button, Divider, Input, Pagination, Table } from "@mantine/core";
import { IconPlus, IconSearch } from "@tabler/icons";
import { useState } from "react";
import ProductTableHeader from "./_partial/product-table.header";
import ProductTableRow from "./_partial/product-table.row";

const Index: AppPageInterface = () => {
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  return (
    <div className="flex h-full flex-col space-y-4 p-4">
      <div className="flex justify-end space-x-2">
        <Button leftIcon={<IconPlus />}>New Product</Button>

        <Input
          icon={<IconSearch />}
          placeholder={"product name..."}
          type={"text"}
          className="w-56"
        />
      </div>
      <Divider my={8} />

      <div className="flex-1">
        <Table className="table-fixed">
          <ProductTableHeader />
          <tbody>
            <ProductTableRow></ProductTableRow>
          </tbody>
        </Table>
      </div>

      <Divider my={8} />

      {/*Total record / 10 (per-page)*/}
      <Pagination
        position={"center"}
        page={page}
        onChange={setPage}
        total={totalRecords / 10}
      ></Pagination>
    </div>
  );
};

Index.guarded = USER_ROLE.admin;
Index.routerName = "Manage Products";

export default Index;
