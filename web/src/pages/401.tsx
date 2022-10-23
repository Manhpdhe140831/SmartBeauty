import className from "./../styles/UnAuthorizedPage.module.scss";
import { AppPageInterface } from "../interfaces/app-page.interface";
import { USER_ROLE } from "../const/user-role.const";
import { Button } from "@mantine/core";
import { useAuthUser } from "../store/auth-user.state";
import Link from "next/link";

const PageUnauthenticated: AppPageInterface = () => {
  const authState = useAuthUser();

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center space-y-4 text-gray-600 transition-all">
      <h1 className={className.title}>Error 404</h1>

      <Link href={authState.user ? "/" : "/login"} passHref>
        <Button sx={{ width: "200px" }} variant={"outline"} component={"a"}>
          {authState.user ? "Back to Home" : "To Login"}
        </Button>
      </Link>
    </div>
  );
};

PageUnauthenticated.guarded = USER_ROLE.anonymous;
PageUnauthenticated.useLayout = (p) => p;

export default PageUnauthenticated;
