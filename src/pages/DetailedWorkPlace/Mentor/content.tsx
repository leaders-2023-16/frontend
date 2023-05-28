import React from "react";

import { useAppDispatch, useAppSelector } from "@/store";
import {
  useGetReportsQuery,
  useUpdateReportMutation,
} from "@/store/reports/api";
import { useGetWorkPlaceByIdQuery } from "@/store/workPlace/api";
import {
  App,
  Button,
  Calendar,
  Col,
  Divider,
  Form,
  Input,
  Radio,
  RadioChangeEvent,
  Rate,
  Space,
  Spin,
  Typography,
} from "antd";
import { Navigate, useParams } from "react-router-dom";
import { getMentorDetailedWorkPlacePageState } from "./Store/selectors";
import dayjs from "dayjs";
import { mentorDetailedWorkPlacePageActions } from "./Store";
import { getCharByStatus } from "@/pages/WorkPlaces/Trainee/content";
import { ReportStatus } from "@/types/Report";
import {
  useGetFeedbacksQuery,
  usePostFeedbackMutation,
} from "@/store/feedbacks/api";
import { selectAuthUser } from "@/store/auth/selectors";
import { User } from "@/components/User";

export const Content = () => {
  const { notification } = App.useApp();
  const { workPlaceId } = useParams();

  const user = useAppSelector(selectAuthUser);

  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetWorkPlaceByIdQuery(
    parseInt(workPlaceId || ""),
    {
      skip: !workPlaceId,
    }
  );

  const { selectedDate, visibleDate, selectedDateStatus } = useAppSelector(
    getMentorDetailedWorkPlacePageState
  );

  const [mutate, { isLoading: isUpdatingReport }] = useUpdateReportMutation();
  const { data: reports, isLoading: isLoadingReports } = useGetReportsQuery(
    {
      work_place: data?.id || 0,
      date_from: dayjs(visibleDate).startOf("month").format("YYYY-MM-DD"),
      date_to: dayjs(visibleDate)
        .add(1, "month")
        .startOf("month")
        .format("YYYY-MM-DD"),
    },
    { skip: !data?.id }
  );

  const [postFeedback, { isLoading: isPostingFeedback }] =
    usePostFeedbackMutation();
  const { data: feedbacks, isLoading: isLoadingFeedbacks } =
    useGetFeedbacksQuery(
      { to_user: data?.trainee.id, from_user: user?.id },
      { skip: !data || !user }
    );

  const [value, setValue] = React.useState(5);
  const [text, setText] = React.useState("");

  const handlePressSaveFeedback = async () => {
    if (!data) {
      return;
    }

    try {
      await postFeedback({
        to_user: data.trainee.id,
        rating: value,
        text,
      }).unwrap();
    } catch (e) {
      notification.open({
        type: "error",
        message: "Ошибка выполнения запроса",
        description: "Попробуйте еще раз, или повторите позже",
      });
    }
  };

  const handleSelect = React.useCallback(
    (day: dayjs.Dayjs) => {
      dispatch(
        mentorDetailedWorkPlacePageActions.setSelectedDate(
          day.format("YYYY-MM-DD")
        )
      );
    },
    [dispatch]
  );

  const handleChange = React.useCallback(
    (day: dayjs.Dayjs) => {
      dispatch(
        mentorDetailedWorkPlacePageActions.setVisibleDate(
          day.format("YYYY-MM-DD")
        )
      );
    },
    [dispatch]
  );

  const handleChangeStatus = React.useCallback(
    (day: RadioChangeEvent) => {
      dispatch(
        mentorDetailedWorkPlacePageActions.setSelectedDateStatus(
          day.target.value
        )
      );
    },
    [dispatch]
  );

  const currentDayReport = reports?.find(
    (report) => report.date === selectedDate
  );

  React.useEffect(() => {
    dispatch(
      mentorDetailedWorkPlacePageActions.setSelectedDateStatus(
        currentDayReport?.status
      )
    );
  }, [dispatch, currentDayReport]);

  const dateCellRender = (value: dayjs.Dayjs) => {
    const currentDayReport = reports?.find(
      (report) => report.date === value.format("YYYY-MM-DD")
    );

    return (
      <Typography.Title
        level={1}
        style={{
          color: !currentDayReport?.is_approved ? "#ff000050" : "#000000",
        }}
      >
        {!currentDayReport?.status
          ? ""
          : getCharByStatus(currentDayReport.status)}
      </Typography.Title>
    );
  };

  const cellRender = (current: dayjs.Dayjs, info: any) => {
    if (info.type === "date") return dateCellRender(current);
    return info.originNode;
  };

  const handlePressSave = async () => {
    if (!currentDayReport) {
      return;
    }

    try {
      await mutate({
        id: currentDayReport.id,
        status: selectedDateStatus,
        is_approved: true,
      }).unwrap();
    } catch (e) {
      notification.open({
        type: "error",
        message: "Ошибка выполнения запроса",
        description: "Попробуйте еще раз, или повторите позже",
      });
    }
  };

  if (!isLoading && !data) {
    return <Navigate to="/" />;
  }

  return (
    <Spin spinning={isLoading}>
      <Typography.Text>
        Активная: {data?.is_active ? "Да" : "Нет"}
      </Typography.Text>
      <Typography.Title level={2}>{data?.name}</Typography.Title>
      <Typography.Title level={5}>{data?.department.name}</Typography.Title>
      <Divider />
      <Typography.Title level={5}>Стажер</Typography.Title>
      {data ? <User user={data?.trainee} /> : "-"}

      {data?.is_active ? (
        <>
          <Calendar
            mode="month"
            onSelect={handleSelect}
            onChange={handleChange}
            cellRender={cellRender}
          />
          <Typography.Title level={5}>
            {`Табель на ${dayjs(selectedDate).format("DD-MM-YYYY")}`}
            (Подтвержден: {currentDayReport?.is_approved ? "Да" : "Нет"})
          </Typography.Title>
          <Spin spinning={isLoadingReports}>
            <Col style={{ marginBottom: "20px" }}>
              <Radio.Group
                value={selectedDateStatus}
                onChange={handleChangeStatus}
              >
                <Space direction="vertical">
                  <Radio value={ReportStatus.ATTENDED}>Присутствую</Radio>
                  <Radio value={ReportStatus.SICK_DAY}>Больничный</Radio>
                  <Radio value={ReportStatus.STUDY_VACATION}>
                    Учебный отпуск
                  </Radio>
                  <Radio value={ReportStatus.VACATION}>Отпуск</Radio>
                </Space>
              </Radio.Group>
            </Col>
            <Button
              type="primary"
              onClick={handlePressSave}
              loading={isUpdatingReport}
            >
              Подтвердить
            </Button>
          </Spin>
        </>
      ) : (
        <>
          <Divider />
          <Spin spinning={isLoadingFeedbacks}>
            <Typography.Title level={5}>Оценка наставника</Typography.Title>
            <Form layout="vertical">
              <Form.Item label="Рейтинг">
                <Rate
                  onChange={setValue}
                  value={feedbacks?.[0]?.rating || value}
                  disabled={(feedbacks || []).length > 0}
                />
              </Form.Item>
              <Form.Item label="Отзыв">
                <Input.TextArea
                  value={feedbacks?.[0]?.text || text}
                  onChange={(e) => setText(e.target.value)}
                  disabled={(feedbacks || []).length > 0}
                  rows={5}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  onClick={handlePressSaveFeedback}
                  loading={isPostingFeedback}
                  disabled={(feedbacks || []).length > 0}
                >
                  Сохранить
                </Button>
              </Form.Item>
            </Form>
          </Spin>
        </>
      )}
    </Spin>
  );
};
