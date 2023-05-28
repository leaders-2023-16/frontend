import React from "react";
import { useAppSelector } from "@/store";
import { Col, Form, Row, Select } from "antd";
import { getCuratorWorkPlacesPageState } from "../Store/selectors";
import { useDispatch } from "react-redux";
import { curatorWorkPlacesPageActions } from "../Store";

export const Filters = () => {
  const dispatch = useDispatch();
  const { onlyActive } = useAppSelector(getCuratorWorkPlacesPageState);

  const handleChangeOnlyActive = React.useCallback(
    (value: string) => {
      dispatch(
        curatorWorkPlacesPageActions.setOnlyActive(value === "only-active")
      );
    },
    [dispatch]
  );
  return (
    <Col>
      <Form layout="vertical">
        <Row>
          <Form.Item label="Статус">
            <Select
              style={{ width: "200px" }}
              value={onlyActive ? "only-active" : "all"}
              onChange={handleChangeOnlyActive}
              options={[
                { value: "all", label: "Все" },
                { value: "only-active", label: "Только активные" },
              ]}
            />
          </Form.Item>
        </Row>
      </Form>
    </Col>
  );
};
