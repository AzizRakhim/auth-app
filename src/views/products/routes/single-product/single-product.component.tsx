import { Button, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { DeleteFilled, SaveOutlined } from "@ant-design/icons";
import PageLayout from "@layouts/page-layout/page-layout.component";
import { RULE } from "@constants";
import useSingleProductHook from "@products/routes/single-product/single-product.hook";

const SingleProduct = () => {
  const {
    $breadcrumbs,
    onFinish,
    form,
    update,
    formLoading,
    deleteProduct,
    loading,
    image,
  } = useSingleProductHook();

  return (
    <PageLayout loading={loading} breadcrumbs={$breadcrumbs}>
      <Form
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
        form={form}
        className="pb-[90px]"
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
              onClick={deleteProduct}
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
              label="Title"
              name="title"
              rules={[{ required: true, message: "Enter title" }, RULE]}
            >
              <Input type="text" placeholder="Title" />
            </Form.Item>
            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: "Enter price" }]}
            >
              <Input type="number" placeholder="Price" />
            </Form.Item>
            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true, message: "Enter category" }, RULE]}
            >
              <Input type="text" placeholder="Category" />
            </Form.Item>
            <div className="flex gap-[12px]">
              <Form.Item
                label="Image link"
                name="image"
                rules={[{ required: true, message: "Enter image link" }, RULE]}
                className="w-full"
              >
                <Input type="text" placeholder="Image link" />
              </Form.Item>
              {image && (
                <img
                  src={image}
                  alt="product image"
                  className="min-w-[50px] w-[50px] h-[50px] min-h-[50px] mt-[28px] object-cover"
                />
              )}
            </div>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: "Enter description" }, RULE]}
              className="col-span-2"
            >
              <TextArea
                autoSize={{
                  minRows: 6,
                  maxRows: 12,
                }}
              />
            </Form.Item>
          </div>
        </div>
      </Form>
    </PageLayout>
  );
};

export default SingleProduct;
