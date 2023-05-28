import React from "react";
import { Col, List, Row } from "antd";
import { useGetVacanciesQuery } from "@/store/vacancies/api";

export const Content = () => {
  const [page, setPage] = React.useState(1);
  const {
    data,
    isLoading,
  } = useGetVacanciesQuery({ page });

  return (
    <List
      loading={isLoading}
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: setPage,
        pageSize: 10,
      }}
      dataSource={data?.results}
      renderItem={(item) => (
        <List.Item key={item.id} >
          <Row>
            <Col flex={1}>{item.name}</Col>
            <Col>{item.status}</Col>
          </Row>
        </List.Item>
      )}
    />
  );
};
