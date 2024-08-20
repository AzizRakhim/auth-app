import CustomTable from "@components/custom-table/custom-table.component";
import useCartsTableHook from "@carts/components/carts-table/carts-table.hook";

const CartsTable = () => {
  const { carts, loading, usersLoading, columns, onRowHandle } =
    useCartsTableHook();

  return (
    <div className="shadow-lg">
      <CustomTable
        bordered
        columns={columns}
        loading={loading || usersLoading}
        dataSource={carts}
        onRow={onRowHandle}
      />
    </div>
  );
};

export default CartsTable;
