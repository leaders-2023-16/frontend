import React from "react";

import { Col } from "antd";
import { Surface } from "../Surface";

interface TemplateWithMenuProps {
  menu: React.ReactNode;
  content: React.ReactNode;
}
export const TemplateWithMenu: React.FC<TemplateWithMenuProps> = ({
  menu,
  content,
}) => {
  return (
    <Col
      style={{
        display: "grid",
        gridTemplateColumns: "220px 1fr",
      }}
    >
      <Col style={{ marginRight: "20px" }}>
        <Surface>{menu}</Surface>
      </Col>
      <Col>
        <Surface>{content}</Surface>
      </Col>
    </Col>
  );
};
