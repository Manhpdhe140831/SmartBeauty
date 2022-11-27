import { AppPageInterface } from "../../interfaces/app-page.interface";
import { USER_ROLE } from "../../const/user-role.const";

const TechincalStaff: AppPageInterface = () => {
  return <>loading...</>;
};

// navigate the user to manage-branches
export async function getServerSideProps() {
  return {
    redirect: {
      destination: `/${USER_ROLE.technical_staff}/schedule`,
      permanent: false,
    },
  };
}

TechincalStaff.guarded = USER_ROLE.technical_staff;

export default TechincalStaff;
