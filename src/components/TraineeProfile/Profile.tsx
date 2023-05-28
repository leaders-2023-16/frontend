import { Space, Typography } from "antd";
import { FC } from "react";

import { ITraineeProfile } from "@/types/TraineeProfile";
import { CustomTitle } from "../CustomTitle";
import { Degree, DegreeToLabel } from "@/store/traineeProfile/types";

const { Title, Paragraph, Link } = Typography;

const SEX_TO_LABEL = {
  M: "Мужской",
  F: "Женский",
};

export const TraineeProfileView: FC<ITraineeProfile> = ({
  educations,
  work_experiences,
  bio,
  citizenship,
  links,
  phone_number,
  email,
  birth_date,
  sex,
}) => {
  return (
    <>
      {/* <Space>
        <Typography.Text>
          Пол: {sex ? SEX_TO_LABEL[sex as "M" | "F"] : "Не указано"}
        </Typography.Text>
        <Typography.Text>Гражданство: {citizenship?.name}</Typography.Text>
      </Space> */}
      <div>
        <Space direction="vertical">
          <CustomTitle>Дата рождения: {birth_date || "Не указано"}</CustomTitle>
          <CustomTitle>
            Гражданство: {citizenship?.name || "Не указано"}
          </CustomTitle>
          <CustomTitle>Почта: {email || "Не указано"}</CustomTitle>
          <CustomTitle>Вконтакте: {"Не указано"}</CustomTitle>
          <CustomTitle>Телеграмм: {"Не указано"}</CustomTitle>
          <CustomTitle>
            Номер телефона: {phone_number || "Не указано"}
          </CustomTitle>
        </Space>
      </div>
      <div>
        <Space direction="vertical" style={{ marginTop: "40px" }}>
          <CustomTitle isTitle>
            Опыт работы:{!work_experiences.length && " Не указано"}
          </CustomTitle>
          {work_experiences.map((ed) => (
            <>
              <CustomTitle>Должность: {ed.position}</CustomTitle>
              <CustomTitle>Название организации: {ed.employer}</CustomTitle>
              <CustomTitle>
                Даты: {ed.start_date} - {ed.end_date}
              </CustomTitle>
              <CustomTitle>Что делал на работе: {ed.description}</CustomTitle>
            </>
          ))}
        </Space>
      </div>
      <div>
        <Space direction="vertical" style={{ marginTop: "40px" }}>
          <CustomTitle isTitle>
            Образование:{!educations.length && " Не указано"}
          </CustomTitle>
          {educations.map((ed) => (
            <>
              <CustomTitle>Название: {ed.name}</CustomTitle>
              {ed.type !== "school" && (
                <>
                  <CustomTitle>Степень: {DegreeToLabel[ed.degree]}</CustomTitle>
                  <CustomTitle>Специальность: {ed.specialization}</CustomTitle>
                </>
              )}
              <CustomTitle>
                Период обучения: {ed.start_year} - {ed.end_year}
              </CustomTitle>
            </>
          ))}
        </Space>
      </div>
      <div>
        <Space direction="vertical" style={{ marginTop: "40px" }}>
          <CustomTitle isTitle>
            О себе:
          </CustomTitle>
          <CustomTitle>{bio}</CustomTitle>
        </Space>
      </div>
      {/* <Title level={5}>
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

      <Title level={5}>О себе</Title>
      <Paragraph>{bio}</Paragraph> */}
    </>
  );
};
