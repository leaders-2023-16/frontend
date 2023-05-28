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
import { CustomButton } from "@/components/Button";

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
            <CustomButton isPrimary type="submit" style={{ width: "100%" }}>
              Войти
            </CustomButton>
          </Space>
        </form>
      </Col>
    </Row>
  );
};
