import { Typography } from "antd"
import { FC } from "react"
import { TraineeProfileType } from "../../store/traineeProfile/types"

const { Title, Paragraph } = Typography

export const TraineeProfileView: FC<TraineeProfileType> = ({
    educations,
    work_experiences,
    bio,
    citizenship,
    links,
    phone_number,
    first_name,
    last_name,
    email
}) => {

    return (
        <>
            <Title level={4}>Ссылки:{!links?.length && '  -'}</Title>
            {links.map(l => (<>
                <Paragraph>{l.url}</Paragraph>

            </>))}
            <Title level={4}>Образование:{!educations.length && '  -'}</Title>
            {educations.map(ed => (<>
                <Paragraph>Название: {ed.type} {ed.name}</Paragraph>
                <Paragraph>Специлизация: {ed.specialization}</Paragraph>
                <Paragraph>Должность: {ed.degree}</Paragraph>
                <Paragraph>Годы обучения работы: {ed.start_year} - {ed.end_year}</Paragraph>
                <Paragraph>Описание: {ed.description}</Paragraph>

            </>))}

            <Title level={4}>Опыт работы:
                {!work_experiences.length && '  -'}
            </Title>
            {work_experiences.map(work => (<>
                <Paragraph>Название: {work.employer}</Paragraph>
                <Paragraph>Должность: {work.position}</Paragraph>
                <Paragraph>Дата работы: {work.start_date} - {work.end_date}</Paragraph>
                <Paragraph>Описание: {work.description}</Paragraph>
            </>))}

            <Title level={4}>О себе</Title>
            <Paragraph>{bio}</Paragraph>
        </>
    )
}