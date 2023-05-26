import { useCallback } from "react";
import { loginAsync } from "../store/auth/api";
import { useAppDispatch } from "../store";
import { Button, Form, Input, Checkbox, Space, Col, Row } from "antd";
import TextField, {
  HelperText,
  Input as MInput,
} from "@material/react-text-field";
import "@material/react-text-field/dist/text-field.css";
import { useForm, Controller } from "react-hook-form";

export const Login = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ username: string; password: string }>();
  const dispatch = useAppDispatch();

  const onSubmit = useCallback(
    async ({ username, password }: { username: string; password: string }) => {
      await dispatch(loginAsync({ password, username }));
    },
    [dispatch]
  );
  return (
    <Row align={"middle"} justify={"center"} style={{marginTop: '88px'}}>
      <Col span="10" >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <TextField label={"Почта"} style={{ width: "100%" }}>
                  <MInput {...field} />
                </TextField>
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField label={"Пароль"} style={{ width: "100%" }}>
                  <MInput type="password" {...field} />
                </TextField>
              )}
            />
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Войти
            </Button>
          </Space>
        </form>
      </Col>
    </Row>
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
      <TextField>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
          // com
        >
          <MInput />
        </Form.Item>
      </TextField>
      <TextField label="Dog" helperText={<HelperText>Help Me!</HelperText>}>
        <MInput value={"sad"} />
      </TextField>
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
        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
};
