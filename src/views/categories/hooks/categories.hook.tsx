import { RadioChangeEvent } from "antd";
import { useCallback, useEffect } from "react";
import { useSearchparams } from "@utils/user-search-params";
import { useAppDispatch, useAppSelector } from "@store/store-hooks";
import { fetchCategories } from "@categories/store/categories.slice";

const useCategoriesHook = () => {
  const dispatch = useAppDispatch();
  const {
    searchParams: { category },
    setSearchParams,
  } = useSearchparams();
  const { categories, loading } = useAppSelector((state) => ({
    loading: state.categoriesSlice.loading,
    categories: state.categoriesSlice.categories,
  }));

  const fetchCategoriesHandler = useCallback(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (categories.length && !category) {
      setSearchParams("category", categories.at(0) as string);
    }
  }, [categories, category, setSearchParams]);

  useEffect(() => {
    fetchCategoriesHandler();
  }, [fetchCategoriesHandler]);

  const onCategoryChange = useCallback(
    (e: RadioChangeEvent) => {
      setSearchParams("category", e.target.value);
    },
    [setSearchParams]
  );

  return { categories, loading, category, onCategoryChange };
};

export default useCategoriesHook;
