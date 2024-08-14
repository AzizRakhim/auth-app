import { Button, Tag } from "antd";
import {
  SyncOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
} from "@ant-design/icons";
import UsersTable from "@users/components/users-table/users-table.component";
import { SORT_TYPES } from "@types";
import useUsersHook from "@users/hooks/users.hook";

const Users = () => {
  const { users, loading, fetchUsersHandler, sort, sortProducts } =
    useUsersHook();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-[24px] flex gap-[12px]">
          Users
          <sup>
            <Tag color="#ff6c00">{users.length}</Tag>
          </sup>
        </h2>
        <div className="flex items-center gap-[8px]">
          <Button
            icon={<SyncOutlined />}
            onClick={fetchUsersHandler}
            loading={loading}
            disabled={loading}
          >
            Refresh
          </Button>
          <Button
            icon={
              sort === SORT_TYPES.ASC ? (
                <SortAscendingOutlined />
              ) : (
                <SortDescendingOutlined />
              )
            }
            onClick={sortProducts}
            loading={loading}
            disabled={loading}
          >
            Sort
          </Button>
        </div>
      </div>

      <div className="mt-[24px] pb-[24px]">
        <UsersTable />
      </div>
    </div>
  );
};

export default Users;
