import { CustomTitle } from "@/components/CustomTitle";
import { Status } from "@/components/Status";
import {
  IntershipApplicationLabel,
  IntershipApplicationStatus,
} from "@/types/IntershipApplication";
import { TrainDirection, TrainDirectionLabel } from "@/types/TrainDirection";
import { Col, Row, Space } from "antd";
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
          {status === IntershipApplicationStatus.PENDING && (
              <>
                <CustomTitle isTitle>Заявка успешно подана</CustomTitle>
                <CustomTitle>
                  Выбрано направление «{TrainDirectionLabel[direction]}»
                </CustomTitle>
                <CustomTitle>
                  В ближайшее время куратор проверит ваше резюме и вы получите
                  приглашение на прохождение отбора
                </CustomTitle>
              </>
            )}
            {status === IntershipApplicationStatus.APPROVED && (
              <>
                <CustomTitle isTitle>Заявка одобрена</CustomTitle>
                <CustomTitle>
                  Выбрано направление «{TrainDirectionLabel[direction]}»
                </CustomTitle>
              </>
            )}
            {status === IntershipApplicationStatus.REJECTED && (
              <>
                <CustomTitle isTitle>К сожалению ваша заявка была отклонена</CustomTitle>
              </>
            )}
            {status === IntershipApplicationStatus.NEXT_STAGE && (
              <>
                <CustomTitle isTitle>Заявка одобрена</CustomTitle>
                <CustomTitle>
                  Выбрано направление «{TrainDirectionLabel[direction]}»
                </CustomTitle>
                <CustomTitle>
                  Преступайте к прохождению следущего этапа
                </CustomTitle>
              </>
            )}
            {status === IntershipApplicationStatus.NOT_QUALIFY && (
              <>
                <CustomTitle isTitle>Заявка одобрена</CustomTitle>
                <CustomTitle>
                  Выбрано направление «{TrainDirectionLabel[direction]}»
                </CustomTitle>
                <CustomTitle>
                  Преступайте к прохождению следущего этапа
                </CustomTitle>
              </>
            )}
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
