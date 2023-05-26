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

  const handlePressReject = React.useCallback(() => {
    mutate({ id: vacancy.id, status: VacancyStatus.REJECTED });
  }, [mutate, vacancy.id]);

  const handlePressPublish = React.useCallback(() => {
    mutate({ id: vacancy.id, status: VacancyStatus.REJECTED });
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

  return (
    <Row style={{ marginTop: "20px" }}>
      <Col flex={1}></Col>
      <Row>
        {/* <Button danger onClick={handlePressReject} loading={isLoading}>
          Отклонить
        </Button> */}
        <Col style={{ width: "10px" }} />
        <Button loading={isLoading} onClick={handlePressEdit}>
          Редактировать
        </Button>
        <Col style={{ width: "10px" }} />
        <Button type="primary" onClick={handlePressPublish} loading={isLoading}>
          Опубликовать
        </Button>
      </Row>
    </Row>
  );
};
