import { Col, theme } from "antd";
import React from "react";

interface SurfaceProps {
  children?: React.ReactNode | React.ReactNode[];
}
export const Surface: React.FC<SurfaceProps> = ({ children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Col style={{ padding: "20px", backgroundColor: colorBgContainer }}>
      {children}
    </Col>
  );
};
