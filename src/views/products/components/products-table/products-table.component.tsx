import CustomTable from "@components/custom-table/custom-table.component";
import useProductsTableHook from "@products/components/products-table/products-table.hook";

const ProductsTable = () => {
  const { columns, loading, products, onRowHandle } = useProductsTableHook();

  return (
    <div className="shadow-lg">
      <CustomTable
        columns={columns}
        loading={loading}
        total={30}
        dataSource={products}
        onRow={onRowHandle}
      />
    </div>
  );
};

export default ProductsTable;
