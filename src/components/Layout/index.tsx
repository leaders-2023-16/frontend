import { Outlet, useNavigate } from "react-router-dom";
import { Button, Col, Dropdown, Layout, Row, Space, Typography } from "antd";
import { useAppDispatch, useAppSelector } from "../../store";
import { selectAuth } from "../../store/auth/selectors";
import { logoutAsync } from "../../store/auth/api";
import { useCallback, useMemo } from "react";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Container } from "../Container";

export const LayoutPage = () => {
  const { user } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    dispatch(logoutAsync());
  }, [dispatch]);

  const items = useMemo(
    () => [
      {
        key: "1",
        label: "Профиль",
        onClick: () => navigate("/profile"),
        icon: <UserOutlined />,
      },
      {
        key: "2",
        label: "Выйти",
        onClick: handleLogout,
        icon: <LogoutOutlined />,
      },
    ],
    [handleLogout, navigate]
  );

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Layout.Header>
          <Row justify={"space-between"}>
            <Col>Лого</Col>
            <Col>
              {user ? (
                <>
                  <Dropdown
                    menu={{
                      items,
                    }}
                  >
                    <Typography.Text>Имя Фамилия</Typography.Text>
                  </Dropdown>
                </>
              ) : (
                <>
                  <Space>
                    <Button onClick={() => navigate("/login")}>Войти</Button>
                    <Button onClick={() => navigate("/signup")}>
                      Зарегистрироваться
                    </Button>
                  </Space>
                </>
              )}
            </Col>
          </Row>
        </Layout.Header>
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
