import { AppPageInterface } from "../../../../interfaces/app-page.interface";
import { useRouter } from "next/router";
import useWindowPathname from "../../../../hooks/window-pathname.hook";
import CustomerDetail from "../../../_shared/customer/customer-detail";
import { USER_ROLE } from "../../../../const/user-role.const";

const SaleStaffCustomerDetail: AppPageInterface = () => {
  const router = useRouter();
  const { paths } = useWindowPathname();
  const { previousUrl, page } = router.query;

  const id = Number(paths.at(-1));

  if (isNaN(id) || id <= 0) {
    void router.replace("/404");
    return <>redirecting</>;
  }

  return (
    <CustomerDetail
      id={id}
      role={USER_ROLE.sale_staff}
      previousUrl={previousUrl as string}
      page={page ? Number(page as string) : undefined}
    />
  );
};

export default SaleStaffCustomerDetail;
