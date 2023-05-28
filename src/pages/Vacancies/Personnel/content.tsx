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
import { useState } from "react";

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
          <Card title={item.required_qualifications.map(e => e.name).join(', ')} extra={[<Tag>{item.status}</Tag>]}>
            <Typography.Paragraph>Занятость: {SCHEDULE_TO_LABEL[item.schedule]}</Typography.Paragraph>
            <Space>
              <Button type="primary">Знать Excel</Button>
              <Button>Знать Excel</Button>
              <Button>Знать Excel</Button>
            </Space>
          </Card>
        )}
      />

      {/* <Card
          title="Должность"
          extra={[<Tag>Статус</Tag>]}
        >
            <Typography.Paragraph>Занятость: от 20ч</Typography.Paragraph>
            <Space>
              <Button type='primary' >Знать Excel</Button>
              <Button>Знать Excel</Button>
              <Button>Знать Excel</Button>
            </Space>
        </Card>
        <Card title="Должность" extra={[<Tag>Статус</Tag>]}>
          <Typography.Paragraph>Занятость: от 20ч</Typography.Paragraph>
          <Space>
            <Button>Знать Excel</Button>
            <Button>Знать Excel</Button>
            <Button>Знать Excel</Button>
          </Space>
        </Card>
        <Card title="Должность" extra={[<Tag>Статус</Tag>]}>
          <Typography.Paragraph>Занятость: от 20ч</Typography.Paragraph>
          <Space>
            <Button>Знать Excel</Button>
            <Button>Знать Excel</Button>
            <Button>Знать Excel</Button>
          </Space>
        </Card> */}
    </>
  );
};
