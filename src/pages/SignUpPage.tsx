import { useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { loginAsync } from '../store/auth/api';
import { useAppDispatch, useAppSelector } from '../store';
import { Input, Checkbox, Button, Form } from 'antd';
import { useNavigate } from 'react-router-dom';
import { selectAuth } from '../store/auth/selectors';

export const SignUp = () => {
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string; password: string }>({
    mode: "onBlur"
  });

  const onSubmit = useCallback(
    ({ email, password }: { email: string; password: string }) => {
      dispatch(loginAsync({ password, username: email }));
    },
    [dispatch]
  );
  
    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600, margin: 'auto' }}
            initialValues={{ remember: true }}
            onFinish={onSubmit}
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}
