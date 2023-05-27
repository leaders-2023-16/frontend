import React from "react";
import { Form, Row, Segmented, Select } from "antd";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/store";
import { getCuratorInternshipApplicationsPageState } from "../Store/selectors";
import { curatorInternshipApplicationPageActions } from "../Store";
import { SegmentedValue } from "antd/es/segmented";

export const Filters = () => {
  const dispatch = useDispatch();
  const { onlyRecommended } = useAppSelector(
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

  return (
    <Form>
      <Row>
        <Form.Item style={{ marginRight: "10px" }}>
          <Segmented
            value={onlyRecommended ? "only-recommended" : "all"}
            onChange={handleChangeOnlyRecommended}
            options={[
              { value: "all", label: "Все" },
              { value: "only-recommended", label: "Только рекомендованные" },
            ]}
          />
        </Form.Item>
      </Row>
    </Form>
  );
};
