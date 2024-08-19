import CustomTable from "@components/custom-table/custom-table.component";
import useUsersTableHook from "@users/components/users-table/users-table.hook";

const UsersTable = () => {
  const { columns, loading, users, onRowHandle } = useUsersTableHook();

  return (
    <div className="shadow-lg">
      <CustomTable
        bordered
        columns={columns}
        loading={loading}
        dataSource={users}
        onRow={onRowHandle}
        scroll={{ x: 2000 }}
      />
    </div>
  );
};

export default UsersTable;
