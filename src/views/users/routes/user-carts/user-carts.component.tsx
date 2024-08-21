import { Tag } from "antd";
import CustomTable from "@components/custom-table/custom-table.component";
import useUserCartsHook from "@users/routes/user-carts/user-carts.hook";

const UserCarts = () => {
  const { loading, columns, userCarts, productsLoading, expandedRowRender } =
    useUserCartsHook();

  return (
    <div>
      <h2 className="text-[24px] flex gap-[12px]">
        User carts
        <sup>
          <Tag color="#ff6c00">{userCarts.length}</Tag>
        </sup>
      </h2>
      <div className="mt-[24px] pb-[24px]">
        <div className="shadow-lg">
          <CustomTable
            bordered
            columns={columns}
            dataSource={userCarts}
            loading={loading || productsLoading}
            expandable={{
              expandedRowRender,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default UserCarts;
