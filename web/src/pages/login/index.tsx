import { AppPageInterface } from "../../interfaces/app-page.interface";
import Logo from "../../components/logo";
import { Button, Divider, Input } from "@mantine/core";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";
import Link from "next/link";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(2),
});

const Login: AppPageInterface = () => {
  // TODO: use authentication
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  return (
    <div className="grid min-h-screen w-full place-items-center">
      <form className="flex w-11/12 flex-col rounded bg-white p-8 shadow-lg md:w-96">
        <div className="flex justify-center">
          <Logo h={"3rem"} fontSize={"text-[1.75rem]"} />
        </div>

        <Divider my={16} />

        <label htmlFor={"email"} className="mt-4 mb-1">
          Email
        </label>
        <Input
          id={"email"}
          placeholder="nhập email..."
          {...register("email")}
        />
        <ErrorMessage
          errors={errors}
          name="email"
          render={({ message }) => (
            <small className="text-red-600">{message}</small>
          )}
        />

        <label className="mt-4 mb-1" htmlFor="password">
          Mật Khẩu
        </label>
        <Input
          placeholder={"nhập mật khẩu..."}
          type={"password"}
          id={"password"}
          {...register("password")}
        />
        <ErrorMessage
          errors={errors}
          name="password"
          render={({ message }) => (
            <small className="text-red-600">{message}</small>
          )}
        />

        <Button
          sx={{
            background: "#A275E3",
            ":hover": {
              background: "#8f5dd7",
            },
          }}
          variant="filled"
          className="mt-4 mb-2"
        >
          Đăng Nhập
        </Button>

        <Link href={"/forgot-password"}>
          <a className="mt-2 mb-4 text-center text-xs text-blue-500">
            Quên mật khẩu
          </a>
        </Link>

        <Divider my={16} />

        <Link href={"/register"}>
          <Button variant={"light"}>Đăng kí</Button>
        </Link>
      </form>
    </div>
  );
};

Login.useLayout = (p) => p;

export default Login;
