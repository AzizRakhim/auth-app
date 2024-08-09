import CustomTable from "@components/custom-table/custom-table.component";
import useProductsTableHook from "@products/components/products-table/products-table.hook";

const ProductsTable = () => {
  const { loading, products, onRowHandle, columns } = useProductsTableHook();

  return (
    <div className="shadow-lg">
      <CustomTable
        scroll={{ x: 1000 }}
        columns={columns}
        loading={loading}
        dataSource={products}
        onRow={onRowHandle}
      />
    </div>
  );
};

export default ProductsTable;
