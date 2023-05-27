import React from "react";

import { App, Button, Col, List, Row } from "antd";
import { useNavigate } from "react-router-dom";
import {
  useEndUpSelectionMutation,
  useGetIntershipApplicationsQuery,
} from "@/store/intershipApplications/api";

export const Content = () => {
  const [page, setPage] = React.useState(1);
  const { notification } = App.useApp();

  const { data, isLoading } = useGetIntershipApplicationsQuery({ page });
  const [mutate, { isLoading: isStoppingSelection }] =
    useEndUpSelectionMutation();

  const navigate = useNavigate();

  const handlePress = React.useCallback(
    (id: number) => {
      navigate(`/intership-applications/${id}`);
    },
    [navigate]
  );

  const handlePressStopSelection = React.useCallback(async () => {
    try {
      await mutate({}).unwrap();
      setPage(1);
    } catch (e) {
      notification.error({
        message: "Ошибка выполнения запроса",
        description: "Повторите попытку позже",
      });
    }
  }, [mutate, notification]);

  return (
    <>
      <Row>
        <Col flex={1} />
        <Button
          type="primary"
          loading={isStoppingSelection}
          onClick={handlePressStopSelection}
        >
          Закончить отбор
        </Button>
      </Row>
      <List
        loading={isLoading || isStoppingSelection}
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: setPage,
          pageSize: 10,
        }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item key={item._id} onClick={() => handlePress(item._id)}>
            <Row>
              <Col flex={1}>
                {item.applicant.first_name} {item.applicant.last_name}
              </Col>
              <Col>{item.status}</Col>
            </Row>
          </List.Item>
        )}
      />
    </>
  );
};
