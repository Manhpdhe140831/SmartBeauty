import { AppPageInterface } from "../../../interfaces/app-page.interface";
import { USER_ROLE } from "../../../const/user-role.const";

const Index: AppPageInterface = () => {
  return <>Manage Products</>;
};

Index.guarded = USER_ROLE.admin;
Index.routerName = "Manage Products";

export default Index;
