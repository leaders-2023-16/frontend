import React from "react";
import { Form, Row, Segmented, Select } from "antd";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/store";
import { getCuratorInternshipApplicationsPageState } from "../Store/selectors";
import { curatorInternshipApplicationPageActions } from "../Store";
import { SegmentedValue } from "antd/es/segmented";

export const Filters = () => {
  const dispatch = useDispatch();
  const { onlyRecommended, onlyWithoutAction } = useAppSelector(
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
    (value: string) => {
      if (value === "all") {
        dispatch(
          curatorInternshipApplicationPageActions.setOnlyWithoutAction(false)
        );
      } else {
        dispatch(
          curatorInternshipApplicationPageActions.setOnlyWithoutAction(true)
        );
      }
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
            style={{ width: "150px" }}
            value={onlyWithoutAction ? "only-without-action" : "all"}
            onChange={handleChangeOnlyWithoutAction}
            options={[
              { value: "all", label: "Все" },
              { value: "only-without-action", label: "Не отвеченные" },
            ]}
          />
        </Form.Item>
      </Row>
    </Form>
  );
};
