import { Button, Form, Input } from "antd";
import useAuthHook from "@auth/hooks/auth.hook";
import Logo from "@assets/images/long-log.webp";
import { SignInFieldType } from "@auth/types/auth.types";

const Auth = () => {
  const { onSignInHandle, loading } = useAuthHook();

  return (
    <div className="auth min-h-[100dvh] w-full max-w-[464px] mx-auto px-[10px] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg bg-opacity-70 w-full flex flex-col gap-[16px]">
        <div className="mx-auto">
          <img src={Logo} alt="logo" width={100} />
        </div>
        <Form
          name="sign-in"
          style={{ maxWidth: 400 }}
          onFinish={onSignInHandle}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item<SignInFieldType>
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<SignInFieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item className="mb-0">
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              loading={loading}
              disabled={loading}
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Auth;
