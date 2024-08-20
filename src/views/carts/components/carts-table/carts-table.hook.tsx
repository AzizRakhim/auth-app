import { ColumnsType } from "antd/es/table";
import { Button, message, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { MouseEvent, useCallback, useMemo } from "react";
import { DeleteFilled, ExclamationCircleFilled } from "@ant-design/icons";
import { SORT_TYPES } from "@types";
import { ICart } from "@carts/types";
import { fetchCarts } from "@carts/store/carts.slice";
import { useSearchparams } from "@utils/user-search-params";
import { cartService } from "@carts/services/cart.services";
import { useAppDispatch, useAppSelector } from "@store/store-hooks";

const { confirm } = Modal;

const useCartsTableHook = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { users, carts, loading, usersLoading } = useAppSelector((state) => ({
    users: state.usersSlice.users,
    carts: state.cartsSlice.carts,
    loading: state.cartsSlice.loading,
    usersLoading: state.usersSlice.loading,
  }));
  const {
    searchParams: { sort = SORT_TYPES.ASC },
  } = useSearchparams();

  const deleteCart = useCallback(
    (e: MouseEvent<HTMLElement, globalThis.MouseEvent>, id: number) => {
      e.stopPropagation();
      confirm({
        title: "Are you sure to delete this cart?",
        icon: <ExclamationCircleFilled />,
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        onOk: async () => {
          const res = await cartService.deleteCart(id);
          if (res?.id) {
            message.success("Removed");
            dispatch(fetchCarts({ sort: sort as SORT_TYPES }));
          } else {
            message.error("Something went wrong");
          }
        },
      });
    },
    [dispatch, sort]
  );

  const columns = useMemo<ColumnsType<ICart>>(
    () => [
      {
        title: "Id",
        dataIndex: "id",
        key: "id",
        align: "center",
      },
      {
        title: "User id",
        dataIndex: "userId",
        key: "userId",
        align: "center",
      },
      {
        title: "Date",
        dataIndex: "date",
        key: "date",
        align: "center",
        render: (date) => {
          return date.split("T")?.at(0);
        },
      },
      {
        title: "Name",
        children: [
          {
            title: "First name",
            key: "firstname",
            align: "center",
            width: 170,
            render: (rowData) => {
              const user = users.find((user) => user.id === rowData?.userId);

              return user?.name?.firstname;
            },
          },
          {
            title: "Last name",
            key: "lastname",
            align: "center",
            width: 170,
            render: (rowData) => {
              const user = users.find((user) => user.id === rowData?.userId);

              return user?.name?.lastname;
            },
          },
        ],
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
              onClick={(e) => deleteCart(e, rowData?.id)}
            />
          );
        },
      },
    ],
    [deleteCart, users]
  );

  const onRowHandle = useCallback(
    (user: ICart) => {
      return {
        onClick: () => {
          navigate(`/carts/cart?update=${user?.id}`);
        },
        onDoubleClick: () => {
          navigate(`/carts/cart?update=${user?.id}`);
        },
        style: {
          cursor: "pointer",
        },
      };
    },
    [navigate]
  );

  return { columns, loading, usersLoading, carts, onRowHandle };
};

export default useCartsTableHook;
