import { ColumnsType } from "antd/es/table";
import { Button, message, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { MouseEvent, useCallback, useMemo } from "react";
import { DeleteFilled, ExclamationCircleFilled } from "@ant-design/icons";
import { SORT_TYPES } from "@types";
import { IUser } from "@users/types";
import { fetchUsers } from "@users/store/users.slice";
import { userService } from "@users/services/user.services";
import { useSearchparams } from "@utils/user-search-params";
import { useAppDispatch, useAppSelector } from "@store/store-hooks";

const { confirm } = Modal;

const useUsersTableHook = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, users } = useAppSelector((state) => ({
    loading: state.usersSlice.loading,
    users: state.usersSlice.users,
  }));
  const {
    searchParams: { sort = SORT_TYPES.ASC },
  } = useSearchparams();

  const deleteUser = useCallback(
    (e: MouseEvent<HTMLElement, globalThis.MouseEvent>, id: number) => {
      e.stopPropagation();
      confirm({
        title: "Are you sure to delete this user?",
        icon: <ExclamationCircleFilled />,
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        onOk: async () => {
          const res = await userService.deleteUser(id);
          console.log(sort);
          if (res?.id) {
            message.success("Removed");
            dispatch(fetchUsers({ sort: sort as SORT_TYPES }));
          } else {
            message.error("Something went wrong");
          }
        },
      });
    },
    [dispatch, sort]
  );

  const columns = useMemo<ColumnsType<IUser>>(
    () => [
      {
        title: "Id",
        dataIndex: "id",
        key: "id",
        align: "center",
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        align: "center",
      },
      {
        title: "Username",
        dataIndex: "username",
        key: "username",
        align: "center",
      },
      {
        title: "Phone",
        dataIndex: "phone",
        key: "phone",
        align: "center",
        width: 200,
      },
      {
        title: "Name",
        children: [
          {
            title: "First name",
            dataIndex: ["name", "firstname"],
            key: "firstname",
            align: "center",
            width: 170,
          },
          {
            title: "Last name",
            dataIndex: ["name", "lastname"],
            key: "lastname",
            align: "center",
            width: 170,
          },
        ],
      },
      {
        title: "Address",
        children: [
          {
            title: "City",
            dataIndex: ["address", "city"],
            key: "city",
            align: "center",
          },
          {
            title: "Street",
            dataIndex: ["address", "street"],
            key: "street",
            align: "center",
          },
          {
            title: "Number",
            dataIndex: ["address", "number"],
            key: "number",
            align: "center",
          },
          {
            title: "Zip code",
            dataIndex: ["address", "zipcode"],
            key: "zipcode",
            align: "center",
          },
          {
            title: "Geolocation",
            children: [
              {
                title: "Latitude",
                dataIndex: ["address", "geolocation", "lat"],
                key: "lat",
                align: "center",
              },
              {
                title: "Longitude",
                dataIndex: ["address", "geolocation", "long"],
                key: "long",
                align: "center",
              },
            ],
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
              onClick={(e) => deleteUser(e, rowData?.id)}
            />
          );
        },
      },
    ],
    [deleteUser]
  );

  const onRowHandle = useCallback(
    (user: IUser) => {
      return {
        onClick: (event: MouseEvent) => {
          if (event.ctrlKey) {
            window.open(`/users/user?update=${user?.id}`, "_blank");
          }
        },
        onDoubleClick: () => {
          navigate(`/users/user?update=${user?.id}`);
        },
        style: {
          cursor: "pointer",
        },
      };
    },
    [navigate]
  );

  return { loading, users, columns, onRowHandle };
};

export default useUsersTableHook;
