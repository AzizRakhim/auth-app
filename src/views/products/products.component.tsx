import { Button, Tag } from "antd";
import {
  AppstoreAddOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import ProductsTable from "@products/components/products-table/products-table.component";
import { SORT_TYPES } from "@types";
import useProductsHook from "@products/hooks/products.hook";

const Products = () => {
  const {
    fetchProductsHandler,
    navigateToAddPage,
    products,
    loading,
    sortProducts,
    sort,
  } = useProductsHook();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-[24px] flex gap-[12px]">
          Products
          <sup>
            <Tag color="#ff6c00">{products.length}</Tag>
          </sup>
        </h2>
        <div className="flex items-center gap-[8px]">
          <Button
            icon={<SyncOutlined />}
            onClick={fetchProductsHandler}
            loading={loading}
            disabled={loading}
          >
            Refresh
          </Button>
          <Button
            icon={
              sort === SORT_TYPES.ASC ? (
                <SortAscendingOutlined />
              ) : (
                <SortDescendingOutlined />
              )
            }
            onClick={sortProducts}
            loading={loading}
            disabled={loading}
          >
            Sort
          </Button>
          <Button
            type="primary"
            onClick={navigateToAddPage}
            icon={<AppstoreAddOutlined />}
          >
            Add
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
