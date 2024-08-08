import { FC, HTMLProps } from "react";

type AuthLayoutType = Pick<HTMLProps<HTMLElement>, "children">;

const AuthLayout: FC<AuthLayoutType> = ({ children }) => {
  return children;
};

export default AuthLayout;
