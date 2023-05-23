import { Col } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import React from "react";

export const WaitingApplicationStatus = () => {
  return (
    <Col>
      <Title>Заявка успешно подана</Title>
      <Paragraph>
        В ближайшее время куратор првоерит ваше резюме и вы получите приглашение
        на прохождение отбора
      </Paragraph>
    </Col>
  );
};
