import { Button, Modal } from "antd";
import { ColumnsType } from "antd/es/table";
import { DeleteFilled } from "@ant-design/icons";
import { MouseEvent, useCallback, useMemo } from "react";
import { ExclamationCircleFilled } from "@ant-design/icons";
import CustomTable from "@components/custom-table/custom-table.component";
import { IProduct } from "@products/types/products.types";
import useProductsTableHook from "@products/components/products-table/products-table.hook";

const { confirm } = Modal;

const ProductsTable = () => {
  const { loading, products, onRowHandle, deleteProductHandle } =
    useProductsTableHook();

  const deleteProduct = useCallback(
    (e: MouseEvent<HTMLElement, globalThis.MouseEvent>, id: number) => {
      e.stopPropagation();
      confirm({
        title: "Are you sure delete this product?",
        icon: <ExclamationCircleFilled />,
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        onOk() {
          deleteProductHandle(id);
        },
      });
    },
    [deleteProductHandle]
  );

  const columns = useMemo<ColumnsType<IProduct>>(
    () => [
      {
        title: "Id",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
        width: 250,
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
        width: 100,
      },
      {
        title: "Category",
        dataIndex: "category",
        key: "category",
        width: 150,
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
      },
      {
        title: "Actions",
        key: "actions",
        align: "right",
        render: (rowData) => {
          return (
            <Button
              type="primary"
              icon={<DeleteFilled />}
              onClick={(e) => deleteProduct(e, rowData?.id)}
            />
          );
        },
      },
    ],
    [deleteProduct]
  );

  return (
    <div className="shadow-lg">
      <CustomTable
        columns={columns}
        loading={loading}
        dataSource={products}
        onRow={onRowHandle}
      />
    </div>
  );
};

export default ProductsTable;
