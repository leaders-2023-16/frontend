import React from "react";

import { Col, List, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { useGetIntershipApplicationsQuery } from "@/store/intershipApplications/api";

export const Content = () => {
  const [page, setPage] = React.useState(1);
  const { data, isLoading } = useGetIntershipApplicationsQuery({ page });

  const navigate = useNavigate();

  const handlePress = React.useCallback(
    (id: string) => {
      navigate(`/intership-applications/${id}`);
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
  );
};
