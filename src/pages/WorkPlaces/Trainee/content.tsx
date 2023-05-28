import React from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { useCurrentWorkPlaceQuery } from "@/store/workPlace/api";
import {
  App,
  Button,
  Calendar,
  Col,
  Empty,
  Radio,
  RadioChangeEvent,
  Space,
  Spin,
  Typography,
} from "antd";
import dayjs from "dayjs";
import { getTraineeWorkPlacesPageState } from "./Store/selectors";
import { traineeWorkPlacesPageActions } from "./Store";
import {
  useGetReportsQuery,
  useSubmitReportMutation,
  useUpdateReportMutation,
} from "@/store/reports/api";
import { ReportStatus } from "@/types/Report";
import { LastWorkPlaces } from "./Views/LastWorkPlaces";

export const Content = () => {
  const { notification } = App.useApp();
  const { data, isLoading } = useCurrentWorkPlaceQuery();

  const dispatch = useAppDispatch();
  const [create, { isLoading: isCreatingReport }] = useSubmitReportMutation();

  const { selectedDate, visibleDate, selectedDateStatus } = useAppSelector(
    getTraineeWorkPlacesPageState
  );
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
        traineeWorkPlacesPageActions.setSelectedDate(day.format("YYYY-MM-DD"))
      );
    },
    [dispatch]
  );

  const handleChange = React.useCallback(
    (day: dayjs.Dayjs) => {
      dispatch(
        traineeWorkPlacesPageActions.setVisibleDate(day.format("YYYY-MM-DD"))
      );
    },
    [dispatch]
  );

  const handleChangeStatus = React.useCallback(
    (day: RadioChangeEvent) => {
      dispatch(
        traineeWorkPlacesPageActions.setSelectedDateStatus(day.target.value)
      );
    },
    [dispatch]
  );

  const currentDayReport = reports?.find(
    (report) => report.date === selectedDate
  );

  const handlePressSave = async () => {
    if (!data || !selectedDate) {
      return;
    }

    if (currentDayReport) {
      return;
    }

    try {
      await create({
        date: selectedDate,
        status: selectedDateStatus,
        work_place: data.id,
        is_approved: false,
      }).unwrap();
    } catch (e) {
      notification.open({
        type: "error",
        message: "Ошибка выполнения запроса",
        description: "Попробуйте еще раз, или повторите позже",
      });
    }
  };

  React.useEffect(() => {
    dispatch(
      traineeWorkPlacesPageActions.setSelectedDateStatus(
        currentDayReport?.status
      )
    );
  }, [dispatch, currentDayReport]);

  const dateCellRender = (value: dayjs.Dayjs) => {
    const currentDayReport = reports?.find(
      (report) => report.date === value.format("YYYY-MM-DD")
    );

    return (
      <Typography.Title level={1}>
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

  if (!isLoading && !data?.is_active) {
    return <LastWorkPlaces />;
  }

  return (
    <Spin spinning={isLoading}>
      <Col>
        <Typography.Text>Текущая стажировка</Typography.Text>
        <Typography.Title level={2}>{data?.name}</Typography.Title>
        <Typography.Title level={5}>{data?.department.name}</Typography.Title>
      </Col>

      <Calendar
        mode="month"
        value={dayjs(selectedDate)}
        onSelect={handleSelect}
        onChange={handleChange}
        cellRender={cellRender}
      />

      <Typography.Title level={5}>{`Табель на ${dayjs(selectedDate).format(
        "DD-MM-YYYY"
      )}`}</Typography.Title>
      <Spin spinning={isLoadingReports}>
        <Col style={{ marginBottom: "20px" }}>
          <Radio.Group
            value={currentDayReport?.status || selectedDateStatus}
            onChange={handleChangeStatus}
          >
            <Space direction="vertical">
              <Radio value={ReportStatus.ATTENDED}>Присутствую</Radio>
              <Radio value={ReportStatus.SICK_DAY}>Больничный</Radio>
              <Radio value={ReportStatus.STUDY_VACATION}>Учебный отпуск</Radio>
              <Radio value={ReportStatus.VACATION}>Отпуск</Radio>
            </Space>
          </Radio.Group>
        </Col>
      </Spin>
      {!currentDayReport && (
        <Button
          type="primary"
          onClick={handlePressSave}
          loading={isCreatingReport}
        >
          Сохранить
        </Button>
      )}
    </Spin>
  );
};

export function getCharByStatus(status: ReportStatus) {
  if (status === ReportStatus.ATTENDED) return "A";
  if (status === ReportStatus.SICK_DAY) return "S";
  if (status === ReportStatus.STUDY_VACATION) return "SV";
  if (status === ReportStatus.VACATION) return "V";
}
