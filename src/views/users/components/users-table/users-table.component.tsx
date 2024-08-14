import CustomTable from "@components/custom-table/custom-table.component";
import useUsersTableHook from "./users-table.hook";

const UsersTable = () => {
  const { columns, loading, users } = useUsersTableHook();
  return (
    <div className="shadow-lg">
      <CustomTable
        scroll={{ x: 2000 }}
        columns={columns}
        loading={loading}
        dataSource={users}
        bordered
      />
    </div>
  );
};

export default UsersTable;
