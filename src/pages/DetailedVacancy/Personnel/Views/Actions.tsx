import React from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { IVacancy, VacancyStatus } from "@/types/Vacancy";
import { Button, Col, Row } from "antd";
import { personnelDetailedVacancyPageActions } from "../Store";

interface ActionsProps {
  vacancy: IVacancy;
}
export const Actions: React.FC<ActionsProps> = ({ vacancy }) => {
  const dispatch = useAppDispatch();

  const handlePressEdit = React.useCallback(() => {
    dispatch(personnelDetailedVacancyPageActions.moveToEditMode({ vacancy }));
  }, [dispatch, vacancy]);

  if (vacancy.status === VacancyStatus.REJECTED) {
    <Row style={{ marginTop: "20px" }}>
      <Col flex={1}></Col>
      <Row>
        <Button onClick={handlePressEdit}>Редактировать</Button>
      </Row>
    </Row>;
  }

  return null;
};
