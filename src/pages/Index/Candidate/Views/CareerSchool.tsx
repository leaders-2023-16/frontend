import { CustomButton } from "@/components/Button";
import { CustomTitle } from "@/components/CustomTitle";
import { Status } from "@/components/Status";
import {
  IntershipApplicationLabel,
  IntershipApplicationStatus,
} from "@/types/IntershipApplication";
import { TrainDirection, TrainDirectionLabel } from "@/types/TrainDirection";
import { Calendar, Col, Row, Space, Tag } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import { FC } from "react";

export const CareerSchool: FC<{
  status?: IntershipApplicationStatus;
  user?: string;
  pass?: string;
}> = ({ status, pass, user }) => {
  return (
    <Col>
      <Row justify={"space-between"} align={"middle"}>
        <Col span={14}>
          <Space direction="vertical">
            <CustomTitle>
              Карьерная школа — это описание что такое карьерная школа Карьерная
              школа — это описание что такое карьерная школа Карьерная школа
              — это описание что такое карьерная школа Карьерная школа — это
              описание что такое карьерная школа Карьерная школа — это описание
              что такое карьерная школа
            </CustomTitle>
          </Space>
        </Col>
        <Col>
          {status && (
            <Status
              status={IntershipApplicationLabel[status]}
              color={
                status === IntershipApplicationStatus.APPROVED
                  ? "green"
                  : status === IntershipApplicationStatus.REJECTED
                  ? "red"
                  : "blue"
              }
            />
          )}
        </Col>
      </Row>
      <Space direction="vertical" style={{ marginTop: "14px" }}>
        {pass && user && (
          <>
            <CustomTitle>Логин: {pass}</CustomTitle>
            <CustomTitle>Пароль: {user}</CustomTitle>
          </>
        )}
        <CustomButton isPrimary disabled>
          Перейти к Карьерной Школе
        </CustomButton>
      </Space>
    </Col>
  );
};
