import React from "react";

import { useAppDispatch, useAppSelector } from "@/store";
import { Col, Form, Row, Select } from "antd";
import { getCuratorVacanciesPageState } from "../Store/selectors";
import { VacancyStatus } from "@/types/Vacancy";
import { curatorVacanciesPageActions } from "../Store";

export const Filters = () => {
  const dispatch = useAppDispatch();
  const { selectedStatus } = useAppSelector(getCuratorVacanciesPageState);

  const handleChangeStatus = React.useCallback(
    (value: any) => {
      if (value === "all") {
        dispatch(curatorVacanciesPageActions.setSelectedStatus(undefined));
      } else {
        dispatch(curatorVacanciesPageActions.setSelectedStatus(value));
      }
    },
    [dispatch]
  );

  return (
    <Col>
      <Form layout="vertical">
        <Row>
          <Form.Item label="По статусу">
            <Select
              style={{ width: "200px" }}
              value={selectedStatus ? selectedStatus : "all"}
              onChange={handleChangeStatus}
              options={[
                { label: "Все", value: "all" },
                { label: "На рассмотрении", value: VacancyStatus.PENDING },
                { label: "Опубликованные", value: VacancyStatus.PUBLISHED },
                { label: "Закрытые", value: VacancyStatus.CLOSED },
              ]}
            />
          </Form.Item>
        </Row>
      </Form>
    </Col>
  );
};
