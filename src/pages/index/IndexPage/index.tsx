import React from "react";
import { Button, Col, Select, notification } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import { useAppDispatch, useAppSelector } from "../../../store";
import {
  getDirectionTrainSelectError,
  getIsSubmitingApplication,
  getSelectedDirectionTrain,
} from "../../../store/submitApplicationScreen/selectors";
import {
  submitApplicationActionAsync,
  submitApplicationScreenActions,
} from "../../../store/submitApplicationScreen";
import {
  TrainDirection,
  TrainDirectionByName,
  TrainDirectionName,
} from "../../../store/submitApplicationScreen/types";

export const IndexPage = () => {
  const dispatch = useAppDispatch();
  const [api, contextHolder] = notification.useNotification();

  const selectedDirectionTrain = useAppSelector(getSelectedDirectionTrain);
  const isLoading = useAppSelector(getIsSubmitingApplication);

  const handleChange = React.useCallback(
    (value: string) => {
      dispatch(submitApplicationScreenActions.selectDirectionTrain(value));
    },
    [dispatch]
  );

  const handlePressSend = React.useCallback(() => {
    if (!selectedDirectionTrain) {
      api.warning({
        message: "Предупреждение",
        description:
          "Для подачи заявки необходимо выбрать направление стажировки",
      });
      return;
    }

    dispatch(
      submitApplicationActionAsync(TrainDirectionByName[selectedDirectionTrain])
    );
  }, [dispatch, api, selectedDirectionTrain]);

  return (
    <Col>
      {contextHolder}
      <Title>Подать заявку</Title>
      <Paragraph>
        Для участия в стажировке необходимо выбрать направление и заполнить всю
        необходимую информацию в профиле.
      </Paragraph>
      <Select
        showSearch
        value={selectedDirectionTrain}
        onChange={handleChange}
        placeholder="Выберите направление стажировки"
        optionFilterProp="children"
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        options={[
          {
            value: TrainDirectionName[TrainDirection.IT_CITY],
            label: "IT-город",
          },
          {
            value: TrainDirectionName[TrainDirection.MEDIA_CITY],
            label: "Медийный город",
          },
          {
            value: TrainDirectionName[TrainDirection.SOCIAL_CITY],
            label: "Социальный город",
          },

          {
            value: TrainDirectionName[TrainDirection.COMFORT_CITY_ZONE],
            label: "Комфортная городская среда",
          },

          {
            value: TrainDirectionName[TrainDirection.RIGHTS_AREA],
            label: "Правовое пространство",
          },

          {
            value: TrainDirectionName[TrainDirection.CITY_ECONOMIC],
            label: "Городская экономика",
          },

          {
            value: TrainDirectionName[TrainDirection.HR_CITY],
            label: "HR-город",
          },
        ]}
      />
      <Col style={{ marginTop: "20px" }}>
        <Button type="primary" onClick={handlePressSend} loading={isLoading}>
          Подать заявку
        </Button>
      </Col>
    </Col>
  );
};
