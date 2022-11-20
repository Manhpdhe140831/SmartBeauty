import { AppPageInterface } from "../../../interfaces/app-page.interface";
import CustomerDetail from "../../_shared/customer/customer-detail";
import { USER_ROLE } from "../../../const/user-role.const";
import { useRouter } from "next/router";

const CreatePage: AppPageInterface = () => {
  const router = useRouter();
  const { previousUrl, page } = router.query;

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
    <CustomerDetail
      mode={"create"}
      onBackBtnClicked={() =>
        navigatePreviousPage(
          previousUrl as string,
          page ? Number(page as string) : undefined
        )
      }
    />
  );
};

export default CreatePage;
