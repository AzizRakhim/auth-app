import { useNavigate } from "react-router-dom";
import { MouseEvent, useCallback } from "react";
import { useAppSelector } from "@store/store-hooks";
import { IProduct } from "@products/types/products.types";
import { productService } from "@products/services/products.services";

const useProductsTableHook = () => {
  const navigate = useNavigate();
  const { loading, products } = useAppSelector((state) => ({
    loading: state.productsSlice.loading,
    products: state.productsSlice.products,
  }));

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

  const deleteProductHandle = useCallback(async (id: number) => {
    await productService.deleteProduct(id);
  }, []);

  return { loading, products, onRowHandle, deleteProductHandle };
};

export default useProductsTableHook;
