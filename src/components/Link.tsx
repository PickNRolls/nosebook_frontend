import NextLink from "next/link";
import { FC, ReactNode } from "react";

export type LinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
}

export const Link: FC<LinkProps> = (props) => {
  return (
    <NextLink {...props} />
  );
};
