import React from "react";

import { App, Button, Col, Select } from "antd";
import { useAppDispatch, useAppSelector } from "@/store";

import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";
import { useSubmitApplicationStatusMutation } from "../Store/api";
import { getSelectedDirectionTrain } from "../Store/selectors";
import { candidateIndexPageActions } from "../Store";
import {
  TrainDirection,
  TrainDirectionByName,
  TrainDirectionName,
} from "@/types/TrainDirection";

export const SubmitApplicationForm = () => {
  const dispatch = useAppDispatch();
  const { notification } = App.useApp();

  const selectedDirectionTrain = useAppSelector(getSelectedDirectionTrain);

  const [mutate, { isLoading }] = useSubmitApplicationStatusMutation();

  const handleChange = React.useCallback(
    (value: string) => {
      dispatch(candidateIndexPageActions.selectDirectionTrain(value as any));
    },
    [dispatch]
  );

  const handlePressSend = React.useCallback(async () => {
    if (!selectedDirectionTrain) {
      notification.warning({
        message: "Предупреждение",
        description:
          "Для подачи заявки необходимо выбрать направление стажировки",
      });
      return;
    }

    try {
      await mutate(TrainDirectionByName[selectedDirectionTrain]).unwrap();
    } catch (e) {
      notification.open({
        type: "error",
        message: "Ошибка выполнения запроса",
        description: "Попробуйте еще раз, или повторите позже",
      });
    }
  }, [notification, selectedDirectionTrain, mutate]);

  return (
    <Col>
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
