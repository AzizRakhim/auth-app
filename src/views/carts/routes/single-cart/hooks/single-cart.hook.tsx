import { Form, message, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CartFormType } from "@carts/types";
import { breadcrumbs } from "@carts/constants";
import { fetchUsers } from "@users/store/users.slice";
import { fetchSingleCart } from "@carts/store/carts.slice";
import { useSearchparams } from "@utils/user-search-params";
import { cartService } from "@carts/services/cart.services";
import { fetchProducts } from "@products/store/products.slice";
import { useAppDispatch, useAppSelector } from "@store/store-hooks";

const { confirm } = Modal;

const useSingleCartHook = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [formLoading, setFormLoading] = useState(false);
  const {
    searchParams: { update },
  } = useSearchparams();

  const fetchUsersHandler = useCallback(
    () => dispatch(fetchUsers({})),
    [dispatch]
  );

  const fetchProductsHandler = useCallback(
    () => dispatch(fetchProducts({})),
    [dispatch]
  );

  useEffect(() => {
    fetchUsersHandler();
    fetchProductsHandler();
  }, [fetchProductsHandler, fetchUsersHandler]);

  const fetchSingleCartHandler = useCallback(
    (id: string) => dispatch(fetchSingleCart(id)),
    [dispatch]
  );

  useEffect(() => {
    if (update) {
      fetchSingleCartHandler(update);
    }
  }, [fetchSingleCartHandler, update]);

  const {
    users,
    loading,
    products,
    singleCart,
    usersLoading,
    productsLoading,
  } = useAppSelector((state) => ({
    users: state.usersSlice.users,
    loading: state.cartsSlice.loading,
    usersLoading: state.usersSlice.loading,
    products: state.productsSlice.products,
    singleCart: state.cartsSlice.singleCart,
    productsLoading: state.productsSlice.loading,
  }));

  useEffect(() => {
    if (update && singleCart) {
      form.setFieldValue("userId", String(singleCart.userId));
      form.setFieldValue(
        "productIds",
        singleCart.products.map((product) => String(product.productId))
      );
      const productsObject: { [key: string]: { quantity: number } } =
        singleCart.products.reduce((acc, product) => {
          acc[`products-${product.productId}`] = {
            quantity: product.quantity,
          };
          return acc;
        }, {} as { [key: string]: { quantity: number } });

      form.setFieldsValue(productsObject);
    }
  }, [form, singleCart, update]);

  const $breadcrumbs = useMemo(() => {
    return [...breadcrumbs, { title: update ? "Edit cart" : "Add cart" }];
  }, [update]);

  const onFinish = useCallback(
    async (values: CartFormType) => {
      try {
        setFormLoading(true);

        const products = values.productIds.map((productId) => {
          const key = `products-${productId}`;

          const quantity = values[key]?.quantity || 1;

          return {
            productId: Number(productId),
            quantity: quantity,
          };
        });

        const $values = {
          userId: +values.userId,
          date: singleCart?.date
            ? singleCart?.date.split("T")[0]
            : new Date().toISOString().split("T")[0],
          products,
        };

        if (!update) {
          const res = await cartService.addCart($values);

          if (res?.id) {
            message.success("Cart successfully added");
            navigate("/carts");
          }
        } else {
          const res = await cartService.updateCart(update, $values);

          if (res) {
            message.success("Cart successfully updated");
            navigate("/carts");
          }
        }
      } catch {
        message.error("Something went wrong");
      } finally {
        setFormLoading(false);
      }
    },
    [navigate, singleCart?.date, update]
  );

  const deleteCart = useCallback(() => {
    confirm({
      title: "Are you sure delete this cart?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        const res = await cartService.deleteCart(+update);
        if (res?.id) {
          message.success("Removed");
          navigate("/carts");
        } else {
          message.error("Something went wrong");
        }
      },
    });
  }, [navigate, update]);

  const userOptions = useMemo(
    () =>
      users.map((user) => ({
        value: String(user.id),
        label: user.name.firstname + " " + user.name.lastname,
      })),
    [users]
  );

  const productOptions = useMemo(
    () =>
      products.map((product) => ({
        value: String(product.id),
        label: product.title,
      })),
    [products]
  );

  return {
    form,
    update,
    loading,
    onFinish,
    deleteCart,
    formLoading,
    userOptions,
    $breadcrumbs,
    usersLoading,
    productOptions,
    setFormLoading,
    productsLoading,
  };
};

export default useSingleCartHook;
