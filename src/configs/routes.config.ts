import { lazy } from "react";

const publicRoutes = [
  {
    key: "signIn",
    path: `/sign-in`,
    component: lazy(() => import("@auth/index")),
  },
];

const privateRoutes = [
  {
    key: "welcome",
    path: `/welcome`,
    component: lazy(() => import("@welcome/index")),
  },
  {
    key: "products",
    path: `/products`,
    component: lazy(() => import("@products/index")),
  },
];

export default { publicRoutes, privateRoutes };
