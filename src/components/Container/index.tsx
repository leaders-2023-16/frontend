import { Col, Row } from "antd";
import React from "react";

interface ContainerProps {
  children?: React.ReactNode | React.ReactNode[];
}
export const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <Row justify={"space-between"}>
      <Col xs={1} sm={2} md={3} lg={4} xl={4} flex={1} />
      <Col
        xs={22}
        sm={20}
        md={18}
        lg={18}
        xl={16}
        style={{ maxWidth: "1312px" }}
      >
        {children}
      </Col>
      <Col xs={1} sm={2} md={3} lg={4} xl={4} flex={1} />
    </Row>
  );
};
