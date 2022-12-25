import { AppPageInterface } from "../../../../interfaces/app-page.interface";
import { useRouter } from "next/router";
import useWindowPathname from "../../../../hooks/window-pathname.hook";
import CustomerDetail from "../../../_shared/customer/customer-detail";
import { USER_ROLE } from "../../../../const/user-role.const";
import { useCustomerDetailQuery } from "../../../../query/model-detail";
import { useMutation } from "@tanstack/react-query";
import {
  deleteCustomer,
  updateCustomer,
} from "../../../../services/customer.service";
import { CustomerUpdateEntity } from "../../../../model/customer.model";
import { IErrorResponse } from "../../../../interfaces/api.interface";
import { LoadingOverlay } from "@mantine/core";
import {
  ShowFailedDelete,
  ShowFailedUpdate,
  ShowSuccessDelete,
  ShowSuccessUpdate,
} from "../../../../utilities/show-notification";

const SaleStaffCustomerDetail: AppPageInterface = () => {
  const router = useRouter();
  const { paths } = useWindowPathname();
  const { previousUrl, page } = router.query;

  const id = Number(paths.at(-1));

  const { data, isLoading } = useCustomerDetailQuery(id);

  const { mutate, isLoading: mutateLoading } = useMutation(
    ["update-customer"],
    (payload: CustomerUpdateEntity) => updateCustomer(payload),
    {
      onSuccess: (status) => {
        if (status) {
          ShowSuccessUpdate();
          return navigatePreviousPage();
        }
        ShowFailedUpdate();
      },
      onError: (e: IErrorResponse) => {
        ShowFailedUpdate();
      },
    }
  );

  const deleteMutation = useMutation(
    ["delete-customer"],
    (id: number) => deleteCustomer(id),
    {
      onSuccess: (d) => {
        if (d) {
          ShowSuccessDelete();
          return navigatePreviousPage();
        }
        ShowFailedDelete();
      },
      onError: (e) => {
        console.error(e);
        ShowFailedDelete();
      },
    }
  );

  if (isNaN(id) || id <= 0 || (!isLoading && !data)) {
    void router.replace("/404");
    return <>redirecting</>;
  }

  function navigatePreviousPage(previousUrl?: string, page?: number): void {
    const mainPath = previousUrl ?? `/${USER_ROLE.sale_staff}/customer`;
    void router.push({
      pathname: mainPath,
      query: page
        ? {
            page: String(page),
          }
        : undefined,
    });
  }

  return (
    <>
      <LoadingOverlay visible={isLoading || mutateLoading} overlayBlur={2} />
      {data && (
        <CustomerDetail
          data={data}
          onDelete={deleteMutation.mutate}
          onInfoChanged={(d) => mutate(d as CustomerUpdateEntity)}
          mode={"view"}
          onBackBtnClicked={() =>
            navigatePreviousPage(
              previousUrl as string,
              page ? Number(page as string) : undefined
            )
          }
        />
      )}
    </>
  );
};

export default SaleStaffCustomerDetail;
