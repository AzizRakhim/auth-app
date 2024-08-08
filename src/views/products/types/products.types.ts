export interface IProduct {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
}

export enum SORT_TYPES {
  ASC = "asc",
  DESC = "desc",
}
