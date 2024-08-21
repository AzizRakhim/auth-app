import { RuleObject } from "antd/es/form";
import { Form, message, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { useCallback, useEffect, useMemo, useState } from "react";
import { MapClickEvent } from "@types";
import { breadcrumbs } from "@users/constants";
import { IUser, UserFormType } from "@users/types";
import { fetchSingleUser } from "@users/store/users.slice";
import { useSearchparams } from "@utils/user-search-params";
import { userService } from "@users/services/user.services";
import { useAppDispatch, useAppSelector } from "@store/store-hooks";

const { confirm } = Modal;

const useSingleUserHook = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [formLoading, setFormLoading] = useState(false);
  const [coordinates, setCoordinates] = useState<number[]>([
    41.31451, 69.236285,
  ]);
  const dispatch = useAppDispatch();
  const { loading, singleUser } = useAppSelector((state) => ({
    loading: state.usersSlice.loading,
    singleUser: state.usersSlice.singleUser,
  }));
  const {
    searchParams: { update },
  } = useSearchparams();

  const $breadcrumbs = useMemo(() => {
    return [...breadcrumbs, { title: update ? "Edit user" : "Add user" }];
  }, [update]);

  const fetchSingleUserHandle = useCallback(
    (id: string) => dispatch(fetchSingleUser(id)),
    [dispatch]
  );

  useEffect(() => {
    if (update) {
      fetchSingleUserHandle(update);
    }
  }, [fetchSingleUserHandle, update]);

  useEffect(() => {
    if (update && singleUser) {
      form.setFieldsValue(singleUser);
      form.setFieldValue("confirm", singleUser.password);
      form.setFieldValue("phone", singleUser.phone);
      setCoordinates([
        +singleUser?.address?.geolocation?.lat,
        +singleUser?.address?.geolocation?.long,
      ]);
    }
  }, [form, singleUser, update]);

  const onFinish = useCallback(
    async (values: UserFormType) => {
      try {
        setFormLoading(true);

        const $values: IUser & { confirm?: string } = {
          ...values,
          phone: `${values.phone.countryCode}${values.phone.areaCode}${values.phone.phoneNumber}`,
        };
        delete $values.confirm;

        if (!update) {
          const res = await userService.addUser($values);

          if (res?.id) {
            message.success("User successfully added");
            navigate("/users");
          }
        } else {
          const res = await userService.updateUser(update, $values);

          if (res) {
            message.success("User successfully updated");
            navigate("/users");
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

  const deleteUser = useCallback(() => {
    confirm({
      title: "Are you sure delete this product?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        const res = await userService.deleteUser(+update);
        if (res?.id) {
          message.success("Removed");
          navigate("/users");
        } else {
          message.error("Something went wrong");
        }
      },
    });
  }, [navigate, update]);

  const validator = (_: RuleObject, { valid }: { valid: () => boolean }) => {
    if (valid()) return Promise.resolve();
    return Promise.reject("Invalid phone number");
  };

  const setMapRef = useCallback(
    (e: MapClickEvent) => {
      const coords = e.get("coords");
      setCoordinates(coords);
      form.setFieldValue(["address", "geolocation", "lat"], String(coords[0]));
      form.setFieldValue(["address", "geolocation", "long"], String(coords[1]));
    },
    [form]
  );

  const navigateToUserCarts = useCallback(
    () => navigate(`/users/cart/${update}`),
    [navigate, update]
  );

  return {
    form,
    update,
    loading,
    onFinish,
    validator,
    setMapRef,
    deleteUser,
    formLoading,
    coordinates,
    $breadcrumbs,
    navigateToUserCarts,
  };
};

export default useSingleUserHook;
