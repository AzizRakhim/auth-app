import { Button, Layout, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { HTMLProps, FC, useState, useCallback } from "react";
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { MENUS } from "@constants";
import { setToken } from "@auth/store";
import { useAppDispatch } from "@store/store-hooks";

const { Header, Sider, Content } = Layout;

type MainLayoutType = Pick<HTMLProps<HTMLElement>, "children">;

const MainLayout: FC<MainLayoutType> = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [collapsed, setCollapsed] = useState(false);

  const handleMenuClick = useCallback(
    (menuKey: string) => {
      navigate(`/${menuKey}`);
    },
    [navigate]
  );

  const handleSignOut = useCallback(() => dispatch(setToken(null)), [dispatch]);

  return (
    <Layout className="h-[100dvh]">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme="light"
        className="py-[10px]"
      >
        <div className="flex flex-col gap-[16px] justify-between h-full">
          <div className="flex flex-col gap-[16px]">
            <Link to={"/welcome"} className="flex justify-center px-[4px]">
              <img
                src="https://geoinfocom.uz/sites/all/themes/geoinfocom/assets/img/logo-sq.png"
                alt="logo"
                width={100}
              />
            </Link>
            <Menu
              mode="inline"
              items={MENUS.map((menu) => ({
                key: menu.key,
                icon: menu.icon,
                label: menu.label,
              }))}
              onClick={(e) => handleMenuClick(e.key)}
            />
          </div>
          <div className="px-[4px]">
            <Button
              type="primary"
              className="px-[4px] w-full"
              onClick={handleSignOut}
            >
              {collapsed ? <LogoutOutlined /> : "Sign Out"}
            </Button>
          </div>
        </div>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, backgroundColor: "white" }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            padding: 24,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
