import React from "react";

import { IVacancyResponse } from "@/types/VacancyResponse";
import { App, Button, Col, Row, Spin } from "antd";
import { useApproveByCuratorMutation } from "@/store/vacancyResponse/api";
import { useGetWorkPlaceByTraineeIdQuery } from "@/store/workPlace/api";
import { useNavigate } from "react-router-dom";

interface ActionsProps {
  vacancyResponse: IVacancyResponse;
}
export const Actions: React.FC<ActionsProps> = ({ vacancyResponse }) => {
  const { notification } = App.useApp();
  const [mutate, { isLoading }] = useApproveByCuratorMutation();

  const { data: workPlace, isLoading: isLoadingWorkPlace } =
    useGetWorkPlaceByTraineeIdQuery(vacancyResponse.applicant.user_id);

  const navigate = useNavigate();

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

  const handlePressGoToWorkPlace = React.useCallback(() => {
    if (!workPlace) {
      return;
    }

    navigate(`/work-places/${workPlace.id}`);
  }, [navigate, workPlace]);

  if (!isLoadingWorkPlace && workPlace) {
    return (
      <Row style={{ marginTop: "20px" }}>
        <Col flex={1} />
        <Button type="primary" onClick={handlePressGoToWorkPlace}>
          К стажировке
        </Button>
      </Row>
    );
  }

  return (
    <Spin spinning={isLoadingWorkPlace}>
      <Row style={{ marginTop: "20px" }}>
        <Col flex={1} />
        <Button type="primary" loading={isLoading} onClick={handlePressAccept}>
          Принять на стажировку
        </Button>
      </Row>
    </Spin>
  );
};
