import React from "react";
import { Col, List, Row } from "antd";
import { useGetVacanciesQuery } from "@/store/vacancies/api";
import { useNavigate } from "react-router-dom";

export const Content = () => {
  const [page, setPage] = React.useState(1);
  const { data, isLoading } = useGetVacanciesQuery({ page });

  const navigate = useNavigate();

  const handlePress = React.useCallback(
    (id: number) => {
      navigate(`/vacancies/${id}`);
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
            <Col flex={1}>{item.name}</Col>
            <Col>{item.status}</Col>
          </Row>
        </List.Item>
      )}
    />
  );
};
