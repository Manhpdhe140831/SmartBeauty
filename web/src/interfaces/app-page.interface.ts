import { NextComponentType, NextPageContext } from "next";

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
  guarded?: boolean;
  routerName?: string;
};
