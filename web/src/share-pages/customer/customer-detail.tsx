import { AppPageInterface } from "../../interfaces/app-page.interface";
import { USER_ROLE } from "../../const/user-role.const";
import { useRouter } from "next/router";
import { Url } from "url";
import { useQuery } from "@tanstack/react-query";
import mockCustomer from "../../mock/customer";
import { Avatar, Button } from "@mantine/core";
import InformationForm from "./_partial/detail/information.form";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons";

type CustomerDetailProps = {
  role: USER_ROLE;
  previousUrl?: string;
  page?: number;
  id: number;
};

const CustomerDetail: AppPageInterface<CustomerDetailProps> = ({
  role,
  page,
  previousUrl,
  id,
}) => {
  const router = useRouter();

  const { data, isLoading } = useQuery(["customer-detail", id], async () => {
    const l = await mockCustomer();
    return l.find((c) => c.id === id);
  });

  function constructPreviousURL(
    previousUrl?: string,
    page?: number
  ): Partial<Url> {
    const mainPath = previousUrl ?? `/${role}/manage-customer`;
    return {
      pathname: mainPath,
      query: page
        ? {
            page: String(page),
          }
        : undefined,
    };
  }

  if (isLoading || !data) {
    return <>loading...</>;
  }

  return (
    <div className={"flex flex-col"}>
      <div className="flex flex-wrap justify-center space-x-8 p-4">
        <div className="flex-start mb-8 flex w-full">
          <Link href={constructPreviousURL(previousUrl, page)}>
            <Button leftIcon={<IconArrowLeft />} component={"a"}>
              Back to List
            </Button>
          </Link>
        </div>

        <Avatar
          size="xl"
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
        />

        <InformationForm readonly={role === USER_ROLE.manager} data={data} />
      </div>
    </div>
  );
};

export default CustomerDetail;
