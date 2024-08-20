import {
  ProductOutlined,
  UserSwitchOutlined,
  OrderedListOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

export const MENUS = [
  {
    key: "products",
    icon: <ProductOutlined />,
    label: "Products",
  },
  {
    key: "categories",
    icon: <OrderedListOutlined />,
    label: "Categories",
  },
  {
    key: "users",
    icon: <UserSwitchOutlined />,
    label: "Users",
  },
  {
    key: "carts",
    icon: <ShoppingCartOutlined />,
    label: "Carts",
  },
];

export const RULE = { min: 2, message: "Minimum 2 letters" };
