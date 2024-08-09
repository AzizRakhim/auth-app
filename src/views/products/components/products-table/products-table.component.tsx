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
        align: "center",
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
        title: "Image",
        dataIndex: "image",
        key: "image",
        render: (image) => {
          return (
            <div className="w-[50px] h-[50px]">
              <img
                src={image}
                alt={"product image"}
                className="w-full h-full object-contain"
              />
            </div>
          );
        },
        align: "center",
      },
      {
        title: "Rate",
        dataIndex: "rating",
        key: "rate",
        render: (rating) => {
          return rating.rate;
        },
        align: "center",
      },
      {
        title: "Rate count",
        dataIndex: "rating",
        key: "rate-count",
        render: (rating) => {
          return rating.count;
        },
        width: 150,
        align: "center",
      },
      {
        title: "Actions",
        key: "actions",
        align: "center",
        render: (rowData) => {
          return (
            <Button
              type="primary"
              icon={<DeleteFilled />}
              onClick={(e) => deleteProduct(e, rowData?.id)}
              danger
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
