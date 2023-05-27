import React from "react";

import { IVacancyResponse } from "@/types/VacancyResponse";
import { App, Button, Col, Row } from "antd";
import { useUpdateVacancyResponseMutation } from "@/store/vacancyResponse/api";

interface ActionsProps {
  vacancyResponse: IVacancyResponse;
}
export const Actions: React.FC<ActionsProps> = ({ vacancyResponse }) => {
  const { notification } = App.useApp();
  const [mutate, { isLoading }] = useUpdateVacancyResponseMutation();

  const handlePressApprove = React.useCallback(async () => {
    try {
      await mutate({
        id: vacancyResponse.id,
        approved_by_mentor: true,
      }).unwrap();
    } catch (e) {
      notification.open({
        type: "error",
        message: "Ошибка выполнения запроса",
        description: "Попробуйте еще раз, или повторите позже",
      });
    }
  }, [mutate, vacancyResponse, notification]);

  const handlePressDisApprove = React.useCallback(async () => {
    try {
      await mutate({
        id: vacancyResponse.id,
        approved_by_mentor: false,
      }).unwrap();
    } catch (e) {
      notification.open({
        type: "error",
        message: "Ошибка выполнения запроса",
        description: "Попробуйте еще раз, или повторите позже",
      });
    }
  }, [mutate, vacancyResponse, notification]);

  if (typeof vacancyResponse.approved_by_mentor !== "boolean") {
    return (
      <Col>
        <Row>
          <Col flex={1} />
          <Button danger loading={isLoading} onClick={handlePressDisApprove}>
            Отклонить
          </Button>
          <Col style={{ width: "10px" }} />
          <Button
            type="primary"
            loading={isLoading}
            onClick={handlePressApprove}
          >
            Пригласить
          </Button>
        </Row>
      </Col>
    );
  }

  return null;
};
