import { AppPageInterface } from "../../../../interfaces/app-page.interface";
import { useRouter } from "next/router";
import useWindowPathname from "../../../../hooks/window-pathname.hook";
import InvoiceDetail from "../../../_shared/invoice/invoice-detail";
import { USER_ROLE } from "../../../../const/user-role.const";

const ManageInvoiceDetail: AppPageInterface = () => {
  const router = useRouter();
  const { paths } = useWindowPathname();
  const { previousUrl, page } = router.query;

  const id = Number(paths.at(-1));

  if (isNaN(id) || id <= 0) {
    void router.replace("/404");
    return <>redirecting</>;
  }

  function navigatePreviousPage(previousUrl?: string, page?: number): void {
    const mainPath = previousUrl ?? `/${USER_ROLE.manager}/manage-invoice`;
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
    <InvoiceDetail
      id={id}
      onBackBtnClicked={() =>
        navigatePreviousPage(
          previousUrl as string,
          page ? Number(page as string) : undefined
        )
      }
    />
  );
};

export default ManageInvoiceDetail;
