import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import { Button, Col, Dropdown, Layout, Row, Space, Typography } from "antd";
import { useAppDispatch, useAppSelector } from "../../store";
import { selectAuth } from "../../store/auth/selectors";
import { logoutAsync } from "../../store/auth/api";
import { useCallback, useMemo } from "react";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Container } from "../Container";
import logo from "../../assets/logo.svg";
import { Tabs } from "./Tabs";
import { CustomButton } from "../Button";

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
          <Row justify={"space-between"} align={"middle"}>
            <Col style={{ display: "flex" }}>
              <img src={logo} />
            </Col>
            <Col>
              <Tabs role={user?.role} />
            </Col>
            <Col>
              {user ? (
                <>
                  <Dropdown
                    menu={{
                      items,
                    }}
                  >
                    <Typography.Text>
                      {user.first_name} {user.last_name}
                    </Typography.Text>
                  </Dropdown>
                </>
              ) : (
                <>
                  <Space>
                    <CustomButton onClick={() => navigate("/signup")}>
                      Зарегистрироваться
                    </CustomButton>
                    <CustomButton isPrimary onClick={() => navigate("/login")}>
                      Войти
                    </CustomButton>
                  </Space>
                </>
              )}
            </Col>
          </Row>
        </Layout.Header>
        <Layout>
          <Layout.Content style={{ margin: "0 144px", backgroundColor: 'white' }}>
            <Container>
              <Outlet />
            </Container>
          </Layout.Content>
        </Layout>
        {/* <Layout.Footer>footer</Layout.Footer> */}
      </Layout>
    </>
  );
};
