import { useCurrentWorkPlaceQuery } from "@/store/workPlace/api";
import { Col, Empty, Spin, Typography } from "antd";

export const Content = () => {
  const { data, isLoading } = useCurrentWorkPlaceQuery();

  if (!isLoading && !data?.is_active) {
    return <Empty description="Нет активной стажировки" />;
  }

  return (
    <Spin spinning={isLoading}>
      <Col>
        <Typography.Text>Текущая стажировка</Typography.Text>
        <Typography.Title level={2}>{data?.name}</Typography.Title>
        <Typography.Title level={5}>{data?.department.name}</Typography.Title>
      </Col>
    </Spin>
  );
};
