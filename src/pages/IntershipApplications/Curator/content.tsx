import React from "react";

import { Col, List, Row, Tag, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useGetIntershipApplicationsQuery } from "@/store/intershipApplications/api";
import { Filters } from "./Views/Filters";
import { useAppSelector } from "@/store";
import { getCuratorInternshipApplicationsPageState } from "./Store/selectors";
import { IntershipApplicationLabel } from "@/types/IntershipApplication";

export const Content = () => {
  const [page, setPage] = React.useState(1);

  const { onlyRecommended, selectedStatus } = useAppSelector(
    getCuratorInternshipApplicationsPageState
  );
  const { data, isLoading } = useGetIntershipApplicationsQuery({
    page,
    is_recommended: onlyRecommended ? true : undefined,
    status: selectedStatus,
  });

  const navigate = useNavigate();

  const handlePress = React.useCallback(
    (id: number) => {
      navigate(`/intership-applications/${id}`);
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
        header={<Filters />}
        size="large"
        pagination={{
          onChange: setPage,
          pageSize: 10,
          defaultCurrent: 1,
          total: data?.count,
        }}
        dataSource={data?.results}
        renderItem={(item) => (
          <List.Item
            key={item.applicant.id}
            onClick={() => handlePress(item.applicant.id)}
          >
            <Row>
              <Col flex={1}>
                {item.applicant.first_name} {item.applicant.last_name}
              </Col>
              <Tag>
                {item.status ? IntershipApplicationLabel[item.status] : "-"}
              </Tag>
            </Row>
          </List.Item>
        )}
      />
    </>
  );
};
