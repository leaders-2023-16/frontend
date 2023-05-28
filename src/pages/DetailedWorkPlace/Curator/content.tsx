import React from "react";
import {
  useGetWorkPlaceByIdQuery,
  useUpdateWorkPlaceByIdMutation,
} from "@/store/workPlace/api";
import { App, Button, Col, Divider, Spin, Typography } from "antd";
import { Navigate, useParams } from "react-router-dom";

export const Content = () => {
  const { notification } = App.useApp();
  const { workPlaceId } = useParams();

  const [mutate, { isLoading: isUpdatingInfo }] =
    useUpdateWorkPlaceByIdMutation();
  const { data, isLoading } = useGetWorkPlaceByIdQuery(
    parseInt(workPlaceId || ""),
    {
      skip: !workPlaceId,
    }
  );

  const handlePressFinish = React.useCallback(async () => {
    if (!data) {
      return;
    }

    try {
      await mutate({ id: data.id, is_active: false }).unwrap();
    } catch (e) {
      notification.open({
        type: "error",
        message: "Ошибка выполнения запроса",
        description: "Попробуйте еще раз, или повторите позже",
      });
    }
  }, [notification, mutate, data]);

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

      {data?.is_active && (
        <Col style={{ marginTop: "20px" }}>
          <Button
            type="primary"
            loading={isUpdatingInfo}
            onClick={handlePressFinish}
          >
            Завершить
          </Button>
        </Col>
      )}
    </Spin>
  );
};
