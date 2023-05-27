import React from "react";
import { IVacancyResponse } from "@/types/VacancyResponse";
import { App, Button, Col, Row, Typography } from "antd";
import { useUpdateVacancyResponseMutation } from "@/store/vacancyResponse/api";

interface AcionsProps {
  vacancyResponse: IVacancyResponse;
}
export const Actions: React.FC<AcionsProps> = ({ vacancyResponse }) => {
  const { notification } = App.useApp();

  const [mutate, { isLoading }] = useUpdateVacancyResponseMutation();

  const handlePressAccept = React.useCallback(async () => {
    try {
      await mutate({
        id: vacancyResponse.id,
        approved_by_applicant: true,
      }).unwrap();
    } catch (e) {
      notification.open({
        type: "error",
        message: "Ошибка выполнения запроса",
        description: "Попробуйте еще раз, или повторите позже",
      });
    }
  }, [mutate, vacancyResponse, notification]);

  const handlePressReject = React.useCallback(async () => {
    try {
      await mutate({
        id: vacancyResponse.id,
        approved_by_applicant: false,
      }).unwrap();
    } catch (e) {
      notification.open({
        type: "error",
        message: "Ошибка выполнения запроса",
        description: "Попробуйте еще раз, или повторите позже",
      });
    }
  }, [mutate, vacancyResponse, notification]);

  if (
    vacancyResponse.approved_by_mentor &&
    typeof vacancyResponse.approved_by_applicant !== "boolean"
  ) {
    return (
      <Row style={{ marginTop: "20px" }}>
        <Col flex={1} />
        <Button danger loading={isLoading} onClick={handlePressReject}>
          Отклонить
        </Button>
        <Col style={{ width: "10px" }}></Col>
        <Button type="primary" loading={isLoading} onClick={handlePressAccept}>
          Принять
        </Button>
      </Row>
    );
  }

  if (typeof vacancyResponse.approved_by_applicant === "boolean") {
    return (
      <Col style={{ marginTop: "20px" }}>
        <Typography.Text>
          Приглашение:{" "}
          {vacancyResponse.approved_by_mentor ? "Принято" : "Отклонено"}
        </Typography.Text>
      </Col>
    );
  }

  return null;
};
