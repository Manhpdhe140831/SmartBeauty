import { AppPageInterface } from "../../interfaces/app-page.interface";
import { USER_ROLE } from "../../const/user-role.const";

const SaleStaff: AppPageInterface = () => {
  return <>loading...</>;
};

// navigate the user to manage-branches
export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/sale_staff/schedule",
      permanent: false,
    },
  };
}

SaleStaff.guarded = USER_ROLE.sale_staff;

export default SaleStaff;
