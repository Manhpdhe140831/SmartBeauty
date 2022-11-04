import { AppPageInterface } from "../../../interfaces/app-page.interface";
import ListCustomer from "../../../share-pages/customer/customer-list";
import { USER_ROLE } from "../../../const/user-role.const";
import { useRouter } from "next/router";

const ManageCustomer: AppPageInterface = () => {
  const router = useRouter();
  return <ListCustomer query={router.query} role={USER_ROLE.manager} />;
};

ManageCustomer.guarded = USER_ROLE.manager;

export default ManageCustomer;
