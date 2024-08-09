import { useMemo } from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { BreadcrumbsType as BreadcrumbItemsType } from "@types";

type BreadcrumbsType = {
  items: BreadcrumbItemsType;
};

const Breadcrumbs = ({ items }: BreadcrumbsType) => {
  const $items = useMemo(() => {
    return items.map((item) => ({
      title: item.path ? <Link to={item.path}>{item.title}</Link> : item.title,
    }));
  }, [items]);

  return <Breadcrumb items={$items} />;
};

export default Breadcrumbs;
