import { Col, Row } from "antd";
import React from "react";

interface ContainerProps {
  children?: React.ReactNode | React.ReactNode[];
}
export const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <Row justify={"space-between"} style={{ }}>
      {/* <Col xs={1} sm={2} md={3} lg={4} xl={4} flex={1} style={{maxWidth: '144px'}} /> */}
      <Col
        
        flex={1}
        style={{ width: '100%', backgroundColor: 'white', padding: '24px' }}
      >
        {children}
      </Col>
      {/* <Col xs={1} sm={2} md={3} lg={4} xl={4} flex={1} style={{maxWidth: '144px'}}  /> */}
    </Row>
  );
};
