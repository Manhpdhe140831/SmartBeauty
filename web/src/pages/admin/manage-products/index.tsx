import { AppPageInterface } from "../../../interfaces/app-page.interface";
import { USER_ROLE } from "../../../const/user-role.const";
import { Button, Divider, Input, Pagination, Table } from "@mantine/core";
import { IconCheck, IconPlus, IconSearch, IconX } from "@tabler/icons";
import ProductHeaderTable from "./_partial/product-header.table";
import ProductRowTable from "./_partial/product-row.table";
import { useMutation } from "@tanstack/react-query";
import {
  ProductCreateEntity,
  ProductModel,
  ProductUpdateEntity,
} from "../../../model/product.model";
import RowPlaceholderTable from "../../../components/row-placeholder.table";
import usePaginationHook, { getItemNo } from "../../../hooks/pagination.hook";
import ProductDetailDialog from "./_product-detail-dialog";
import { useDialogDetailRow } from "../../../hooks/modal-detail-row.hook";
import {
  createProduct,
  updateProduct,
} from "../../../services/product.service";
import { IErrorResponse } from "../../../interfaces/api.interface";
import { showNotification } from "@mantine/notifications";
import { useListProductQuery } from "../../../query/model-list";

const Index: AppPageInterface = () => {
  const { modal, openModal, resetModal } = useDialogDetailRow<ProductModel>();
  const {
    pageSize,
    currentPage,
    totalPage,
    update: updatePagination,
  } = usePaginationHook();

  const {
    data: products,
    isLoading,
    refetch,
  } = useListProductQuery(currentPage, updatePagination);

  const createMutation = useMutation<
    boolean,
    IErrorResponse,
    ProductCreateEntity
  >(["create-product"], (data: ProductCreateEntity) => createProduct(data), {
    onSuccess: () => {
      showNotification({
        title: "Success!",
        message: "You have created a new product!",
        color: "teal",
        icon: <IconCheck />,
      });
      resetModal();
      refetch();
    },
    onError: (e) => {
      console.error(e);
      showNotification({
        title: "Failed!",
        message: "Cannot create new product. Please try again!",
        color: "red",
        icon: <IconX />,
      });
    },
  });

  const updateMutation = useMutation<
    boolean,
    IErrorResponse,
    ProductUpdateEntity
  >(["update-product"], (data: ProductUpdateEntity) => updateProduct(data), {
    onSuccess: () => {
      showNotification({
        title: "Success!",
        message: "You have updated the product!",
        color: "teal",
        icon: <IconCheck />,
      });
      resetModal();
      refetch();
    },
    onError: (e) => {
      console.error(e);
      showNotification({
        title: "Failed!",
        message: "Cannot update the product. Please try again!",
        color: "red",
        icon: <IconX />,
      });
    },
  });

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
            onClosed={async (
              update?: ProductCreateEntity | ProductUpdateEntity
            ) => {
              if (update) {
                console.log(update);

                if (modal.mode === "create") {
                  await createMutation.mutateAsync(
                    update as ProductCreateEntity
                  );
                } else {
                  await updateMutation.mutateAsync(
                    update as ProductUpdateEntity
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
        onChange={(pageNo) => updatePagination({ newPage: pageNo })}
        total={totalPage}
      ></Pagination>
    </div>
  );
};

Index.guarded = USER_ROLE.admin;
Index.routerName = "Manage Products";

export default Index;
