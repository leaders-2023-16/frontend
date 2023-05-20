import { Outlet } from "react-router-dom";
import { Layout } from "antd";

export const LayoutPage = () => {
  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Layout.Header>header</Layout.Header>
        <Layout>
          <Layout.Content style={{ padding: "18px 36px" }}>
            <Outlet />
          </Layout.Content>
        </Layout>
        <Layout.Footer>footer</Layout.Footer>
      </Layout>
    </>
  );
};
