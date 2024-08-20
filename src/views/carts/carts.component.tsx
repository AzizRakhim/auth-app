import { Button, DatePicker, Tag } from "antd";
import {
  SyncOutlined,
  AppstoreAddOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
} from "@ant-design/icons";
import CartsTable from "@carts/components/carts-table/carts-table.component";
import { SORT_TYPES } from "@types";
import useCartsHook from "@carts/hooks/carts.hook";

const { RangePicker } = DatePicker;

const Carts = () => {
  const {
    sort,
    carts,
    loading,
    dateValue,
    sortCarts,
    usersLoading,
    onDateChange,
    fetchCartsHandler,
    navigateToAddPage,
  } = useCartsHook();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-[24px] flex gap-[12px]">
          Carts
          <sup>
            <Tag color="#ff6c00">{carts.length}</Tag>
          </sup>
        </h2>
        <div className="flex items-center gap-[8px]">
          <Button
            icon={<SyncOutlined />}
            onClick={fetchCartsHandler}
            loading={loading || usersLoading}
            disabled={loading || usersLoading}
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
            onClick={sortCarts}
            loading={loading || usersLoading}
            disabled={loading || usersLoading}
          >
            Sort
          </Button>
          <RangePicker
            value={dateValue}
            onChange={onDateChange}
            disabled={loading || usersLoading}
          />
          <Button
            type="primary"
            onClick={navigateToAddPage}
            icon={<AppstoreAddOutlined />}
          >
            Add
          </Button>
        </div>
      </div>

      <div className="mt-[24px] pb-[24px]">
        <CartsTable />
      </div>
    </div>
  );
};

export default Carts;
