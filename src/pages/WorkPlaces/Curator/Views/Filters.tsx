import React from "react";
import { useAppSelector } from "@/store";
import { App, Button, Col, Form, Row, Select } from "antd";
import { getCuratorWorkPlacesPageState } from "../Store/selectors";
import { useDispatch } from "react-redux";
import { curatorWorkPlacesPageActions } from "../Store";
import { useExportReportMutation } from "@/store/reports/api";

export const Filters = () => {
  const { notification } = App.useApp();

  const dispatch = useDispatch();
  const { onlyActive } = useAppSelector(getCuratorWorkPlacesPageState);

  const [mutate, { isLoading }] = useExportReportMutation();

  const handlePressExport = React.useCallback(async () => {
    try {
      await mutate({}).unwrap();
    } catch (e) {
      notification.open({
        type: "error",
        message: "Ошибка выполнения запроса",
        description: "Попробуйте еще раз, или повторите позже",
      });
    }
  }, [notification, mutate]);

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
          <Col flex={1}>
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
          </Col>
          <Form.Item>
            <Button
              type="primary"
              onClick={handlePressExport}
              loading={isLoading}
            >
              Выгрузить табель
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </Col>
  );
};
