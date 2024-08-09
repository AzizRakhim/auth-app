import {
  ProductOutlined,
  UserSwitchOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

export const MENUS = [
  {
    key: "products",
    icon: <ProductOutlined />,
    label: "Products",
  },
  {
    key: "carts",
    icon: <ShoppingCartOutlined />,
    label: "Carts",
  },
  {
    key: "users",
    icon: <UserSwitchOutlined />,
    label: "Users",
  },
];

export const RULE = { min: 2, message: "Minimum 2 letters" };
