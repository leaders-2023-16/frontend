import { useCallback, useState } from "react";
import { registerAsync } from "../store/auth/api";
import { useAppDispatch } from "../store";
import { Input, Checkbox, Button, Form, App } from "antd";
import { UserRegister } from "../store/auth/types";

export const SignUp = () => {
  const dispatch = useAppDispatch();
  const { message } = App.useApp();

  const onSubmit = useCallback(
    async (values: UserRegister) => {
      const res = await dispatch(registerAsync(values));
      if (res.meta.requestStatus === "fulfilled")
        message.success("Успешная регистрация", 2);
    },
    [dispatch, message]
  );

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600, margin: "auto" }}
      initialValues={{ remember: true }}
      onFinish={onSubmit}
      autoComplete="off"
    >
      <Form.Item
        label="Имя"
        name="first_name"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Фамилия"
        name="last_name"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Почта"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Пароль"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password autoComplete="newpassword" />
      </Form.Item>
      <Form.Item
        label="Подтвердите пароль"
        name="passwordConf"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password autoComplete="newpassword" />
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
