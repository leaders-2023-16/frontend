import { useCallback } from "react";
import { registerAsync } from "../store/auth/api";
import { useAppDispatch } from "../store";
import { App, Col, Row, Space } from "antd";
import { UserRegister } from "../store/auth/types";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "@/components/Button";
import TextField, { Input as MInput } from "@material/react-text-field";
import { useForm, Controller } from "react-hook-form";

export const SignUp = () => {
  const dispatch = useAppDispatch();
  const { message } = App.useApp();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegister>();
  const navigate = useNavigate();
  const onSubmit = useCallback(
    async (values: UserRegister) => {
      const res = await dispatch(registerAsync(values));
      if (res.meta.requestStatus === "fulfilled") {
        message.success("Успешная регистрация", 2);
        navigate("/profile?edit=1&show_modal=1");
      }
    },
    [dispatch, message, navigate]
  );

  return (
    <Row align={"middle"} justify={"center"} style={{ marginTop: "88px" }}>
      <Col span="10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <Controller
              name="first_name"
              control={control}
              render={({ field }) => (
                <TextField label={"Имя"} style={{ width: "100%" }}>
                  <MInput {...field} />
                </TextField>
              )}
            />
            <Controller
              name="last_name"
              control={control}
              render={({ field }) => (
                <TextField label={"Фамилия"} style={{ width: "100%" }}>
                  <MInput {...field} />
                </TextField>
              )}
            />
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
            <Controller
              name="passwordConf"
              control={control}
              render={({ field }) => (
                <TextField label={"Пароль"} style={{ width: "100%" }}>
                  <MInput type="password" {...field} />
                </TextField>
              )}
            />
            <CustomButton isPrimary type="submit" style={{ width: "100%" }}>
              Зарегистрироваться
            </CustomButton>
          </Space>
        </form>
      </Col>
    </Row>

    // <Form
    //   name="basic"
    //   labelCol={{ span: 8 }}
    //   wrapperCol={{ span: 16 }}
    //   style={{ maxWidth: 600, margin: "auto" }}
    //   initialValues={{ remember: true }}
    //   onFinish={onSubmit}
    //   autoComplete="off"
    // >
    //   <Form.Item
    //     label="Имя"
    //     name="first_name"
    //     rules={[{ required: true, message: "Please input your username!" }]}
    //   >
    //     <Input />
    //   </Form.Item>

    //   <Form.Item
    //     label="Фамилия"
    //     name="last_name"
    //     rules={[{ required: true, message: "Please input your password!" }]}
    //   >
    //     <Input />
    //   </Form.Item>
    //   <Form.Item
    //     label="Почта"
    //     name="username"
    //     rules={[{ required: true, message: "Please input your username!" }]}
    //   >
    //     <Input />
    //   </Form.Item>

    //   <Form.Item
    //     label="Пароль"
    //     name="password"
    //     rules={[{ required: true, message: "Please input your password!" }]}
    //   >
    //     <Input.Password autoComplete="newpassword" />
    //   </Form.Item>
    //   <Form.Item
    //     label="Подтвердите пароль"
    //     name="passwordConf"
    //     rules={[{ required: true, message: "Please input your password!" }]}
    //   >
    //     <Input.Password autoComplete="newpassword" />
    //   </Form.Item>

    //   <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
    //     <Button type="primary" htmlType="submit">
    //       Submit
    //     </Button>
    //   </Form.Item>
    // </Form>
  );
};
