import { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { loginAsync } from '../store/auth/api';
import { useAppDispatch } from '../store';

export const SignUp = () => {
    const dispatch = useAppDispatch()
    const { control, handleSubmit, formState: { errors } } = useForm<{ email: string, password: string }>({
        mode: 'onBlur', defaultValues: {
            email: ''
        }
    })

    const onSubmit = useCallback(({ email, password }: { email: string, password: string }) => {
        dispatch(loginAsync({ password, username: email }))
    }, [dispatch]);

    return (
        <HorizontalStack align='center'>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FormLayout>
                    <Controller
                        name="email"
                        control={control}
                        rules={{ required: { value: true, message: 'Обязательное поле!' } }}
                        render={({ field }) => <TextField {...field} label='Почта' type='email' autoComplete='email' error={errors.email?.message} />}
                    />
                    <Controller
                        name="password"
                        control={control}
                        rules={{ required: { value: true, message: 'Обязательное поле!' } }}
                        render={({ field }) => <TextField {...field} label='Пароль' type='password' autoComplete='password' error={errors.password?.message} />}
                    />

                    <Button submit>Зарегистрироваться</Button>
                </FormLayout>
            </Form>
        </HorizontalStack>

    );
}