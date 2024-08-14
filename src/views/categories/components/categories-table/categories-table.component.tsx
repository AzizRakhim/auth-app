import CustomTable from "@components/custom-table/custom-table.component";
import useCategoriesTableHook from "@categories/components/categories-table/categories-table.hook";

const CategoriesTable = () => {
  const { singleLoading, columns, singleCategories } = useCategoriesTableHook();

  return (
    <div className="shadow-lg">
      <CustomTable
        scroll={{ x: 1000 }}
        columns={columns}
        loading={singleLoading}
        dataSource={singleCategories}
      />
    </div>
  );
};

export default CategoriesTable;
