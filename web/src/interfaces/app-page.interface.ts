import { NextComponentType, NextPageContext } from "next";

export type AppPageInterface = NextComponentType<NextPageContext, unknown, unknown> & {
  useLayout?: (
    renderPage: JSX.Element
  ) => JSX.Element,
  guarded?: boolean
};