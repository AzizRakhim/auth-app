import { Button, Form, Select } from "antd";
import { DeleteFilled, SaveOutlined } from "@ant-design/icons";
import PageLayout from "@layouts/page-layout/page-layout.component";
import SingleCartTable from "@carts/routes/single-cart/components/single-cart-table/single-cart-table.component";
import useSingleCartHook from "@carts/routes/single-cart/hooks/single-cart.hook";

const SingleCart = () => {
  const {
    form,
    update,
    loading,
    onFinish,
    deleteCart,
    formLoading,
    userOptions,
    $breadcrumbs,
    usersLoading,
    productOptions,
    productsLoading,
  } = useSingleCartHook();

  return (
    <PageLayout loading={loading} breadcrumbs={$breadcrumbs}>
      <Form
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
        form={form}
        className="pb-[90px]"
        scrollToFirstError
      >
        <h2 className="text-[24px]">{$breadcrumbs?.at(-1)?.title}</h2>
        <div className="flex justify-end fixed bottom-0 right-0 py-[9px] bg-white z-[1] shadow-lg  border-t border-solid border-gray dynamic-form-footer gap-[12px] px-[32px]">
          {update && (
            <Button
              type="primary"
              icon={<DeleteFilled />}
              danger
              loading={formLoading}
              disabled={formLoading}
              onClick={deleteCart}
            >
              Delete
            </Button>
          )}
          <Button
            type="primary"
            icon={<SaveOutlined />}
            htmlType="submit"
            loading={formLoading}
            disabled={formLoading}
          >
            {formLoading ? "Saving..." : "Save"}
          </Button>
        </div>

        <div className="mt-[48px] bg-white p-8 rounded-lg shadow-lg bg-opacity-70">
          <div className="grid grid-cols-3 gap-3">
            <Form.Item
              label="User"
              name={"userId"}
              rules={[{ required: true, message: "Choose a user" }]}
            >
              <Select
                allowClear
                showSearch
                style={{ width: "100%" }}
                placeholder="Please select"
                filterOption={(input, option) =>
                  option?.props?.children
                    ?.toLowerCase()
                    ?.indexOf(input?.toLowerCase()) >= 0 ||
                  option?.props?.value
                    ?.toLowerCase()
                    ?.indexOf(input?.toLowerCase()) >= 0
                }
                loading={usersLoading}
                disabled={usersLoading}
              >
                {userOptions?.map((item) => (
                  <Select.Option key={item?.value} value={item?.value}>
                    {item.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Products"
              name="productIds"
              rules={[{ required: true, message: "Choose a product" }]}
              className="col-span-2"
            >
              <Select
                allowClear
                mode="multiple"
                style={{ width: "100%" }}
                placeholder="Please select"
                filterOption={(input, option) =>
                  option?.props?.children
                    ?.toLowerCase()
                    ?.indexOf(input?.toLowerCase()) >= 0 ||
                  option?.props?.value
                    ?.toLowerCase()
                    ?.indexOf(input?.toLowerCase()) >= 0
                }
                loading={productsLoading}
                disabled={productsLoading}
              >
                {productOptions?.map((item) => (
                  <Select.Option key={item?.value} value={item?.value}>
                    {item.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>
        </div>
        <SingleCartTable />
      </Form>
    </PageLayout>
  );
};

export default SingleCart;
