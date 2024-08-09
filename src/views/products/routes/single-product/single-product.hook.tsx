import { Form, message } from "antd";
import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { breadcrumbs } from "@products/constants";
import { useSearchparams } from "@utils/user-search-params";
import { IProductForm } from "@products/types/products.types";
import { productService } from "@products/services/products.services";

const useSingleProductHook = () => {
  const [formLoading, setFormLoading] = useState(false);
  const navigate = useNavigate();
  const {
    searchParams: { update },
  } = useSearchparams();
  const [form] = Form.useForm();

  const $breadcrumbs = useMemo(() => {
    return [...breadcrumbs, { title: update ? "Edit product" : "Add product" }];
  }, [update]);

  const onFinish = useCallback(
    async (values: IProductForm) => {
      try {
        setFormLoading(true);
        const res = await productService.addProduct(values);

        if (res?.id) {
          message.success("Product successfully added");
          navigate("/products");
        }
      } catch {
        message.error("Something went wrong");
      } finally {
        setFormLoading(false);
      }
    },
    [navigate]
  );

  return { $breadcrumbs, onFinish, form, update, formLoading };
};

export default useSingleProductHook;
