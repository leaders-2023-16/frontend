import React from "react";
import { Col, List, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { useGetWorkPlacesQuery } from "@/store/workPlace/api";

import { useAppSelector } from "@/store";
import { selectAuthUser } from "@/store/auth/selectors";

export const LastWorkPlaces = () => {
  const user = useAppSelector(selectAuthUser);
  const { data, isLoading } = useGetWorkPlacesQuery(
    { trainee_id: user?.id || 0 },
    { skip: !user }
  );

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
