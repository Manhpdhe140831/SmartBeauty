import { AppPageInterface } from "../../../../interfaces/app-page.interface";
import { USER_ROLE } from "../../../../const/user-role.const";
import CustomerDetail from "../../../../share-pages/customer/customer-detail";
import { useRouter } from "next/router";
import useWindowPathname from "../../../../hooks/window-pathname.hook";

const ManageCustomerDetail: AppPageInterface = () => {
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
      role={USER_ROLE.manager}
      previousUrl={previousUrl as string}
      page={page ? Number(page as string) : undefined}
    />
  );
};

ManageCustomerDetail.guarded = USER_ROLE.manager;

export default ManageCustomerDetail;
