import { NextComponentType, NextPageContext } from "next";
import { USER_ROLE } from "../const/user-role.const";

export type BreadCrumbsInfo = {
  title: string;
  href: string;
};

export type AppPageInterface<Props = unknown> = NextComponentType<
  NextPageContext,
  unknown,
  Props
> & {
  useLayout?: (renderPage: JSX.Element) => JSX.Element;
  guarded?: USER_ROLE;
  routerName?: string;
};
