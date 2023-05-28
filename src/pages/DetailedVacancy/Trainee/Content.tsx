import React from "react";

import { useGetVacancyByIdQuery } from "@/store/vacancies/api";
import { Button, Col, Divider, Row, Spin, Typography } from "antd";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { traineeDetailedVacancyPageActions } from "./Store";
import { useGetVacancyResponseByVacancyIdQuery } from "@/store/vacancyResponse/api";
import { ResponseForm } from "./Views/ResponseForm";
import { User } from "@/components/User";

export const Content = () => {
  const { vacancyId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetVacancyByIdQuery(
    parseInt(vacancyId || ""),
    {
      skip: !vacancyId,
    }
  );

  const { data: vacancyResponse } = useGetVacancyResponseByVacancyIdQuery(
    parseInt(vacancyId || ""),
    {
      skip: !vacancyId,
    }
  );

  React.useEffect(() => {
    return () => {
      dispatch(traineeDetailedVacancyPageActions.reset());
    };
  }, [dispatch]);

  const handlePressGoToResponse = React.useCallback(() => {
    if (!vacancyResponse) {
      return;
    }

    navigate(`/vacancy-responses/${vacancyResponse.id}`);
  }, [vacancyResponse, navigate]);

  if (isError) {
    return <Navigate to="/vacancies" />;
  }

  return (
    <Spin spinning={isLoading}>
      <Col>
        <Typography.Text>Статус: {data ? data.status : "-"}</Typography.Text>
        <Typography.Title level={2}>{data?.name}</Typography.Title>
        <Typography.Text>{data ? data.direction.name : "-"}</Typography.Text>

        <Typography.Title level={4}>Описание вакансии</Typography.Title>
        <Typography.Text>{data?.description || "-"}</Typography.Text>

        <Typography.Title level={4}>Необходимые скилы</Typography.Title>
        <Row>
          {(data?.required_qualifications || []).map((skill, indx) => (
            <React.Fragment key={skill.id}>
              {indx !== 0 && <Col style={{ width: "10px" }} />}
              <Col
                style={{
                  backgroundColor: "#777777",
                  padding: "5px 20px",
                  borderRadius: "100px",
                }}
              >
                <Typography.Text style={{ color: "white" }}>
                  {skill.name}
                </Typography.Text>
              </Col>
            </React.Fragment>
          ))}
        </Row>

        <Typography.Title level={4}>Наставник</Typography.Title>
        {data?.mentor ? (
          <User user={data.mentor} />
        ) : (
          <Typography.Text>-</Typography.Text>
        )}

        <Typography.Title level={4}>Тестовое задание</Typography.Title>
        <Typography.Title level={5}>{data?.test_task?.title}</Typography.Title>
        <Typography.Text>{data?.test_task?.description}</Typography.Text>

        <Divider />

        {vacancyResponse ? (
          <Button onClick={handlePressGoToResponse}>Перейти к отклику</Button>
        ) : data ? (
          <ResponseForm vacancy={data} />
        ) : null}
      </Col>
    </Spin>
  );
};
