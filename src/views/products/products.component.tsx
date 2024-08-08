import { Button, Tag } from "antd";
import { AppstoreAddOutlined, SyncOutlined } from "@ant-design/icons";
import ProductsTable from "@products/components/products-table/products-table.component";
import useProductsHook from "@products/hooks/products.hook";

const Products = () => {
  const { fetchProductsHandler, navigateToAddPage } = useProductsHook();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-[24px] flex gap-[12px]">
          Products
          <sup>
            <Tag color="#ff6c00">{30}</Tag>
          </sup>
        </h2>
        <div className="flex items-center gap-[8px]">
          <Button icon={<SyncOutlined />} onClick={fetchProductsHandler}>
            Обновить
          </Button>
          <Button
            type="primary"
            onClick={navigateToAddPage}
            icon={<AppstoreAddOutlined />}
          >
            Добавить
          </Button>
        </div>
      </div>

      <div className="mt-[24px] pb-[24px]">
        <ProductsTable />
      </div>
    </div>
  );
};

export default Products;