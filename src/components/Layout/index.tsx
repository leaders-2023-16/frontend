import { Outlet } from "react-router-dom";
import { Col, Layout, Row } from "antd";
import { Container } from "../Container";

export const LayoutPage = () => {
  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Layout.Header>header</Layout.Header>
        <Layout>
          <Layout.Content style={{ padding: "18px 36px" }}>
            <Container>
              <Outlet />
            </Container>
          </Layout.Content>
        </Layout>
        <Layout.Footer>footer</Layout.Footer>
      </Layout>
    </>
  );
};
