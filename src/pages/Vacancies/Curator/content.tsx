import React from "react";
import { Col, List, Row, Typography } from "antd";
import { useGetVacanciesQuery } from "@/store/vacancies/api";
import { useNavigate } from "react-router-dom";
import { Filters } from "./Views/Filters";
import { useAppSelector } from "@/store";
import { getCuratorVacanciesPageState } from "./Store/selectors";

export const Content = () => {
  const [page, setPage] = React.useState(1);

  const { selectedStatus } = useAppSelector(getCuratorVacanciesPageState);
  const { data, isLoading } = useGetVacanciesQuery({
    page,
    status: selectedStatus,
  });

  const navigate = useNavigate();

  const handlePress = React.useCallback(
    (id: number) => {
      navigate(`/vacancies/${id}`);
    },
    [navigate]
  );

  return (
    <>
      <Row>
        <Col flex={1} />
        <Typography.Text>Всего: {data?.count || "-"}</Typography.Text>
      </Row>
      <List
        loading={isLoading}
        itemLayout="vertical"
        size="large"
        header={<Filters />}
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
              <Col flex={1}>{item.name}</Col>
              <Col>{item.status}</Col>
            </Row>
          </List.Item>
        )}
      />
    </>
  );
};
