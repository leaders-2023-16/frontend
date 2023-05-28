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

export const WaitingApplicationStatus: FC<{
  direction: TrainDirection;
  status?: IntershipApplicationStatus;
}> = ({ direction, status }) => {
  return (
    <Col>
      <Row justify={"space-between"} align={"middle"}>
        <Col>
          <Space direction="vertical">
            <CustomTitle isTitle>Заявка успешно подана</CustomTitle>
            <CustomTitle>
              Выбрано направление «{TrainDirectionLabel[direction]}»
            </CustomTitle>
            <CustomTitle>
              В ближайшее время куратор првоерит ваше резюме и вы получите
              приглашение на прохождение отбора
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
    </Col>
  );
};
