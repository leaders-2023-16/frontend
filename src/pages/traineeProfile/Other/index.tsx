import { useCallback, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import {
  App,
  Button,
  Calendar,
  Col,
  Modal,
  Row,
  Space,
  Spin,
  Typography,
} from "antd";

import { IPatchTraineeProfile } from "@/types/TraineeProfile";
import { UserRole, UserRoleLabel } from "@/types/User";
import { useAppSelector } from "@/store";
import { selectAuthUser } from "@/store/auth/selectors";
import { useGetTraineeProfileByIdQuery } from "@/store/traineeProfile";
import { TraineeProfileView } from "@/components/TraineeProfile/Profile";

const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;

export const OtherTraineeProfile = () => {
  const { userId } = useParams();

  const [params] = useSearchParams();
  const user = useAppSelector(selectAuthUser);

  const { data, isLoading } = useGetTraineeProfileByIdQuery(
    parseInt(userId || "")
  );

  return (
    <Spin spinning={isLoading}>
      <Typography style={{ fontSize: "36px", color: "#1A1230" }}>
        Профиль
      </Typography>
      <Row
        gutter={[24, 24]}
        wrap
        justify={"center"}
        style={{ marginTop: "18px" }}
      >
        <Col flex={"0 0 250px"}>
          <div
            style={{
              width: "250px",
              height: "250px",
              border: "1px solid #F5F5F5",
              background: "#F5F5F5",
              borderRadius: "20px",
            }}
          ></div>
        </Col>
        <Col flex={"1 1 250px"}>
          <Row justify={"space-between"}>
            <Col>
              <Space align="center" size={"large"}>
                <Typography.Text
                  style={{
                    fontSize: "28px",
                    lineHeight: "38px",
                    color: "#1A1230",
                  }}
                >
                  {data?.first_name}&nbsp;{data?.last_name}
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
          </Row>

          {data && <TraineeProfileView {...data} />}
        </Col>
      </Row>
    </Spin>
  );
};
