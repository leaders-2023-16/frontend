import React from "react";
import { Col, List, Row } from "antd";
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
        defaultCurrent: 1,
        total: data?.count,
      }}
      dataSource={data?.results}
      renderItem={(item) => (
        <List.Item key={item.id} onClick={() => handlePress(item.id)}>
          <Row>
            <Col flex={1}>{item.vacancy.name}</Col>
            <Col>{item.approved_by_mentor}</Col>
          </Row>
        </List.Item>
      )}
    />
  );
};
