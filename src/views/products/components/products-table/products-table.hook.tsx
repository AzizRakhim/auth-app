import { ColumnsType } from "antd/es/table";
import { Button, message, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { MouseEvent, useCallback, useMemo } from "react";
import { DeleteFilled, ExclamationCircleFilled } from "@ant-design/icons";
import { useSearchparams } from "@utils/user-search-params";
import { fetchProducts } from "@products/store/products.slice";
import { useAppDispatch, useAppSelector } from "@store/store-hooks";
import { IProduct, SORT_TYPES } from "@products/types/products.types";
import { productService } from "@products/services/products.services";

const { confirm } = Modal;

const useProductsTableHook = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, products } = useAppSelector((state) => ({
    loading: state.productsSlice.loading,
    products: state.productsSlice.products,
  }));
  const {
    searchParams: { sort = SORT_TYPES.ASC },
  } = useSearchparams();

  const deleteProduct = useCallback(
    (e: MouseEvent<HTMLElement, globalThis.MouseEvent>, id: number) => {
      e.stopPropagation();
      confirm({
        title: "Are you sure delete this product?",
        icon: <ExclamationCircleFilled />,
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        onOk: async () => {
          const res = await productService.deleteProduct(id);
          if (res?.id) {
            message.success("Removed");
            dispatch(fetchProducts({ sort: sort as SORT_TYPES }));
          } else {
            message.error("Something went wrong");
          }
        },
      });
    },
    [dispatch, sort]
  );

  const columns = useMemo<ColumnsType<IProduct>>(
    () => [
      {
        title: "Id",
        dataIndex: "id",
        key: "id",
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
        align: "center",
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
      {
        title: "Image",
        dataIndex: "image",
        key: "image",
        render: (image) => {
          return (
            <div className="w-[50px] h-[50px]">
              <img
                src={image}
                alt={"product image"}
                className="w-full h-full object-contain"
              />
            </div>
          );
        },
        align: "center",
      },
      {
        title: "Rate",
        dataIndex: "rating",
        key: "rate",
        render: (rating) => {
          return rating.rate;
        },
        align: "center",
      },
      {
        title: "Rate count",
        dataIndex: "rating",
        key: "rate-count",
        render: (rating) => {
          return rating.count;
        },
        width: 150,
        align: "center",
      },
      {
        title: "Actions",
        key: "actions",
        align: "center",
        render: (rowData) => {
          return (
            <Button
              type="primary"
              icon={<DeleteFilled />}
              onClick={(e) => deleteProduct(e, rowData?.id)}
            />
          );
        },
      },
    ],
    [deleteProduct]
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

  return { loading, products, onRowHandle, columns };
};

export default useProductsTableHook;