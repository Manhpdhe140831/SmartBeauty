import { AppPageInterface } from "../../../interfaces/app-page.interface";
import { USER_ROLE } from "../../../const/user-role.const";
import { Button, Divider, Input, Pagination, Table } from "@mantine/core";
import { IconPlus, IconSearch } from "@tabler/icons";
import ProductHeaderTable from "./_partial/product-header.table";
import ProductRowTable from "./_partial/product-row.table";
import { useQuery } from "@tanstack/react-query";
import {
  ProductCreateEntity,
  ProductModel,
  ProductUpdateEntity,
} from "../../../model/product.model";
import mockProduct from "../../../mock/product";
import RowPlaceholderTable from "../../../components/row-placeholder.table";
import usePaginationHook, { getItemNo } from "../../../hooks/pagination.hook";
import ProductDetailDialog from "./_product-detail-dialog";
import { useDialogDetailRow } from "../../../hooks/modal-detail-row.hook";

const Index: AppPageInterface = () => {
  const { modal, openModal, resetModal } = useDialogDetailRow<ProductModel>();
  const {
    pageSize,
    currentPage,
    totalRecord,
    update: updatePagination,
  } = usePaginationHook();

  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery<ProductModel[]>(
    ["list-product", currentPage],
    async () => {
      const productList = await mockProduct();
      updatePagination({ total: productList.length });
      return productList;
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  return (
    <div className="flex min-h-full flex-col space-y-4 p-4">
      <div className="flex justify-end space-x-2">
        <Button onClick={() => openModal("create")} leftIcon={<IconPlus />}>
          Product
        </Button>

        <Input
          icon={<IconSearch />}
          placeholder={"product name..."}
          type={"text"}
          className="w-56"
        />
      </div>
      <Divider my={8} />
      <div className="flex-1">
        <Table withBorder className="table-fixed">
          <ProductHeaderTable />
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
              products &&
              products.map((p, i) => (
                <ProductRowTable
                  onClick={(product) => openModal("view", product)}
                  key={p.id}
                  data={p}
                  no={getItemNo(i, currentPage, pageSize)}
                />
              ))
            )}
          </tbody>
        </Table>
        {modal && (
          <ProductDetailDialog
            mode={modal.mode as never} // silent the TS-error
            data={modal.data}
            opened={!!modal}
            onClosed={(update?: ProductCreateEntity | ProductUpdateEntity) => {
              if (update) {
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
        onChange={(pageNo) => updatePagination({ newPage: pageNo })}
        total={totalRecord / pageSize}
      ></Pagination>
    </div>
  );
};

Index.guarded = USER_ROLE.admin;
Index.routerName = "Manage Products";

export default Index;
