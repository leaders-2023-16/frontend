import React from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  TrainDirection,
  TrainDirectionByName,
  TrainDirectionName,
} from "@/types/TrainDirection";
import {
  App,
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Spin,
  Typography,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useUpdateVacancyMutation } from "@/store/vacancies/api";
import { IVacancy, VacancyTestTaskType } from "@/types/Vacancy";
import { getPersonnelDetailedVacancyStore } from "../Store/selectors";
import { personnelDetailedVacancyPageActions } from "../Store";
import Title from "antd/es/typography/Title";
import { useGetFreeMentorsQuery } from "@/store/users/api";

interface EditFormProps {
  vacancy: IVacancy;
}
export const EditForm: React.FC<EditFormProps> = ({ vacancy }) => {
  const { notification } = App.useApp();
  const dispatch = useAppDispatch();

  const {
    form: {
      position,
      direction,
      description,
      test_task,
      schedule,
      skills,
      mentor,
    },
  } = useAppSelector(getPersonnelDetailedVacancyStore);

  const { data: mentors, isLoading: isLoadingMentors } =
    useGetFreeMentorsQuery();
  const [mutate, { isLoading }] = useUpdateVacancyMutation();

  const handleChangeDirection = React.useCallback(
    (value: string) => {
      dispatch(personnelDetailedVacancyPageActions.setDirection(value));
    },
    [dispatch]
  );

  const handleChangePosition = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(personnelDetailedVacancyPageActions.setPosition(e.target.value));
    },
    [dispatch]
  );

  const handleChangeDescription = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      dispatch(
        personnelDetailedVacancyPageActions.setDescription(e.target.value)
      );
    },
    [dispatch]
  );

  const handleChangeTestTask = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(personnelDetailedVacancyPageActions.setTestTask(e.target.value));
    },
    [dispatch]
  );

  const handleChangeSchedule = React.useCallback(
    (value: string) => {
      dispatch(personnelDetailedVacancyPageActions.setSchedule(value as any));
    },
    [dispatch]
  );

  const handleChangeSkills = React.useCallback(
    (value: string[]) => {
      dispatch(personnelDetailedVacancyPageActions.setSkills(value));
    },
    [dispatch]
  );

  const handleChangeMentor = React.useCallback(
    (id: number) => {
      dispatch(personnelDetailedVacancyPageActions.setMentor(id));
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
        mentor,
        name: position,
        description,
        direction: (TrainDirectionByName as any)[direction],
        test_task: {
          type: VacancyTestTaskType.TEXT,
          title: "Тестовое задание",
          description: test_task,
        },
      }).unwrap();

      dispatch(personnelDetailedVacancyPageActions.reset());
    } catch (e) {
      notification.open({
        type: "error",
        message: "Ошибка выполнения запроса",
        description: "Попробуйте еще раз, или повторите позже",
      });
    }
  };

  const currentMentors = vacancy.mentor
    ? [...(mentors || []), vacancy.mentor]
    : mentors || [];
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

        <Title level={5}>Наставник</Title>
        <Form.Item>
          <Spin spinning={isLoadingMentors}>
            <Select
              showArrow
              style={{ width: "100%" }}
              placeholder="Выберите наставника ..."
              options={currentMentors.map((mentor) => ({
                label: mentor.first_name + " " + mentor.last_name,
                value: mentor.id,
              }))}
              onChange={handleChangeMentor}
              value={mentor}
            />
          </Spin>
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
