import { Space, Typography } from "antd";
import { FC } from "react";
import { TraineeProfileType } from "../../store/traineeProfile/types";

const { Title, Paragraph, Link } = Typography;

const SEX_TO_LABEL = {
  M: "Мужской",
  F: "Женский",
};

export const TraineeProfileView: FC<TraineeProfileType> = ({
  educations,
  work_experiences,
  bio,
  citizenship,
  links,
  phone_number,
  first_name,
  last_name,
  email,
  birth_date,
  sex,
}) => {
  return (
    <>
      <Title level={5}>
        Пол: {SEX_TO_LABEL[sex as "M" | "F"] || "Не указано"}
      </Title>
      <Title level={5}>Дата рождения: {birth_date || "Не указано"}</Title>
      <Title level={4}>Ссылки:{!links?.length && "  -"}</Title>
      <Space direction="vertical">
        {links.map((l) => (
          <>
            <Link href={l.url} target="_blank">
              {l.url}
            </Link>
          </>
        ))}
      </Space>
      <Title level={4}>Образование:{!educations.length && "  -"}</Title>
      {educations.map((ed) => (
        <>
          <Paragraph>
            Название: {ed.type} {ed.name}
          </Paragraph>
          {ed.type !== "school" && (
            <>
              <Paragraph>Специлизация: {ed.specialization}</Paragraph>
              <Paragraph>Должность: {ed.degree}</Paragraph>
            </>
          )}
          <Paragraph>
            Годы обучения работы: {ed.start_year} - {ed.end_year}
          </Paragraph>
          <Paragraph>Описание: {ed.description}</Paragraph>
        </>
      ))}

      <Title level={4}>
        Опыт работы:
        {!work_experiences.length && "  -"}
      </Title>
      {work_experiences.map((work) => (
        <>
          <Paragraph>Название: {work.employer}</Paragraph>
          <Paragraph>Должность: {work.position}</Paragraph>
          <Paragraph>
            Дата работы: {work.start_date} - {work.end_date}
          </Paragraph>
          <Paragraph>Описание: {work.description}</Paragraph>
        </>
      ))}

      <Title level={4}>О себе</Title>
      <Paragraph>{bio}</Paragraph>
    </>
  );
};
