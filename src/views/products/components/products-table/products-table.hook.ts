import { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import { MouseEvent, useCallback, useMemo } from "react";
import { useAppSelector } from "@store/store-hooks";
import { IProduct } from "@products/types/products.types";
import { useSearchparams } from "@utils/user-search-params";

const useProductsTableHook = () => {
  const navigate = useNavigate();
  const {
    searchParams: { page, page_size },
  } = useSearchparams();
  const { loading, products } = useAppSelector((state) => ({
    loading: state.productsSlice.loading,
    products: state.productsSlice.products,
  }));

  const columns = useMemo<ColumnsType<IProduct>>(
    () => [
      {
        title: "№",
        dataIndex: "number",
        key: "number",
        render: (_, __, index) =>
          ((+page || 1) - 1) * (+page_size || 15) + index + 1,
      },
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
        width: 250,
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
        width: 100,
      },
      {
        title: "Category",
        dataIndex: "category",
        key: "category",
        width: 150,
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
      },
    ],
    [page, page_size]
  );

  const onRowHandle = useCallback(
    (product: IProduct) => {
      return {
        onClick: (event: MouseEvent) => {
          if (event.ctrlKey) {
            window.open(`/products/product?update=${product?.id}`, "_blank");
          }
        },
        onDoubleClick: () => {
          navigate(`/products/product?update=${product?.id}`);
        },
        style: {
          cursor: "pointer",
        },
      };
    },
    [navigate]
  );

  return { columns, loading, products, onRowHandle };
};

export default useProductsTableHook;
