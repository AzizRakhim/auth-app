import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchparams } from "@utils/user-search-params";
import { fetchProducts } from "@products/store/products.slice";
import { useAppDispatch, useAppSelector } from "@store/store-hooks";

const useProductsHook = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    searchParams: { page = "1", page_size = "10" },
  } = useSearchparams();
  const { loading, products } = useAppSelector((state) => ({
    loading: state.productsSlice.loading,
    products: state.productsSlice?.products,
  }));

  const fetchProductsHandler = useCallback(
    () => dispatch(fetchProducts({ page, page_size })),
    [dispatch, page, page_size]
  );

  useEffect(() => {
    fetchProductsHandler();
  }, [fetchProductsHandler]);

  const navigateToAddPage = useCallback(
    () => navigate("/products/product"),
    [navigate]
  );

  return { loading, products, fetchProductsHandler, navigateToAddPage };
};

export default useProductsHook;
