import React from "react";
import { Col, List, Row, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useGetVacancyResponsesQuery } from "@/store/vacancyResponse/api";

export const Content = () => {
  const [page, setPage] = React.useState(1);
  const { data, isLoading } = useGetVacancyResponsesQuery({ page });

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
      }}
      dataSource={data}
      renderItem={(item) => (
        <List.Item key={item.id} onClick={() => handlePress(item.id)}>
          <Row>
            <Col flex={1}>
              <Col>
                <Typography.Text>
                  {item.applicant.first_name} {item.applicant.last_name}
                </Typography.Text>
              </Col>
              <Typography.Text>{item.vacancy.name}</Typography.Text>
            </Col>
            <Col>
              {typeof item.approved_by_mentor === "boolean"
                ? item.approved_by_mentor
                  ? "Приглашен"
                  : "Отлонен"
                : "На рассмотрении"}
            </Col>
          </Row>
        </List.Item>
      )}
    />
  );
};
