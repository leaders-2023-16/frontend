import { useGetVacanciesQuery } from "@/store/vacancies/api";
import {
  Button,
  Card,
  Col,
  List,
  Pagination,
  Row,
  Space,
  Spin,
  Tag,
  Typography,
} from "antd";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LIMIT = 2;

const SCHEDULE_TO_LABEL = {
  'part-time': 'от 20ч',
  'full-time': 'от 40ч',
}

export const Content = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetVacanciesQuery({
    page,
    limit: LIMIT,
  });

  const navigate = useNavigate();

  const handlePress = React.useCallback(
    (id: number) => {
      navigate(`/vacancies/${id}`);
    },
    [navigate]
  );
  
  if (isLoading) {
    return <Spin />;
  }

  if (!data?.results.length) {
    return <>Нет подходящих вакансий</>;
  }

  return (
    <>
      <List
        loading={isLoading}
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: setPage,
          current: page,
          pageSize: LIMIT,
          total: data.count,
        }}
        dataSource={data?.results}
        renderItem={(item) => (
          <Card onClick={() => handlePress(item.id)} title={item.required_qualifications.map(e => e.name).join(', ')} extra={[<Tag>{item.status}</Tag>]}>
            <Typography.Paragraph>Занятость: {SCHEDULE_TO_LABEL[item.schedule || 'full-time']}</Typography.Paragraph>
            {/* <Space>
              <Button type="primary">Знать Excel</Button>
              <Button>Знать Excel</Button>
              <Button>Знать Excel</Button>
            </Space> */}
          </Card>
        )}
      />
    </>
  );
};
