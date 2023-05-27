import React from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  useGetTraineeProfileByIdQuery,
  useUpdateTraineeProfileByIdMutation,
} from "@/store/traineeProfile";
import { IIntershipApplication } from "@/types/IntershipApplication";
import {
  App,
  Button,
  Form,
  Input,
  Radio,
  RadioChangeEvent,
  Spin,
  Typography,
} from "antd";
import { getCuratorDetailedIntershipApplicationFormState } from "../Store/selectors";
import { curatorDetailedIntershipApplicationPageActions } from "../Store";
import { TraineeProfileTestStatus } from "@/types/TraineeProfile";

interface SelectionFormProps {
  applicaion: IIntershipApplication;
}
export const SelectionForm: React.FC<SelectionFormProps> = ({ applicaion }) => {
  const dispatch = useAppDispatch();
  const { notification } = App.useApp();

  const [mutate, { isLoading: isUpdatingProfile }] =
    useUpdateTraineeProfileByIdMutation();
  const { data: traineeProfile, isLoading } = useGetTraineeProfileByIdQuery(
    applicaion.applicant.id
  );

  React.useEffect(() => {
    if (!traineeProfile || isUpdatingProfile) {
      return;
    }

    dispatch(
      curatorDetailedIntershipApplicationPageActions.getDataFromProfile(
        traineeProfile
      )
    );
  }, [traineeProfile, isUpdatingProfile, dispatch]);

  const {
    cv_score,

    career_school_username,
    career_school_password,
    career_school_progress,

    testing_platform_password,
    testing_platform_username,

    test_passed,
    test_score,
  } = useAppSelector(getCuratorDetailedIntershipApplicationFormState);

  const handleChangeCareerSchoolUsername = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(
        curatorDetailedIntershipApplicationPageActions.setCareerSchoolUsername(
          e.target.value
        )
      );
    },
    [dispatch]
  );

  const handleChangeCareerSchoolPassword = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(
        curatorDetailedIntershipApplicationPageActions.setCareerSchoolPassword(
          e.target.value
        )
      );
    },
    [dispatch]
  );

  const handleChangeCareerSchoolProgress = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const num = parseInt(e.target.value);

      dispatch(
        curatorDetailedIntershipApplicationPageActions.setCareerSchoolProgress(
          !isNaN(num) ? num : undefined
        )
      );
    },
    [dispatch]
  );

  const handleChangeTestingPlatformUsername = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(
        curatorDetailedIntershipApplicationPageActions.setTestingPlatformUsername(
          e.target.value
        )
      );
    },
    [dispatch]
  );

  const handleChangeTestingPlatformPassoword = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(
        curatorDetailedIntershipApplicationPageActions.setTestingPlatformPassword(
          e.target.value
        )
      );
    },
    [dispatch]
  );

  const handleChangeTestScore = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const num = parseInt(e.target.value);

      dispatch(
        curatorDetailedIntershipApplicationPageActions.setTestScore(
          !isNaN(num) ? num : undefined
        )
      );
    },
    [dispatch]
  );

  const handleChangeCVScore = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const num = parseInt(e.target.value);

      dispatch(
        curatorDetailedIntershipApplicationPageActions.setCVScore(
          !isNaN(num) ? num : undefined
        )
      );
    },
    [dispatch]
  );

  const handleChangeTestPassed = React.useCallback(
    (value: RadioChangeEvent) => {
      dispatch(
        curatorDetailedIntershipApplicationPageActions.setTestPassed(
          value.target.value
        )
      );
    },
    [dispatch]
  );

  const handlePressSave = async () => {
    if (!traineeProfile) {
      return;
    }

    try {
      await mutate({
        id: traineeProfile.user_id,
        data: {
          cv_score,

          career_school_username,
          career_school_password,
          progress_career_school: career_school_progress,

          testing_platform_username,
          testing_platform_password,
          test_score,

          test_status:
            typeof test_passed === "boolean"
              ? test_passed
                ? TraineeProfileTestStatus.PASSED
                : TraineeProfileTestStatus.FAILED
              : TraineeProfileTestStatus.IN_PROGRESS,
        },
      }).unwrap();
    } catch (e) {
      notification.open({
        type: "error",
        message: "Ошибка выполнения запроса",
        description: "Попробуйте еще раз, или повторите позже",
      });
    }
  };

  return (
    <Spin spinning={isLoading}>
      <Form layout={"vertical"}>
        <Typography.Title level={5}>Карьерная школа</Typography.Title>

        <Form.Item label="Логин">
          <Input
            placeholder="Введите логин ..."
            value={career_school_username}
            onChange={handleChangeCareerSchoolUsername}
          />
        </Form.Item>
        <Form.Item label="Пароль">
          <Input
            placeholder="Введите пароль ..."
            value={career_school_password}
            onChange={handleChangeCareerSchoolPassword}
          />
        </Form.Item>
        <Form.Item label="Прогресс">
          <Input
            placeholder="Введите число от 0 до 100"
            value={career_school_progress || ""}
            onChange={handleChangeCareerSchoolProgress}
          />
        </Form.Item>

        <Typography.Title level={5}>Тестирование</Typography.Title>
        <Form.Item label="Логин">
          <Input
            placeholder="Введите логин ..."
            value={testing_platform_username}
            onChange={handleChangeTestingPlatformUsername}
          />
        </Form.Item>
        <Form.Item label="Пароль">
          <Input
            placeholder="Введите пароль ..."
            value={testing_platform_password}
            onChange={handleChangeTestingPlatformPassoword}
          />
        </Form.Item>
        <Form.Item label="Оценка тестирования">
          <Input
            placeholder="Введите оценку ..."
            value={test_score || ""}
            onChange={handleChangeTestScore}
          />
        </Form.Item>
        <Typography.Title level={5}>Оценка резюме</Typography.Title>
        <Form.Item>
          <Input
            placeholder="Введите оценку ..."
            value={cv_score || ""}
            onChange={handleChangeCVScore}
          />
        </Form.Item>
        <Form.Item>
          <Radio.Group onChange={handleChangeTestPassed} value={test_passed}>
            <Radio value={undefined}>Не проверен</Radio>
            <Radio value={false}>Не сдан</Radio>
            <Radio value={true}>Сдан</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            loading={isUpdatingProfile}
            onClick={handlePressSave}
          >
            Сохранить
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};
