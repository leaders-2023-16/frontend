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
  Radio,
  RadioChangeEvent,
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

export const Content = () => {
  const { notification } = App.useApp();
  const { workPlaceId } = useParams();

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
      <Typography.Text>
        {data?.trainee.first_name} {data?.trainee.first_name}
      </Typography.Text>

      <Calendar
        mode="month"
        value={dayjs(selectedDate)}
        onSelect={handleSelect}
        onChange={handleChange}
        cellRender={cellRender}
      />

      <Typography.Title level={5}>
        {`Табель на ${dayjs(selectedDate).format("DD-MM-YYYY")}`}(Подтвержден:{" "}
        {currentDayReport?.is_approved ? "Да" : "Нет"})
      </Typography.Title>
      <Spin spinning={isLoadingReports}>
        <Col style={{ marginBottom: "20px" }}>
          <Radio.Group value={selectedDateStatus} onChange={handleChangeStatus}>
            <Space direction="vertical">
              <Radio value={ReportStatus.ATTENDED}>Присутствую</Radio>
              <Radio value={ReportStatus.SICK_DAY}>Больничный</Radio>
              <Radio value={ReportStatus.STUDY_VACATION}>Учебный отпуск</Radio>
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
    </Spin>
  );
};
