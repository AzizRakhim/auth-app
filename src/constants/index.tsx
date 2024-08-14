import {
  ProductOutlined,
  UserSwitchOutlined,
  OrderedListOutlined,
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
];

export const RULE = { min: 2, message: "Minimum 2 letters" };
