import { Typography } from "antd";
import Logo from "@assets/svgs/logo.svg";

const { Title, Text } = Typography;

const Welcome = () => {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="text-center">
        <div className="flex justify-center">
          <img src={Logo} alt="logo" width={100} />
        </div>
        <Title
          level={2}
          className="text-4xl font-bold mb-4 !mt-4 max-w-[700px]"
        >
          👋 Welcome to my wonderful application
        </Title>
        <Text className="text-lg text-gray-600">Feel free to browse it</Text>
      </div>
    </div>
  );
};

export default Welcome;
