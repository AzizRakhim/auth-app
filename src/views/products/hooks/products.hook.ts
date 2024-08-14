import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SORT_TYPES } from "@types";
import { useSearchparams } from "@utils/user-search-params";
import { fetchProducts } from "@products/store/products.slice";
import { useAppDispatch, useAppSelector } from "@store/store-hooks";

const useProductsHook = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    searchParams: { sort = SORT_TYPES.ASC },
    setSearchParams,
  } = useSearchparams();
  const { loading, products } = useAppSelector((state) => ({
    loading: state.productsSlice.loading,
    products: state.productsSlice?.products,
  }));

  const fetchProductsHandler = useCallback(
    () => dispatch(fetchProducts({ sort: sort as SORT_TYPES })),
    [dispatch, sort]
  );

  useEffect(() => {
    fetchProductsHandler();
  }, [fetchProductsHandler]);

  const navigateToAddPage = useCallback(
    () => navigate("/products/product"),
    [navigate]
  );

  const sortProducts = useCallback(
    () =>
      setSearchParams(
        "sort",
        sort === SORT_TYPES.ASC ? SORT_TYPES.DESC : SORT_TYPES.ASC
      ),
    [setSearchParams, sort]
  );

  return {
    loading,
    products,
    fetchProductsHandler,
    navigateToAddPage,
    sortProducts,
    sort,
  };
};

export default useProductsHook;
