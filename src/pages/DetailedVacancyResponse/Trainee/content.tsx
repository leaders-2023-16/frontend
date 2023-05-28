import React from "react";

import { Col, Divider, Row, Spin, Typography } from "antd";
import { Navigate, useParams } from "react-router-dom";
import { useGetVacancyResponseByIdQuery } from "@/store/vacancyResponse/api";
import { Actions } from "./Views/Actions";

export const Content = () => {
  const { vacancyResponseId } = useParams();

  const { data, isLoading, isError } = useGetVacancyResponseByIdQuery(
    parseInt(vacancyResponseId || ""),
    {
      skip: !vacancyResponseId,
    }
  );

  if (isError) {
    return <Navigate to="/vacancy-responses" />;
  }

  const vacancy = data?.vacancy;

  return (
    <Spin spinning={isLoading}>
      <Col>
        <Col>
          <Typography.Text>
            Cтатус:{" "}
            {typeof data?.approved_by_mentor === "boolean"
              ? data.approved_by_mentor
                ? "Приглашен"
                : "Отлонен"
              : "На рассмотрении"}
          </Typography.Text>
        </Col>
        <Typography.Title level={2}>{vacancy?.name}</Typography.Title>
        <Typography.Text>
          {vacancy ? vacancy.direction.name : "-"}
        </Typography.Text>

        <Typography.Title level={4}>Описание вакансии</Typography.Title>
        <Typography.Text>{vacancy?.description || "-"}</Typography.Text>

        <Typography.Title level={4}>Необходимые скилы</Typography.Title>
        <Row>
          {(vacancy?.required_qualifications || []).map((skill, indx) => (
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
        {vacancy?.mentor ? (
          <Row>
            <Col flex={1}>
              <Typography.Text>
                {vacancy?.mentor?.first_name} {vacancy?.mentor?.last_name}
              </Typography.Text>
            </Col>
            <Col>
              <Typography.Text>{vacancy?.mentor?.email}</Typography.Text>
            </Col>
          </Row>
        ) : (
          <Typography.Text>-</Typography.Text>
        )}

        <Typography.Title level={4}>Тестовое задание</Typography.Title>
        <Typography.Title level={5}>
          {vacancy?.test_task?.title}
        </Typography.Title>
        <Typography.Text>{vacancy?.test_task?.description}</Typography.Text>

        <Divider />

        <Typography.Title level={4}>Отклик</Typography.Title>
        <Typography.Title level={5}>Сопроводительное письмо</Typography.Title>
        <Typography.Text>{data?.covering_letter || "-"}</Typography.Text>
        <Typography.Title level={5}>Решение</Typography.Title>
        <Typography.Text>{data?.text_answer || "-"}</Typography.Text>

        {data && <Actions vacancyResponse={data} />}
      </Col>
    </Spin>
  );
};
