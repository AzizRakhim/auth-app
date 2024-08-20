import PhoneInput from "antd-phone-input";
import { Button, Form, Input, InputNumber } from "antd";
import { Map, Placemark, YMaps } from "react-yandex-maps";
import {
  DeleteFilled,
  SaveOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import PageLayout from "@layouts/page-layout/page-layout.component";
import { RULE } from "@constants";
import MapPin from "@assets/svgs/map-pin.svg";
import useSingleUserHook from "@users/routes/single-user/single-user.hook";

const SingleUser = () => {
  const {
    form,
    loading,
    update,
    onFinish,
    validator,
    setMapRef,
    deleteUser,
    formLoading,
    coordinates,
    $breadcrumbs,
  } = useSingleUserHook();

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
        <div className="flex items-center justify-between">
          <h2 className="text-[24px]">{$breadcrumbs?.at(-1)?.title}</h2>
          {update && (
            <Button icon={<ShoppingOutlined />} type="primary">
              To user's carts
            </Button>
          )}
        </div>
        <div className="flex justify-end fixed bottom-0 right-0 py-[9px] bg-white z-[1] shadow-lg  border-t border-solid border-gray dynamic-form-footer gap-[12px] px-[32px]">
          {update && (
            <Button
              type="primary"
              icon={<DeleteFilled />}
              danger
              loading={formLoading}
              disabled={formLoading}
              onClick={deleteUser}
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

        <div className="mt-[48px] bg-white p-8 rounded-lg shadow-lg bg-opacity-70 flex flex-col gap-[16px]">
          <h2 className="text-[24px] font-semibold">Name</h2>
          <div className="grid grid-cols-3 gap-3">
            <Form.Item
              label="First name"
              name={["name", "firstname"]}
              rules={[{ required: true, message: "Enter first name" }, RULE]}
            >
              <Input type="text" placeholder="First name" />
            </Form.Item>
            <Form.Item
              label="Last name"
              name={["name", "lastname"]}
              rules={[{ required: true, message: "Enter last name" }, RULE]}
            >
              <Input type="text" placeholder="Last name" />
            </Form.Item>
          </div>
        </div>

        <div className="mt-[48px] bg-white p-8 rounded-lg shadow-lg bg-opacity-70">
          <div className="grid grid-cols-3 gap-3">
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                { required: true, message: "Enter email" },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: "Enter username" }, RULE]}
            >
              <Input type="text" placeholder="Username" />
            </Form.Item>
            <Form.Item label="Phone" name="phone" rules={[{ validator }]}>
              <PhoneInput enableArrow enableSearch />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              hasFeedback
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The new password that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
          </div>
        </div>

        <div className="mt-[48px] bg-white p-8 rounded-lg shadow-lg bg-opacity-70 flex flex-col gap-[16px]">
          <h2 className="text-[24px] font-semibold">Address</h2>
          <div className="grid grid-cols-3 gap-3">
            <Form.Item
              label="City"
              name={["address", "city"]}
              rules={[{ required: true, message: "Enter city" }, RULE]}
            >
              <Input type="text" placeholder="City" />
            </Form.Item>
            <Form.Item
              label="Street"
              name={["address", "street"]}
              rules={[{ required: true, message: "Enter street" }, RULE]}
            >
              <Input type="text" placeholder="Street" />
            </Form.Item>
            <Form.Item label="Number" name={["address", "number"]}>
              <InputNumber placeholder="Number" className="w-full" />
            </Form.Item>
            <Form.Item
              label="Zip code"
              name={["address", "zipcode"]}
              rules={[{ required: true, message: "Enter zipcode" }, RULE]}
            >
              <Input placeholder="Zip code" />
            </Form.Item>
          </div>
        </div>

        <div className="mt-[48px] bg-white p-8 rounded-lg shadow-lg bg-opacity-70 flex flex-col gap-[16px]">
          <h2 className="text-[24px] font-semibold">Address/Geolocation</h2>
          <div className="grid grid-cols-3 gap-3">
            <Form.Item
              label="Latitude"
              name={["address", "geolocation", "lat"]}
              rules={[{ required: true, message: "Enter latitude" }]}
            >
              <Input type="text" placeholder="Latitude" disabled />
            </Form.Item>
            <Form.Item
              label="Longitude"
              name={["address", "geolocation", "long"]}
              rules={[{ required: true, message: "Enter longitude" }]}
            >
              <Input type="text" placeholder="Longitude" disabled />
            </Form.Item>
          </div>
          <YMaps
            query={{
              apikey: "86e97230-be0d-4752-9911-3464ec5295a7",
              lang: "en_US",
              load: "package.full",
            }}
          >
            <Map
              width={"100%"}
              height={"300px"}
              onClick={setMapRef}
              state={{
                center: coordinates,
                zoom: 15,
                controls: [
                  "zoomControl",
                  "fullscreenControl",
                  "geolocationControl",
                ],
              }}
            >
              <Placemark
                geometry={coordinates}
                options={{
                  preset: "islands#redDotIcon",
                  iconLayout: "default#image",
                  iconImageSize: [30, 51],
                  iconImageHref: MapPin,
                }}
              />
            </Map>
          </YMaps>
        </div>
      </Form>
    </PageLayout>
  );
};

export default SingleUser;
