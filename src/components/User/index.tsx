import React from "react";
import { useGetFeedbacksQuery } from "@/store/feedbacks/api";
import { IUser, UserRole } from "@/types/User";
import {
  Avatar,
  Button,
  Col,
  Divider,
  Rate,
  Row,
  Spin,
  Tooltip,
  Typography,
} from "antd";
import { useNavigate } from "react-router-dom";

interface UserProps {
  user: IUser;
}
export const User: React.FC<UserProps> = ({ user }) => {
  const { data, isLoading } = useGetFeedbacksQuery({ to_user: user.id });
  const navigate = useNavigate();

  const rating =
    (data || [])
      ?.map((item) => item.rating)
      .reduce((acc, item) => acc + item, 0) / (data?.length || 1);

  const handlePressGoToProfile = React.useCallback(() => {
    navigate(`/trainee-profile/${user.id}`);
  }, [navigate, user]);

  return (
    <Spin spinning={isLoading}>
      <Row>
        <Avatar size="large" />
        <Col style={{ width: "20px" }} />
        <Col flex={1}>
          <Col>
            <Typography.Text>
              {user?.first_name} {user?.last_name}
            </Typography.Text>
          </Col>
          <Typography.Text>Рейтинг: {rating.toFixed(2)}</Typography.Text>
        </Col>
        <Col>
          <Col>
            <Tooltip
              title={() => (
                <Col>
                  {data?.map((item, indx) => (
                    <>
                      {indx !== 0 && (
                        <Col
                          style={{
                            marginTop: "5px",
                            marginBottom: "5px",
                            height: "1px",
                            backgroundColor: "#C4C4C4",
                          }}
                        />
                      )}
                      <Col>
                        <Col>
                          <Typography.Text>
                            {item.from_user.first_name}{" "}
                            {item.from_user.last_name}
                          </Typography.Text>
                        </Col>
                        <Rate value={item.rating} />
                      </Col>
                      <Typography.Text>{item.text}</Typography.Text>
                    </>
                  ))}
                </Col>
              )}
              color="white"
            >
              <Button size="small" style={{ width: "100px" }}>
                Отзывы
              </Button>
            </Tooltip>
          </Col>
          {user.role === UserRole.TRAINEE ||
          user.role === UserRole.CANDIDATE ? (
            <>
              <Col style={{}} />
              <Button
                size="small"
                style={{ width: "100px" }}
                type="primary"
                onClick={handlePressGoToProfile}
              >
                В профиль
              </Button>
            </>
          ) : null}
        </Col>
      </Row>
    </Spin>
  );
};
