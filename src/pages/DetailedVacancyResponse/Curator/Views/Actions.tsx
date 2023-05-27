import React from "react";

import { IVacancyResponse } from "@/types/VacancyResponse";
import { App, Button, Col, Row } from "antd";
import { useApproveByCuratorMutation } from "@/store/vacancyResponse/api";

interface ActionsProps {
  vacancyResponse: IVacancyResponse;
}
export const Actions: React.FC<ActionsProps> = ({ vacancyResponse }) => {
  const { notification } = App.useApp();
  const [mutate, { isLoading }] = useApproveByCuratorMutation();

  const handlePressAccept = React.useCallback(async () => {
    try {
      await mutate(vacancyResponse.id).unwrap();
    } catch (e) {
      notification.open({
        type: "error",
        message: "Ошибка выполнения запроса",
        description: "Попробуйте еще раз, или повторите позже",
      });
    }
  }, [mutate, notification, vacancyResponse]);

  return (
    <Row style={{ marginTop: "20px" }}>
      <Col flex={1} />
      <Button type="primary" loading={isLoading} onClick={handlePressAccept}>
        Принять на стажировку
      </Button>
    </Row>
  );
};
