import React from "react";
import { Button, Col, Select } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import { useAppDispatch, useAppSelector } from "../../../store";
import { getSelectedDirectionTrain } from "../../../store/submitApplicationScreen/selectors";
import { submitApplicationScreenActions } from "../../../store/submitApplicationScreen";

export const IndexPage = () => {
  const dispatch = useAppDispatch();
  const selectedDirectionTrain = useAppSelector(getSelectedDirectionTrain);

  const handleChange = React.useCallback(
    (value: string) => {
      dispatch(submitApplicationScreenActions.selectDirectionTrain(value));
    },
    [dispatch]
  );

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
            value: "it-city",
            label: "IT-город",
          },
          {
            value: "media-city",
            label: "Медийный город",
          },
          {
            value: "social-city",
            label: "Социальный город",
          },

          {
            value: "comfort-city-zone",
            label: "Комфортная городская среда",
          },

          {
            value: "rights-area",
            label: "Правовое пространство",
          },

          {
            value: "city-economic",
            label: "Городская экономика",
          },

          {
            value: "hr-city",
            label: "HR-город",
          },
        ]}
      />
      <Col style={{ marginTop: "20px" }}>
        <Button type="primary">Подать заявку</Button>
      </Col>
    </Col>
  );
};
