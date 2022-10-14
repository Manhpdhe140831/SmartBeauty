import { FC } from "react";
import LinkNavbar, { LinkNavbarProps } from "./link.navbar";

type MainLinksNavbarProps = {
  links: LinkNavbarProps[];
};

const MainLinksNavbar: FC<MainLinksNavbarProps> = ({ links }) => {
  return (
    <>
      {links.map((link) => (
        <LinkNavbar key={link.href} {...link}></LinkNavbar>
      ))}
    </>
  );
};

export default MainLinksNavbar;
