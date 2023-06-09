import React from "react";
import { IVacancy, VacancyStatus } from "@/types/Vacancy";
import { Button, Col, Row } from "antd";
import { useUpdateVacancyMutation } from "@/store/vacancies/api";
import { useAppDispatch, useAppSelector } from "@/store";
import { getCuratorDetailedVacancyStore } from "../Store/selectors";
import { curatorDetailedVacancyPageActions } from "../Store";

interface ActionsProps {
  vacancy: IVacancy;
}

export const Actions: React.FC<ActionsProps> = ({ vacancy }) => {
  const dispatch = useAppDispatch();
  const { isEditing } = useAppSelector(getCuratorDetailedVacancyStore);

  const [mutate, { isLoading }] = useUpdateVacancyMutation();

  const handlePressReturn = React.useCallback(() => {
    mutate({ id: vacancy.id, status: VacancyStatus.PENDING });
  }, [mutate, vacancy.id]);

  const handlePressClose = React.useCallback(() => {
    mutate({ id: vacancy.id, status: VacancyStatus.CLOSED });
  }, [mutate, vacancy.id]);

  const handlePressPublish = React.useCallback(() => {
    mutate({ id: vacancy.id, status: VacancyStatus.PUBLISHED });
  }, [mutate, vacancy.id]);

  const handlePressEdit = React.useCallback(() => {
    dispatch(curatorDetailedVacancyPageActions.moveToEditMode({ vacancy }));
  }, [dispatch, vacancy]);

  if (isEditing) {
    return (
      <Row style={{ marginTop: "20px" }}>
        <Col flex={1}></Col>
        <Row>
          <Button type="primary">Сохранить</Button>
        </Row>
      </Row>
    );
  }

  if (vacancy.status === VacancyStatus.PUBLISHED) {
    return (
      <Row style={{ marginTop: "20px" }}>
        <Col flex={1}></Col>
        <Row>
          <Button danger onClick={handlePressClose} loading={isLoading}>
            Закрыть
          </Button>
          <Col style={{ width: "10px" }} />
          <Button danger onClick={handlePressReturn} loading={isLoading}>
            Вернуть на рассмотрение
          </Button>
          <Col style={{ width: "10px" }} />
          <Button loading={isLoading} onClick={handlePressEdit}>
            Редактировать
          </Button>
        </Row>
      </Row>
    );
  }

  if (vacancy.status === VacancyStatus.REJECTED) {
    return null;
  }

  if (vacancy.status === VacancyStatus.PENDING) {
    return (
      <Row style={{ marginTop: "20px" }}>
        <Col flex={1}></Col>
        <Row>
          <Button danger onClick={handlePressClose} loading={isLoading}>
            Закрыть
          </Button>
          <Col style={{ width: "10px" }} />
          <Button loading={isLoading} onClick={handlePressEdit}>
            Редактировать
          </Button>
          <Col style={{ width: "10px" }} />
          <Button
            type="primary"
            onClick={handlePressPublish}
            loading={isLoading}
          >
            Опубликовать
          </Button>
        </Row>
      </Row>
    );
  }

  return (
    <Row style={{ marginTop: "20px" }}>
      <Col flex={1}></Col>
      <Row>
        <Button type="primary" onClick={handlePressReturn} loading={isLoading}>
          Вернуть на рассмотрение
        </Button>
      </Row>
    </Row>
  );
};
