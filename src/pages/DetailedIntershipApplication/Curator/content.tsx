import { useGetIntershipApplicationQuery } from "@/store/intershipApplications/api";
import { useGetTraineeProfileByIdQuery } from "@/store/traineeProfile";
import { Col, Row, Spin } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import { useParams } from "react-router-dom";

export const Content = () => {
  const { applicationId } = useParams();

  const { data: application, isLoading: isLoadingApplication } =
    useGetIntershipApplicationQuery(Number.parseInt(applicationId || ""));

  const { data: applicant, isLoading: isLoadingApplicant } =
    useGetTraineeProfileByIdQuery(application?.applicant.id || 0, {
      skip: !application,
    });

  return (
    <Spin spinning={isLoadingApplicant || isLoadingApplication}>
      <Col>
        <Row>
          <Col
            style={{
              width: "180px",
              height: "220px",
              backgroundColor: "#C4C4C4",
            }}
          />
          <Col style={{ width: "20px" }} />
          <Col flex={1}>
            <Title level={4}>
              {applicant?.first_name} {applicant?.last_name}
            </Title>
            <Paragraph>{applicant?.birth_date}</Paragraph>
          </Col>
        </Row>
      </Col>
      <Col>
        <Title level={5}>Опыт работы</Title>
      </Col>
    </Spin>
  );
};
