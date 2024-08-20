import { useMemo } from "react";
import { Form, InputNumber } from "antd";
import { ColumnsType } from "antd/es/table";
import { useAppSelector } from "@store/store-hooks";
import { IProduct } from "@products/types/products.types";

const useSingleCartTableHook = () => {
  const form = Form.useFormInstance();
  const products = useAppSelector((state) => state.productsSlice.products);

  const productIds = Form.useWatch("productIds", form);

  const columns = useMemo<ColumnsType<IProduct>>(
    () => [
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
      },
      {
        title: "Quantity",
        key: "quantity",
        align: "center",
        render: (_, record, index) => {
          return (
            <Form.Item
              label={null}
              name={[`products-${record.id}`, "quantity"]}
              rules={[{ required: true, message: "Enter quantity" }]}
              className="mb-0"
              initialValue={1}
            >
              <InputNumber
                min={1}
                placeholder="Quantity"
                onChange={(value) => {
                  const products = form.getFieldValue("products") || [];
                  products[index] = {
                    productId: record.id,
                    quantity: value,
                  };
                  form.setFieldsValue({ products });
                }}
              />
            </Form.Item>
          );
        },
      },
    ],
    []
  );

  const dataSource = useMemo(
    () =>
      products.filter((product) => productIds?.includes(String(product.id))),
    [productIds, products]
  );

  return { columns, dataSource };
};

export default useSingleCartTableHook;
