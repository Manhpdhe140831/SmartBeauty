import { AppPageInterface } from "../../interfaces/app-page.interface";

const Admin: AppPageInterface = () => {
  return <>loading...</>;
};

// navigate the user to manage-branches
export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/admin/manage-branches",
      permanent: false,
    },
  };
}

export default Admin;
