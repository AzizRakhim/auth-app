import { ColumnsType } from "antd/es/table";
import { useCallback, useEffect, useMemo } from "react";
import { IProduct } from "@products/types/products.types";
import { useSearchparams } from "@utils/user-search-params";
import { useAppDispatch, useAppSelector } from "@store/store-hooks";
import { fetchSingleCategories } from "@categories/store/categories.slice";

const useCategoriesTableHook = () => {
  const dispatch = useAppDispatch();
  const {
    searchParams: { category },
  } = useSearchparams();
  const { singleCategories, singleLoading } = useAppSelector((state) => ({
    singleLoading: state.categoriesSlice.singleLoading,
    singleCategories: state.categoriesSlice.singleCategories,
  }));

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
    ],
    []
  );

  const fetchSingleCategoriesHandler = useCallback(() => {
    if (category) {
      dispatch(
        fetchSingleCategories({
          category,
        })
      );
    }
  }, [category, dispatch]);

  useEffect(() => {
    fetchSingleCategoriesHandler();
  }, [fetchSingleCategoriesHandler]);

  return { singleCategories, singleLoading, columns };
};

export default useCategoriesTableHook;
