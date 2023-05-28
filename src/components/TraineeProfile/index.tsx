import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  useGetTraineeProfileByIdQuery,
  useUpdateTraineeProfileByIdMutation,
} from "../../store/traineeProfile";
import { useAppSelector } from "../../store";
import { selectAuthUser, selectUserId } from "../../store/auth/selectors";
import { LoadingOutlined } from "@ant-design/icons";
import { App, Button, Col, Modal, Row, Space, Spin, Typography } from "antd";
import { TraineeProfileView } from "./Profile";
import { ProfileEdit } from "./ProfileEdit";

import { validate } from "./utils";
import { IPatchTraineeProfile } from "@/types/TraineeProfile";
import { CustomButton } from "../Button";
import { UserRoleLabel } from "@/types/User";

const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;

export const TraineeProfile = () => {
  const [params] = useSearchParams();
  const userId = useAppSelector(selectUserId) || 0;
  const user = useAppSelector(selectAuthUser);
  const { data, isLoading } = useGetTraineeProfileByIdQuery(userId);
  const [updateData] = useUpdateTraineeProfileByIdMutation();
  const [isEditing, setIsEditing] = useState(!!params.get("edit"));
  const [showModal, setShowModal] = useState(!!params.get("show_modal"));
  const [editingObj, setEditingObj] = useState<IPatchTraineeProfile>({} as any);
  const { notification } = App.useApp();
  const handleChange = useCallback((data: IPatchTraineeProfile) => {
    setEditingObj(data);
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = () => {
    const res = validate(editingObj);
    if (typeof res === "string") {
      notification.error({ message: res, duration: 3 });
      return;
    }
    updateData({ id: userId, data: editingObj });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleClose = () => {
    setShowModal(false)
    params.delete('show_modal')
  }

  useEffect(() => {
    setEditingObj({ ...data, citizenship: data?.citizenship?.id });
  }, [data]);

  if (isLoading || !data) {
    return (
      <Row justify={"center"} align={"middle"} style={{ height: "100%" }}>
        <Col>
          <Spin indicator={antIcon} />
        </Col>
      </Row>
    );
  }

  return (
    <>
      <Row justify={"space-between"}>
        <Col>
          <Space align="center" size={"large"}>
            <Typography.Text
              style={{ fontSize: "28px", lineHeight: "38px", color: "#1A1230" }}
            >
              {data.first_name}&nbsp;{data.last_name}
            </Typography.Text>
            <div
              style={{
                padding: "8px 24px",
                color: "#1A1230",
                backgroundColor: "#E6F7FF",
                borderRadius: "50px",
                fontSize: "18px",
                lineHeight: "24px",
              }}
            >
              {UserRoleLabel[user?.role || "T"]}
            </div>
          </Space>
        </Col>
        <Col>
          {!isEditing ? (
            <CustomButton style={{ marginTop: "8px" }} onClick={handleEdit}>
              Редактировать
            </CustomButton>
          ) : (
            <Space>
              <CustomButton
                isPrimary
                style={{ marginTop: "8px" }}
                onClick={handleUpdate}
              >
                Сохранить
              </CustomButton>
              <CustomButton style={{ marginTop: "8px" }} onClick={handleCancel}>
                Отменить
              </CustomButton>
            </Space>
          )}
        </Col>
      </Row>

      {isEditing ? (
        <>
          <ProfileEdit {...data} onChange={handleChange} />
        </>
      ) : (
        <>
          <TraineeProfileView {...data} />
        </>
      )}

      <Modal
        open={showModal}
        onCancel={handleClose}
        footer={false}
        width={"600px"}
      >
        <div
          style={{
            padding: "28px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <div style={{ fontSize: 36, lineHeight: "40px", color: "#1A1230" }}>
            Начало положено
          </div>
          <div
            style={{
              fontSize: 24,
              lineHeight: "32px",
              color: "#1A1230",
              textAlign: "center",
            }}
          >
            Перед тем как откликнуться на вакансию, заполните профиль. От
            тщательности заполнения зависит, пройдёте ли вы на следуюзий этап
            отбора на стажировку
          </div>

          <CustomButton
            isPrimary
            style={{ width: "100%", marginTop: "28px" }}
            onClick={handleClose}
          >
            Заполнить профиль
          </CustomButton>
        </div>
      </Modal>
    </>
  );
};
