import { lazy } from "react";

const publicRoutes = [
  {
    key: "signIn",
    path: `/sign-in`,
    component: lazy(() => import("@auth/auth.component")),
  },
];

const privateRoutes = [
  {
    key: "welcome",
    path: `/welcome`,
    component: lazy(() => import("@welcome/welcome.component")),
  },
  {
    key: "products",
    path: `/products`,
    component: lazy(() => import("@products/products.component")),
  },
  {
    key: "products-id",
    path: `/products/product`,
    component: lazy(
      () => import("@products/routes/single-product/single-product.component")
    ),
  },
  {
    key: "carts",
    path: `/carts`,
    component: lazy(() => import("@carts/carts.component")),
  },
  {
    key: "users",
    path: `/users`,
    component: lazy(() => import("@users/users.component")),
  },
];

export default { publicRoutes, privateRoutes };
