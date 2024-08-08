import CustomTable from "@components/custom-table";
import { Tag } from "antd";

const Products = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-[24px] flex gap-[12px]">
          Products
          <sup>
            <Tag>{0}</Tag>
          </sup>
        </h2>
      </div>
      <CustomTable />
    </div>
  );
};

export default Products;
