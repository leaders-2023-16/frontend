import React from "react";
import { useUpdateIntershipApplicationMutation } from "@/store/intershipApplications/api";
import { Button, Col, Row } from "antd";
import { IntershipApplicationStatus } from "@/types/IntershipApplication";

interface ActionsProps {
  applicationId: number;
  status: IntershipApplicationStatus;
}
export const Actions: React.FC<ActionsProps> = ({ applicationId, status }) => {
  const [isEdit, setIsEdit] = React.useState(false);
  const [mutate, { isLoading }] = useUpdateIntershipApplicationMutation();

  React.useEffect(() => {
    setIsEdit(false);
  }, [status]);

  const handlePressAccept = React.useCallback(() => {
    mutate({
      status: IntershipApplicationStatus.APPROVED,
      applicantId: applicationId,
    });
  }, [mutate, applicationId]);

  const handlePressReject = React.useCallback(() => {
    mutate({
      status: IntershipApplicationStatus.REJECTED,
      applicantId: applicationId,
    });
  }, [mutate, applicationId]);

  if (
    (status === IntershipApplicationStatus.APPROVED ||
      status === IntershipApplicationStatus.REJECTED) &&
    !isEdit
  ) {
    return (
      <Row>
        <Col flex={1} />
        <Col>
          <Button onClick={() => setIsEdit(true)}>Изменить решение</Button>
        </Col>
      </Row>
    );
  }

  return (
    <Col>
      <Row>
        <Col flex={1} />
        <Button loading={isLoading} onClick={handlePressReject}>
          Отклонить
        </Button>
        <Col style={{ width: "20px" }} />
        <Button type="primary" loading={isLoading} onClick={handlePressAccept}>
          Принять
        </Button>
      </Row>
    </Col>
  );
};
