import React from "react";

export type NavLinkItemBaseProp = {
  href: string;
  label: string | React.ReactNode;
  description?: string | React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

export type NavLinkItemNestedProp = Omit<NavLinkItemBaseProp, "href"> & {
  nested: NavLinkItemBaseProp[];
};

export type NavLinkItemProp = NavLinkItemBaseProp | NavLinkItemNestedProp;
