import React from "react";

import { useGetVacancyByIdQuery } from "@/store/vacancies/api";
import { Col, Row, Spin, Typography } from "antd";
import { Navigate, useParams } from "react-router-dom";
import { useAppSelector } from "@/store";
import { useDispatch } from "react-redux";
import { getPersonnelDetailedVacancyStore } from "./Store/selectors";
import { personnelDetailedVacancyPageActions } from "./Store";
import { EditForm } from "./Views/EditForm";
import { Actions } from "./Views/Actions";

export const Content = () => {
  const { vacancyId } = useParams();
  const { isEditing } = useAppSelector(getPersonnelDetailedVacancyStore);

  const dispatch = useDispatch();

  const { data, isLoading, isError } = useGetVacancyByIdQuery(
    parseInt(vacancyId || ""),
    {
      skip: !vacancyId,
    }
  );

  React.useEffect(() => {
    return () => {
      dispatch(personnelDetailedVacancyPageActions.reset());
    };
  }, [dispatch]);

  if (isError) {
    return <Navigate to="/vacancies" />;
  }

  if (isEditing && data) {
    return <EditForm vacancy={data} />;
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
          <Row>
            <Col flex={1}>
              <Typography.Text>
                {data?.mentor?.first_name} {data?.mentor?.last_name}
              </Typography.Text>
            </Col>
            <Col>
              <Typography.Text>{data?.mentor?.email}</Typography.Text>
            </Col>
          </Row>
        ) : (
          <Typography.Text>-</Typography.Text>
        )}

        <Typography.Title level={4}>Тестовое задание</Typography.Title>
        <Typography.Title level={5}>{data?.test_task?.title}</Typography.Title>
        <Typography.Text>{data?.test_task?.description}</Typography.Text>

        {data && <Actions vacancy={data} />}
      </Col>
    </Spin>
  );
};
