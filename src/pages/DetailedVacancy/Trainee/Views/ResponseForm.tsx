import React from "react";
import { IVacancy } from "@/types/Vacancy";
import { App, Button, Form, Input } from "antd";
import { useAppDispatch, useAppSelector } from "@/store";
import { getTraineeDetailedVacancyStore } from "../Store/selectors";
import { useRespondVacancyMutation } from "@/store/vacancyResponse/api";
import { traineeDetailedVacancyPageActions } from "../Store";

interface ResponseFormProps {
  vacancy: IVacancy;
}
export const ResponseForm: React.FC<ResponseFormProps> = ({ vacancy }) => {
  const { notification } = App.useApp();

  const dispatch = useAppDispatch();
  const [mutate, { isLoading }] = useRespondVacancyMutation();

  const { testAnswer, coverLetter } = useAppSelector(
    getTraineeDetailedVacancyStore
  );

  const handleChangeTestAnswer = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(traineeDetailedVacancyPageActions.setTestAnswer(e.target.value));
    },
    [dispatch]
  );

  const handleChangeCoveringLetter = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      dispatch(
        traineeDetailedVacancyPageActions.setCoverLetter(e.target.value)
      );
    },
    [dispatch]
  );

  const handlePressRespond = React.useCallback(() => {
    if (testAnswer.length === 0) {
      notification.error({
        message: "Ошибка валидации",
        description:
          "Заполните поле с информацией о выполненном тестовом задании",
      });
      return;
    }

    mutate({
      vacancy: vacancy.id,
      text_answer: testAnswer,
      covering_letter: coverLetter,
    });
  }, [notification, mutate, vacancy, testAnswer, coverLetter]);

  return (
    <Form layout={"vertical"}>
      <Form.Item label="Сопроводительное письмо">
        <Input.TextArea
          placeholder="Напишите почему вы хотите работать именно с нами ;)"
          onChange={handleChangeCoveringLetter}
          value={coverLetter}
          rows={5}
        />
      </Form.Item>
      <Form.Item label="Решение тестового задания">
        <Input
          placeholder="Введите ссылку с решением тестового задания"
          onChange={handleChangeTestAnswer}
          value={testAnswer}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" loading={isLoading} onClick={handlePressRespond}>
          Откликнуться
        </Button>
      </Form.Item>
    </Form>
  );
};
