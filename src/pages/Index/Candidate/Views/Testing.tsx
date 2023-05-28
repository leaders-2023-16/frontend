import { CustomButton } from "@/components/Button";
import { CustomTitle } from "@/components/CustomTitle";
import { Status } from "@/components/Status";
import {
  IntershipApplicationLabel,
  IntershipApplicationStatus,
} from "@/types/IntershipApplication";
import { Col, Row, Space, Tooltip } from "antd";
import { FC } from "react";

export const Testing: FC<{
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
              Тестирование — это описание что представляет собой этап тести
              Тестирование — это описание что представляет собой этап тести
              Тестирование — это описание что представляет собой этап тести
              Тестирование — это описание что представляет собой этап тести
              Тестирование — это описание что представляет собой этап тести
              Тестирование — это описание что представляет собой этап тести
              Тестирование — это описание что представляет собой этап тести
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
            <CustomButton isPrimary>Перейти к тестированию</CustomButton>
          </>
        )}
        {!pass && !user && (
          <Tooltip title="Кнопка станет доступна после того как вашу заявку одобрят и создадут учетную запись">
          <div style={{
            margin: '18px',
            color: 'grey',
            cursor: 'default'
          }}>Перейти к тестированию</div>
        </Tooltip>
        )}
      </Space>
    </Col>
  );
};
