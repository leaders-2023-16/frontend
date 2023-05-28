import React from "react";

import { useGetWorkPlaceByIdQuery } from "@/store/workPlace/api";
import {
  App,
  Button,
  Divider,
  Form,
  Input,
  Rate,
  Spin,
  Typography,
} from "antd";
import { Navigate, useParams } from "react-router-dom";
import {
  useGetFeedbacksQuery,
  usePostFeedbackMutation,
} from "@/store/feedbacks/api";

export const Content = () => {
  const { notification } = App.useApp();

  const { workPlaceId } = useParams();
  const { data, isLoading } = useGetWorkPlaceByIdQuery(
    parseInt(workPlaceId || ""),
    {
      skip: !workPlaceId,
    }
  );

  const [mutate, { isLoading: isPostingFeedback }] = usePostFeedbackMutation();
  const { data: feedbacks, isLoading: isLoadingFeedbacks } =
    useGetFeedbacksQuery(
      { to_user: data?.mentor.id, from_user: data?.trainee.id },
      { skip: !data }
    );

  const [value, setValue] = React.useState(5);
  const [text, setText] = React.useState("");

  const handlePressSave = async () => {
    if (!data) {
      return;
    }

    try {
      await mutate({
        to_user: data.mentor.id,
        rating: value,
        text,
      }).unwrap();
    } catch (e) {
      notification.open({
        type: "error",
        message: "Ошибка выполнения запроса",
        description: "Попробуйте еще раз, или повторите позже",
      });
    }
  };

  if (!isLoading && !data) {
    return <Navigate to="/" />;
  }

  return (
    <Spin spinning={isLoading}>
      <Typography.Text>
        Активная: {data?.is_active ? "Да" : "Нет"}
      </Typography.Text>
      <Typography.Title level={2}>{data?.name}</Typography.Title>
      <Typography.Title level={5}>{data?.department.name}</Typography.Title>
      <Divider />
      <Typography.Title level={5}>Стажер</Typography.Title>
      <Typography.Text>
        {data?.trainee.first_name} {data?.trainee.first_name}
      </Typography.Text>

      <Divider />
      <Spin spinning={isLoadingFeedbacks}>
        <Typography.Title level={5}>Оценка наставника</Typography.Title>
        <Form layout="vertical">
          <Form.Item label="Рейтинг">
            <Rate
              onChange={setValue}
              value={feedbacks?.[0]?.rating || value}
              disabled={(feedbacks || []).length > 0}
            />
          </Form.Item>
          <Form.Item label="Отзыв">
            <Input.TextArea
              value={feedbacks?.[0]?.text || text}
              onChange={(e) => setText(e.target.value)}
              disabled={(feedbacks || []).length > 0}
              rows={5}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              onClick={handlePressSave}
              loading={isPostingFeedback}
              disabled={(feedbacks || []).length > 0}
            >
              Сохранить
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </Spin>
  );
};
