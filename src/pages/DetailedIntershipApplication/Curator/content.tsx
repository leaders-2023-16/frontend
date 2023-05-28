import React from "react";
import { useGetCountryByIdQuery } from "@/store/dictionary";
import { useGetIntershipApplicationQuery } from "@/store/intershipApplications/api";
import { useGetTraineeProfileByIdQuery } from "@/store/traineeProfile";
import { Col, Divider, Row, Spin, Tag } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import { useParams } from "react-router-dom";
import { EducationView } from "./Views/EducationView";
import { WorkExperienceView } from "./Views/WorkExperienceView";
import { Actions } from "./Views/Actions";
<<<<<<< HEAD
import { IntershipApplicationLabel, IntershipApplicationStatus } from "@/types/IntershipApplication";
=======
import {
  IntershipApplicationLabel,
  IntershipApplicationStatus,
} from "@/types/IntershipApplication";
>>>>>>> 15b5294 (Finish)
import { SelectionForm } from "./Views/SelectionForm";
import { useAppDispatch } from "@/store";
import { curatorDetailedIntershipApplicationPageActions } from "./Store";
import dayjs from 'dayjs'

export const Content = () => {
  const { applicationId } = useParams();

  const dispatch = useAppDispatch();
  const { data: application, isLoading: isLoadingApplication } =
    useGetIntershipApplicationQuery(Number.parseInt(applicationId || ""));

  const { data: applicant, isLoading: isLoadingApplicant } =
    useGetTraineeProfileByIdQuery(application?.applicant.id || 0, {
      skip: !application,
    });

  const { data: country, isLoading: isLoadingCountry } = useGetCountryByIdQuery(
    applicant?.citizenship?.id || 0,
    {
      skip: !applicant?.citizenship?.id,
    }
  );

  React.useEffect(() => {
    return () => {
      dispatch(curatorDetailedIntershipApplicationPageActions.reset());
    };
  }, [dispatch]);

  return (
    <Spin spinning={isLoadingApplicant || isLoadingApplication}>
      <Col>
        <Row
          style={{
            display: "grid",
            gridTemplateColumns: "180px 1fr",
          }}
        >
          <Col
            style={{
              width: "180px",
              height: "220px",
              backgroundColor: "#C4C4C4",
            }}
          />

          <Col flex={1} style={{ marginLeft: "20px" }}>
            <Row>
              <Col flex={1} />
              <Col>
                <Paragraph>
                  Дата подачи заявки: {dayjs(application?.created_at).format('DD.MM.YYYY HH:MM:ss')}
                </Paragraph>
              </Col>
            </Row>
            <Title level={4}>
              {applicant?.first_name} {applicant?.last_name}
            </Title>
            <Paragraph>{applicant?.birth_date}</Paragraph>
            <Spin spinning={isLoadingCountry}>
              <Paragraph>Гражданство: {country?.name}</Paragraph>
            </Spin>
            <Paragraph>
              Статус заявки:{" "}
              <Tag>
                {application?.status
                  ? IntershipApplicationLabel[application?.status]
                  : "-"}
              </Tag>
            </Paragraph>
          </Col>
        </Row>
      </Col>
      <Col>
        {application &&
          !(
            application?.status === IntershipApplicationStatus.REJECTED ||
            application.status === IntershipApplicationStatus.PENDING
          ) && (
            <>
              <Divider />
              <SelectionForm applicaion={application} />
              <Divider />
            </>
          )}
        <Title level={4}>Контактная информация</Title>
        <Paragraph>Email: {applicant?.email || "-"}</Paragraph>
        <Paragraph>Телефон: {applicant?.phone_number || "-"}</Paragraph>
        <Paragraph>ВК: {(applicant?.links || [])[0]?.url || "-"}</Paragraph>
        <Paragraph>ТГ: {(applicant?.links || [])[1]?.url || "-"}</Paragraph>

        <Title level={4}>О себе</Title>
        <Paragraph>{applicant?.bio || "-"}</Paragraph>

        <Title level={4}>Образование</Title>
        {(applicant?.educations || []).length === 0 ? (
          <Paragraph>-</Paragraph>
        ) : (
          (applicant?.educations || []).map((education, indx) => (
            <React.Fragment key={indx}>
              {indx !== 0 && <Divider />}
              <EducationView education={education} />
            </React.Fragment>
          ))
        )}

        <Title level={4}>Опыт работы</Title>

        {(applicant?.work_experiences || []).length === 0 ? (
          <Paragraph>-</Paragraph>
        ) : (
          (applicant?.work_experiences || []).map((work_experience, indx) => (
            <React.Fragment key={indx}>
              {indx !== 0 && <Divider />}
              <WorkExperienceView experience={work_experience} />
            </React.Fragment>
          ))
        )}
      </Col>
      <Col>
        {application && application.status && (
          <Actions
            applicationId={application.applicant.id}
            status={application.status}
          />
        )}
      </Col>
    </Spin>
  );
};
