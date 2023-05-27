import React from "react";

import { useGetVacancyResponsesQuery } from "@/store/vacancyResponse/api";
import { IVacancy } from "@/types/Vacancy";
import { IVacancyResponse } from "@/types/VacancyResponse";
import { useNavigate } from "react-router-dom";
import { Col, List, Row } from "antd";

interface ResponsesProps {
  vacancy: IVacancy;
}
export const Responses: React.FC<ResponsesProps> = ({ vacancy }) => {
  const [page, setPage] = React.useState(1);
  const { data, isLoading } = useGetVacancyResponsesQuery({
    page,
    vacancy: vacancy.id,
  });

  const navigate = useNavigate();

  const handlePress = React.useCallback(
    (id: number) => {
      navigate(`/vacancy-responses/${id}`);
    },
    [navigate]
  );

  return (
    <List
      loading={isLoading}
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: setPage,
        pageSize: 10,
        defaultCurrent: 1,
        total: data?.count,
      }}
      dataSource={data?.results}
      renderItem={(item) => (
        <List.Item key={item.id} onClick={() => handlePress(item.id)}>
          <Row>
            <Col flex={1}>
              {item.applicant.first_name} {item.applicant.last_name}
            </Col>
            <Col>
              {item.approved_by_applicant && item.approved_by_mentor
                ? "Приглашение принято"
                : item.approved_by_applicant
                ? "Приглашен"
                : typeof item.approved_by_applicant === "boolean"
                ? "Отклонен"
                : "-"}
            </Col>
          </Row>
        </List.Item>
      )}
    />
  );
};
