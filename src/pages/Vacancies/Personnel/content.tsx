import { useGetVacanciesQuery } from "@/store/vacancies";
import { Button, Card, Pagination, Space, Spin, Tag, Typography } from "antd";
import { useState } from "react";

const LIMIT = 10;

export const Content = () => {
  const [page, setPage] = useState(0);
  const { data, isLoading } = useGetVacanciesQuery({
    offset: page * LIMIT,
    limit: LIMIT,
  });

  // if (!data || isLoading) {
  //   return <Spin />;
  // }

  // if (!data.results.length) {
  //   return <>noData</>;
  // }

  return (
    <>
      <Space direction="vertical">
        {data?.results.map((card) => (
          <Card title={card.name}>asdasd</Card>
        ))}
        <Card
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
        </Card>
        <Pagination
          pageSize={LIMIT}
          total={data?.count || 10}
          onChange={(p) => setPage(p)}
        />
      </Space>
    </>
  );
};
