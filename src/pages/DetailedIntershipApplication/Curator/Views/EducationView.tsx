import { TraineeProfileEducation } from "@/types/TraineeProfile";
import { Col, Row } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";

interface SchoolEducationViewProps {
  education: TraineeProfileEducation;
}

export const EducationView: React.FC<SchoolEducationViewProps> = ({
  education,
}) => {
  return (
    <Col>
      <Title level={5}>{education.name}</Title>
      {education.specialization && (
        <Paragraph>Степень: {education.degree}</Paragraph>
      )}
      {education.specialization && (
        <Paragraph>Специализация: {education.specialization}</Paragraph>
      )}
      <Row>
        <Paragraph>c {education.start_year}</Paragraph>
        <Col style={{ width: "20px" }} />
        <Paragraph>по {education.end_year || "текущее время"}</Paragraph>
      </Row>
      <Paragraph>{education.description || "-"}</Paragraph>
    </Col>
  );
};
