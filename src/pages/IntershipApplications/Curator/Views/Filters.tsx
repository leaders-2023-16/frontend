import React from "react";
import { Form, Row, Segmented, Select } from "antd";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/store";
import { getCuratorInternshipApplicationsPageState } from "../Store/selectors";
import { curatorInternshipApplicationPageActions } from "../Store";
import { SegmentedValue } from "antd/es/segmented";
import { IntershipApplicationStatus } from "@/types/IntershipApplication";

export const Filters = () => {
  const dispatch = useDispatch();
  const { onlyRecommended, selectedStatus } = useAppSelector(
    getCuratorInternshipApplicationsPageState
  );

  const handleChangeOnlyRecommended = React.useCallback(
    (value: SegmentedValue) => {
      if (value === "all") {
        dispatch(
          curatorInternshipApplicationPageActions.setOnlyRecommended(false)
        );
      } else {
        dispatch(
          curatorInternshipApplicationPageActions.setOnlyRecommended(true)
        );
      }
    },
    [dispatch]
  );

  const handleChangeOnlyWithoutAction = React.useCallback(
    (value: any) => {
      if (value === "all") {
        dispatch(
          curatorInternshipApplicationPageActions.setSelectedStatus(undefined)
        );
        return;
      }

      dispatch(
        curatorInternshipApplicationPageActions.setSelectedStatus(value)
      );
    },
    [dispatch]
  );

  return (
    <Form layout="vertical">
      <Row>
        <Form.Item label="По рекомендации" style={{ marginRight: "10px" }}>
          <Segmented
            value={onlyRecommended ? "only-recommended" : "all"}
            onChange={handleChangeOnlyRecommended}
            options={[
              { value: "all", label: "Все" },
              { value: "only-recommended", label: "Только рекомендованные" },
            ]}
          />
        </Form.Item>

        <Form.Item label="По статусу" style={{ marginRight: "10px" }}>
          <Select
            style={{ width: "200px" }}
            value={selectedStatus || "all"}
            onChange={handleChangeOnlyWithoutAction}
            options={[
              { value: "all", label: "Все" },
              {
                value: IntershipApplicationStatus.PENDING,
                label: "Не отвеченные",
              },
              {
                value: IntershipApplicationStatus.REJECTED,
                label: "Отклоненные",
              },
              {
                value: IntershipApplicationStatus.NEXT_STAGE,
                label: "Проходят отбор",
              },
              {
                value: IntershipApplicationStatus.NOT_QUALIFY,
                label: "Не прошли отбор",
              },
              {
                value: IntershipApplicationStatus.APPROVED,
                label: "Прошли на стажировку",
              },
            ]}
          />
        </Form.Item>
      </Row>
    </Form>
  );
};
