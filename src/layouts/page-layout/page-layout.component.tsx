import { Spin } from "antd";
import { HTMLProps } from "react";
import { BreadcrumbsType } from "@types";
import Breadcrumbs from "@components/breadcrumbs/breadcrumbs.component";

type PageLayoutType = {
  breadcrumbs?: BreadcrumbsType;
  loading?: boolean;
} & Pick<HTMLProps<HTMLElement>, "children">;

const PageLayout = ({ children, breadcrumbs, loading }: PageLayoutType) => {
  return (
    <div style={{ maxHeight: "calc(100dvh - 64px)" }} className="h-full">
      {loading ? (
        <div className="w-full h-full flex items-center justify-center">
          <Spin size="large" />
        </div>
      ) : (
        <>
          {breadcrumbs && (
            <div className="mb-[24px]">
              <Breadcrumbs items={breadcrumbs} />
            </div>
          )}
          <div>{children}</div>
        </>
      )}
    </div>
  );
};

export default PageLayout;
