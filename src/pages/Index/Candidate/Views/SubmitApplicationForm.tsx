import React, { useState } from "react";

import {
  App,
  Col,
  List,
  Modal,
  Row,
  Space,
} from "antd";
import {
  TrainDirection,
  TrainDirectionLabel,
} from "@/types/TrainDirection";
import { useSubmitIntershipApplicationMutation } from "@/store/intershipApplications/api";
import { CustomTitle } from "@/components/CustomTitle";
import { CustomButton } from "@/components/Button";
import { useNavigate } from "react-router-dom";

const directions = [
  {
    value: TrainDirection.IT_CITY,
    label: "IT-город",
  },
  {
    value: TrainDirection.MEDIA_CITY,
    label: "Медийный город",
  },
  {
    value: TrainDirection.SOCIAL_CITY,
    label: "Социальный город",
  },

  {
    value: TrainDirection.COMFORT_CITY_ZONE,
    label: "Комфортная городская среда",
  },

  {
    value: TrainDirection.RIGHTS_AREA,
    label: "Правовое пространство",
  },

  {
    value: TrainDirection.CITY_ECONOMIC,
    label: "Городская экономика",
  },

  {
    value: TrainDirection.HR_CITY,
    label: "HR-город",
  },
];

export const SubmitApplicationForm = () => {
  const { notification } = App.useApp();
  const navigate = useNavigate();
  const [modal, openModal] = useState<null | TrainDirection>(null);
  const [mutate, { isLoading }] = useSubmitIntershipApplicationMutation();
  const handlePressSend = React.useCallback(
    async (el: TrainDirection) => {
      try {
        await mutate(el).unwrap();
        openModal(null)
      } catch (e) {
        notification.open({
          type: "error",
          message: "Ошибка выполнения запроса",
          description: "Попробуйте еще раз, или повторите позже",
        });
      }
    },
    [notification, mutate]
  );

  return (
    <Col>
      <CustomTitle>
        В рамках стажировки вы можете выбрать только одно направление. Перед
        подачей заявки убедитесь, что ваш профиль заполнен максимально подробно.
        Отбор происходит на основании данных вашего профиля.
      </CustomTitle>
      <List style={{ marginTop: "24px" }}>
        {directions.map((el, idx) => (
          <>
            <Row
              style={{
                height: "132px",
                padding: "16px 24px",
                borderTop: "1px solid #D5D9DC",
              }}
            >
              <Col span={1}>
                <CustomTitle>{idx + 1}</CustomTitle>
              </Col>
              <Col span={6}>
                <CustomTitle>{el.label}</CustomTitle>
              </Col>
              <Col span={11}>
                <Space direction="vertical">
                  <CustomTitle>Описание направления: </CustomTitle>
                  <CustomTitle>
                    Главный специалист отдела по обеспечению контроля качества
                    оказания услуг по организации питания в учрежде
                  </CustomTitle>
                </Space>
              </Col>
              <Col span={4}>
                <Space size={"large"} style={{ marginTop: "22px" }}>
                  <CustomButton isPrimary onClick={() => openModal(el.value)}>
                    Выбрать
                  </CustomButton>
                </Space>
              </Col>
            </Row>
          </>
        ))}
      </List>
      {!!modal && (
        <Modal open={true} footer={false} onCancel={() => openModal(null)}>
          <div style={{ padding: "28px 36px" }}>
            <div
              style={{
                fontSize: "36px",
                lineHeight: "40px",
                textAlign: "center",
                color: "#1A1230",
              }}
            >
              {TrainDirectionLabel[modal]}
            </div>
            <div
              style={{
                fontSize: "24px",
                lineHeight: "32px",
                textAlign: "center",
                color: "#1A1230",
                marginTop:'32px'
              }}
            >
              Убедитесь, что данные вашего профиля заполнены
            </div>
            <Space direction={"vertical"} style={{ width: "100%", marginTop:'32px' }}>
              <CustomButton
                isPrimary
                style={{ width: "400px" }}
                onClick={() => handlePressSend(modal)}
              >
                Выбрать
              </CustomButton>
              <CustomButton 
              style={{ width: "400px" }}
              onClick={() => openModal(null)}>
                Вернуться
              </CustomButton>
            </Space>
          </div>
        </Modal>
      )}
    </Col>
  );
};
