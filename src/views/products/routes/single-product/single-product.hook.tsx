import { Form, message, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import { breadcrumbs } from "@products/constants";
import { useAppDispatch, useAppSelector } from "@store/store-hooks";
import { useSearchparams } from "@utils/user-search-params";
import { IProductForm } from "@products/types/products.types";
import { fetchSingleProduct } from "@products/store/products.slice";
import { productService } from "@products/services/product.services";
import { ExclamationCircleFilled } from "@ant-design/icons";

const { confirm } = Modal;

const useSingleProductHook = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, singleProduct } = useAppSelector((state) => ({
    singleProduct: state.productsSlice.singleProduct,
    loading: state.productsSlice.loading,
  }));
  const [formLoading, setFormLoading] = useState(false);
  const {
    searchParams: { update },
  } = useSearchparams();
  const image = Form.useWatch("image", form);

  const $breadcrumbs = useMemo(() => {
    return [...breadcrumbs, { title: update ? "Edit product" : "Add product" }];
  }, [update]);

  const fetchSingleProductHandle = useCallback(
    (id: string) => dispatch(fetchSingleProduct(id)),
    [dispatch]
  );

  useEffect(() => {
    if (update) {
      fetchSingleProductHandle(update);
    }
  }, [fetchSingleProductHandle, update]);

  useEffect(() => {
    if (update && singleProduct) {
      form.setFieldsValue(singleProduct);
    }
  }, [form, singleProduct, update]);

  const onFinish = useCallback(
    async (values: IProductForm) => {
      try {
        setFormLoading(true);

        if (!update) {
          const res = await productService.addProduct(values);

          if (res?.id) {
            message.success("Product successfully added");
            navigate("/products");
          }
        } else {
          const res = await productService.updateProduct(update, values);

          if (res?.id) {
            message.success("Product successfully updated");
            navigate("/products");
          }
        }
      } catch {
        message.error("Something went wrong");
      } finally {
        setFormLoading(false);
      }
    },
    [navigate, update]
  );

  const deleteProduct = useCallback(() => {
    confirm({
      title: "Are you sure delete this product?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        const res = await productService.deleteProduct(+update);
        if (res?.id) {
          message.success("Removed");
          navigate("/products");
        } else {
          message.error("Something went wrong");
        }
      },
    });
  }, [navigate, update]);

  return {
    $breadcrumbs,
    onFinish,
    form,
    update,
    formLoading,
    deleteProduct,
    loading,
    image,
  };
};

export default useSingleProductHook;
