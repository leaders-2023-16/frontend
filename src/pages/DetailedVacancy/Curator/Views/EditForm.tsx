import React from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  TrainDirection,
  TrainDirectionByName,
  TrainDirectionName,
} from "@/types/TrainDirection";
import { App, Button, Col, Form, Input, Row, Select, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import { getCuratorDetailedVacancyStore } from "../Store/selectors";
import { curatorDetailedVacancyPageActions } from "../Store";
import { useUpdateVacancyMutation } from "@/store/vacancies/api";
import { IVacancy, VacancyTestTaskType } from "@/types/Vacancy";

interface EditFormProps {
  vacancy: IVacancy;
}
export const EditForm: React.FC<EditFormProps> = ({ vacancy }) => {
  const { notification } = App.useApp();
  const dispatch = useAppDispatch();

  const {
    form: { position, direction, description, test_task, schedule, skills },
  } = useAppSelector(getCuratorDetailedVacancyStore);

  const [mutate, { isLoading }] = useUpdateVacancyMutation();

  const handleChangeDirection = React.useCallback(
    (value: string) => {
      dispatch(curatorDetailedVacancyPageActions.setDirection(value));
    },
    [dispatch]
  );

  const handleChangePosition = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(curatorDetailedVacancyPageActions.setPosition(e.target.value));
    },
    [dispatch]
  );

  const handleChangeDescription = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      dispatch(
        curatorDetailedVacancyPageActions.setDescription(e.target.value)
      );
    },
    [dispatch]
  );

  const handleChangeTestTask = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(curatorDetailedVacancyPageActions.setTestTask(e.target.value));
    },
    [dispatch]
  );

  const handleChangeSchedule = React.useCallback(
    (value: string) => {
      dispatch(curatorDetailedVacancyPageActions.setSchedule(value as any));
    },
    [dispatch]
  );

  const handleChangeSkills = React.useCallback(
    (value: string[]) => {
      dispatch(curatorDetailedVacancyPageActions.setSkills(value));
    },
    [dispatch]
  );

  const handlePressSave = async () => {
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

    try {
      await mutate({
        id: vacancy.id,
        required_qualifications: skills,
        schedule,
        name: position,
        description,
        direction: (TrainDirectionByName as any)[direction],
        mentor: 9,
        test_task: vacancy.test_task
          ? {
              type: VacancyTestTaskType.TEXT,
              title: "Тестовое задание",
              description: test_task,
            }
          : {
              type: VacancyTestTaskType.TEXT,
              title: "Тестовое задание",
              description: test_task,
            },
      }).unwrap();

      dispatch(curatorDetailedVacancyPageActions.reset());
    } catch (e) {
      notification.open({
        type: "error",
        message: "Ошибка выполнения запроса",
        description: "Попробуйте еще раз, или повторите позже",
      });
    }
  };

  return (
    <Col>
      <Form layout={"vertical"}>
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

        <Typography.Title level={5}>Описание вакансии</Typography.Title>

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
                value: "part-time",
                label: "20ч в неделю",
              },
              {
                value: "full-time",
                label: "40ч в неделю",
              },
            ]}
            value={schedule}
            onChange={handleChangeSchedule}
          />
        </Form.Item>

        <Form.Item label="Навыки">
          <Select
            mode="tags"
            placeholder="Напишите необходимые навыки"
            onChange={handleChangeSkills}
            value={skills}
          />
        </Form.Item>

        <Typography.Title level={5}>Тестовое задание</Typography.Title>
        <Form.Item>
          <Input
            placeholder="Введите ссылку на тестовое задание ..."
            value={test_task}
            onChange={handleChangeTestTask}
          />
        </Form.Item>
      </Form>

      <Row style={{ marginTop: "20px" }}>
        <Col flex={1}></Col>
        <Row>
          <Button type="primary" loading={isLoading} onClick={handlePressSave}>
            Сохранить
          </Button>
        </Row>
      </Row>
    </Col>
  );
};
