import { AppPageInterface } from "../../../interfaces/app-page.interface";
import CustomerDetail from "../../_shared/customer/customer-detail";
import { USER_ROLE } from "../../../const/user-role.const";
import { useRouter } from "next/router";
import { LoadingOverlay } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { createCustomer } from "../../../services/customer.service";
import { CustomerCreateEntity } from "../../../model/customer.model";
import { showNotification } from "@mantine/notifications";
import { IconX } from "@tabler/icons";
import { IErrorResponse } from "../../../interfaces/api.interface";
import {
  ShowFailedCreate,
  ShowSuccessCreate,
} from "../../../utilities/show-notification";

const CreatePage: AppPageInterface = () => {
  const router = useRouter();
  const { previousUrl, page } = router.query;

  const { mutate, isLoading } = useMutation(
    ["create-customer"],
    (payload: CustomerCreateEntity) => createCustomer(payload),
    {
      onSuccess: (status) => {
        if (status) {
          ShowSuccessCreate();
          return navigatePreviousPage();
        }
        ShowFailedCreate();
      },
      onError: (e: IErrorResponse) => {
        showNotification({
          title: "Thất Bại!",
          message: e.message,
          color: "red",
          icon: <IconX />,
        });
      },
    }
  );

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
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
      <CustomerDetail
        mode={"create"}
        onInfoChanged={(d) => mutate(d as CustomerCreateEntity)}
        onBackBtnClicked={() =>
          navigatePreviousPage(
            previousUrl as string,
            page ? Number(page as string) : undefined
          )
        }
      />
    </>
  );
};

export default CreatePage;
