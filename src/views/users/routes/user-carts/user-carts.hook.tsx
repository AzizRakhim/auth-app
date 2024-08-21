import type { TableColumnsType } from "antd";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useMemo } from "react";
import { CartProductType, ICart } from "@carts/types";
import { fetchUserCarts } from "@users/store/users.slice";
import { fetchProducts } from "@products/store/products.slice";
import CustomTable from "@components/custom-table/custom-table.component";
import { useAppDispatch, useAppSelector } from "@store/store-hooks";

const useUserCartsHook = () => {
  const { id = "" } = useParams();
  const dispatch = useAppDispatch();

  const { loading, products, userCarts, productsLoading } = useAppSelector(
    (state) => ({
      loading: state.usersSlice.loading,
      userCarts: state.usersSlice.userCarts,
      products: state.productsSlice.products,
      productsLoading: state.productsSlice.loading,
    })
  );

  const fetchUserCartsHandler = useCallback(
    () => dispatch(fetchUserCarts(id)),
    [dispatch, id]
  );

  const fetchProductsHandler = useCallback(
    () => dispatch(fetchProducts({})),
    [dispatch]
  );

  useEffect(() => {
    fetchUserCartsHandler();
    fetchProductsHandler();
  }, [fetchProductsHandler, fetchUserCartsHandler]);

  const columns = useMemo<TableColumnsType<ICart>>(
    () => [
      {
        title: "Id",
        dataIndex: "id",
        key: "id",
        align: "center",
      },
      {
        title: "User id",
        dataIndex: "userId",
        key: "userId",
        align: "center",
      },
      {
        title: "Date",
        dataIndex: "date",
        key: "date",
        align: "center",
        render: (date) => {
          return date.split("T")?.at(0);
        },
      },
    ],
    []
  );

  const expandedRowRender = (rowData: ICart) => {
    const columns: TableColumnsType<CartProductType> = [
      {
        title: "Id",
        key: "id",
        render: (rowData) => {
          const product = products.find(
            (product) => product.id === rowData?.productId
          );

          return product?.id;
        },
      },
      {
        title: "Title",
        key: "title",
        render: (rowData) => {
          const product = products.find(
            (product) => product.id === rowData?.productId
          );

          return product?.title;
        },
      },
      { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    ];

    return (
      <CustomTable
        columns={columns}
        pagination={false}
        dataSource={rowData.products}
        rowKey={(record) => record.productId}
      />
    );
  };

  return {
    loading,
    columns,
    userCarts,
    productsLoading,
    expandedRowRender,
  };
};

export default useUserCartsHook;
