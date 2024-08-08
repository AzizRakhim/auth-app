import { Spin } from "antd";

const PageLoading = () => {
  return (
    <div className="flex items-center justify-center min-h-[100dvh]">
      <Spin size="large" />
    </div>
  );
};

export default PageLoading;
