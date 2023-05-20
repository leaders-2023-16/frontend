import { useCallback } from "react";
import { loginAsync } from "../store/auth/api";
import { useAppDispatch } from "../store";
import { Button, Form, Input, Checkbox } from "antd";

export const Login = () => {
  const dispatch = useAppDispatch();

  const onSubmit = useCallback(
    async ({ username, password }: { username: string; password: string }) => {
      await dispatch(loginAsync({ password, username: username }));
    },
    [dispatch]
  );

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600, margin: "auto" }}
      initialValues={{ remember: true }}
      onFinish={onSubmit}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
