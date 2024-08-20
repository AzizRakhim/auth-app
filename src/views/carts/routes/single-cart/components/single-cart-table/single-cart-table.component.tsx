import CustomTable from "@components/custom-table/custom-table.component";
import useSingleCartTableHook from "@carts/routes/single-cart/components/single-cart-table/single-cart-table.hook";

const SingleCartTable = () => {
  const { columns, dataSource } = useSingleCartTableHook();

  return (
    <div className="shadow-lg mt-[16px]">
      <CustomTable bordered columns={columns} dataSource={dataSource} />
    </div>
  );
};

export default SingleCartTable;
