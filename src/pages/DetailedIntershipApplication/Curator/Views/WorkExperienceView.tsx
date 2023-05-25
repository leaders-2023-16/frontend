import { TraineeProfileWorkExperience } from "@/types/TraineeProfile";
import { Col, Row } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";

interface WorkExperienceViewProps {
  experience: TraineeProfileWorkExperience;
}

export const WorkExperienceView: React.FC<WorkExperienceViewProps> = ({
  experience,
}) => {
  return (
    <Col>
      <Title level={5}>{experience.employer}</Title>
      <Row>
        <Paragraph>c {experience.start_date}</Paragraph>
        <Col style={{ width: "20px" }} />
        <Paragraph>по {experience.end_date || "текущее время"}</Paragraph>
      </Row>
      <Paragraph>{experience.description || "-"}</Paragraph>
    </Col>
  );
};
