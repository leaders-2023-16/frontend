import React from "react";
import { Col, List, Row, Typography } from "antd";
import { useGetVacanciesQuery } from "@/store/vacancies/api";
import { useNavigate } from "react-router-dom";
import { VacancyStatus } from "@/types/Vacancy";
import {
  useGetWorkPlaceByIdQuery,
  useGetWorkPlacesQuery,
} from "@/store/workPlace/api";
import { Filters } from "./Views/Filters";

export const Content = () => {
  const { data, isLoading } = useGetWorkPlacesQuery();

  const navigate = useNavigate();

  const handlePress = React.useCallback(
    (id: number) => {
      navigate(`/work-places/${id}`);
    },
    [navigate]
  );

  return (
    <>
      <List
        loading={isLoading}
        itemLayout="vertical"
        header={<Filters />}
        size="large"
        dataSource={data}
        renderItem={(item) => (
          <List.Item key={item.id} onClick={() => handlePress(item.id)}>
            <Row>
              <Col flex={1}>
                {item.trainee.first_name} {item.trainee.last_name}
              </Col>
              <Col>Active: {item.is_active ? "Да" : "Нет"}</Col>
            </Row>
          </List.Item>
        )}
      />
    </>
  );
};
