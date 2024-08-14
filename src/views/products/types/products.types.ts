export interface IProduct {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
  rating: RatingType;
}

type RatingType = {
  rate: number;
  count: number;
};

export type IProductForm = {
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
};
