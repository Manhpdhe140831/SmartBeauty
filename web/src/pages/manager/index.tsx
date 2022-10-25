import { AppPageInterface } from "../../interfaces/app-page.interface";

const Manager: AppPageInterface = () => {
  return <>loading...</>;
};

// navigate the user to manage-branches
export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/manager/manage-branches",
      permanent: false,
    },
  };
}

export default Manager;
