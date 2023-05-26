import React from "react";

import { useCreateVacancyMutation } from "@/store/vacancies/api";
import {
  TrainDirection,
  TrainDirectionByName,
  TrainDirectionName,
} from "@/types/TrainDirection";
import { App, Avatar, Button, Col, Form, Input, Row, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import Title from "antd/es/typography/Title";

import type { CustomTagProps } from "rc-select/lib/BaseSelect";
import { useAppDispatch, useAppSelector } from "@/store";
import { getPersonnelCreateVacancyForm } from "./Store/selectors";
import { personnelCreateVacancyPageActions } from "./Store";
import { VacancyStatus, VacancyTestTaskType } from "@/types/Vacancy";

export const Content = () => {
  const [form] = Form.useForm();

  const { notification } = App.useApp();

  const dispatch = useAppDispatch();
  const { position, description, direction, test_task } = useAppSelector(
    getPersonnelCreateVacancyForm
  );
  const [mutate, { isLoading }] = useCreateVacancyMutation();

  const handleChangeDirection = React.useCallback(
    (value: string) => {
      dispatch(personnelCreateVacancyPageActions.setDirection(value));
    },
    [dispatch]
  );

  const handleChangePosition = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(personnelCreateVacancyPageActions.setPosition(e.target.value));
    },
    [dispatch]
  );

  const handleChangeDescription = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      dispatch(
        personnelCreateVacancyPageActions.setDescription(e.target.value)
      );
    },
    [dispatch]
  );

  const handleChangeTestTask = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(personnelCreateVacancyPageActions.setTestTask(e.target.value));
    },
    [dispatch]
  );

  const handlePressCreate = () => {
    if (
      position.length === 0 ||
      description.length === 0 ||
      test_task.length === 0
    ) {
      notification.error({
        message: "Форма заполнена неверно",
        description: "Пожалуйста, заполните все поля формы",
      });
      return;
    }

    mutate({
      required_qualifications: [],
      name: position,
      description,
      direction: (TrainDirectionByName as any)[direction],
      status: VacancyStatus.PENDING,
      mentor: 15,
      test_task: {
        type: VacancyTestTaskType.TEXT,
        title: "Тестовое задание",
        description: test_task,
      },
    });
  };

  return (
    <Col>
      <Form layout={"vertical"} form={form}>
        <Form.Item label="Должность">
          <Input
            placeholder="Введите должность ..."
            value={position}
            onChange={handleChangePosition}
          />
        </Form.Item>

        <Form.Item label="Направление стажировки">
          <Select
            showSearch
            placeholder="Выберите направление стажировки"
            optionFilterProp="children"
            value={direction}
            onChange={handleChangeDirection}
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
        </Form.Item>

        <Title level={5}>Описание вакансии</Title>

        <Form.Item>
          <TextArea
            placeholder="Описание вакансии ..."
            value={description}
            onChange={handleChangeDescription}
            rows={10}
          />
        </Form.Item>

        <Form.Item label="Занятость">
          <Select
            placeholder="Выберите занятость"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={[
              {
                value: 20,
                label: "20ч в неделю",
              },
              {
                value: 40,
                label: "40ч в неделю",
              },
            ]}
          />
        </Form.Item>

        <Form.Item label="Навыки">
          <Select mode="tags" placeholder="Напишите необходимые навыки" />
        </Form.Item>

        <Form.Item label="Задачи">
          <Select mode="tags" placeholder="Какие задачи предстоит решать" />
        </Form.Item>

        <Title level={5}>Наставник</Title>
        <Form.Item>
          <Select
            mode="multiple"
            showArrow
            tagRender={tagRender}
            style={{ width: "100%" }}
            placeholder="Выберите наставника ..."
            options={options}
          />
        </Form.Item>

        <Title level={5}>Тестовое задание</Title>
        <Form.Item>
          <Input
            placeholder="Введите ссылку на тестовое задание ..."
            value={test_task}
            onChange={handleChangeTestTask}
          />
        </Form.Item>

        <Button type="primary" onClick={handlePressCreate} loading={isLoading}>
          Создать
        </Button>
      </Form>
    </Col>
  );
};

const options = [{ value: "Иванов Иван" }];

const tagRender = (props: CustomTagProps) => {
  const { label, onClose } = props;
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();

    onClose();
  };
  return (
    <Row
      style={{
        margin: "3px",
        alignItems: "center",
        padding: "2px",
        borderRadius: "10px",
        border: "1px solid #C4C4C4",
      }}
      onClick={onPreventMouseDown}
    >
      <Avatar
        style={{ backgroundColor: "black", verticalAlign: "middle" }}
        size="small"
      >
        {label?.toString().at(0)}
      </Avatar>
      <span style={{ marginLeft: "10px", marginRight: "5px" }}>{label}</span>
    </Row>
  );
};
