export type NotificationViewType = "success" | "error" | "warning";

export type BreadcrumbsType = { path?: string; title: string }[];

export enum SORT_TYPES {
  ASC = "asc",
  DESC = "desc",
}

export type MapClickEvent = {
  get(type: "coords"): number[];
};
