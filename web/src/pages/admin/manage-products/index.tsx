import { AppPageInterface } from "../../../interfaces/app-page.interface";
import { USER_ROLE } from "../../../const/user-role.const";
import { Button, Divider, Pagination, Table, TextInput } from "@mantine/core";
import { IconPlus, IconSearch } from "@tabler/icons";
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
import ProductDetailDialog from "../../_shared/products/_product-detail-dialog";
import { useDialogDetailRow } from "../../../hooks/modal-detail-row.hook";
import {
  createProduct,
  updateProduct,
} from "../../../services/product.service";
import { IErrorResponse } from "../../../interfaces/api.interface";
import { useListProductQuery } from "../../../query/model-list";
import { SupplierModel } from "../../../model/supplier.model";
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
    useDialogDetailRow<ProductModel<SupplierModel>>();
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
  } = useListProductQuery(currentPage, updatePagination, {
    pageSize,
    searchQuery: searchKey ? { name: searchKey } : undefined,
  });

  const createMutation = useMutation<
    boolean,
    IErrorResponse,
    ProductCreateEntity
  >((data: ProductCreateEntity) => createProduct(data), {
    onSuccess: () => {
      ShowSuccessCreate();
      resetModal();
      void refetch();
    },
    onError: (err) => {
      console.error(err);
      ShowFailedCreate();
    },
  });

  const updateMutation = useMutation<
    boolean,
    IErrorResponse,
    ProductUpdateEntity
  >(["update-product"], (data: ProductUpdateEntity) => updateProduct(data), {
    onSuccess: () => {
      ShowSuccessUpdate();
      resetModal();
      void refetch();
    },
    onError: (err) => {
      console.error(err);
      ShowFailedUpdate();
    },
  });

  return (
    <div className="flex min-h-full flex-col space-y-4 p-4">
      <div className="flex justify-end space-x-2">
        <Button onClick={() => openModal("create")} leftIcon={<IconPlus />}>
          Thêm mới sản phẩm
        </Button>

        <TextInput
          icon={<IconSearch />}
          placeholder={"Tên sản phẩm..."}
          type={"text"}
          className="w-56"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchWord(e.currentTarget.value)
          }
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
              products.data.map((p, i) => (
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
