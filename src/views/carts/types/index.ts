export interface ICart {
  id?: number;
  userId: number;
  date: string;
  products: CartProductType[];
}

type CartProductType = {
  productId: number;
  quantity: number;
};

export type CartFormType = {
  userId: string;
  productIds: number[];
} & Record<string, { quantity: number }>;
