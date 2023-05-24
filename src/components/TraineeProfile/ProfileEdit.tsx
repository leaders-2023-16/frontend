import {
  Button,
  DatePicker,
  Divider,
  Input,
  InputNumber,
  Select,
  Space,
  Typography,
} from "antd";
import { FC, useEffect, useState } from "react";
import {
  TraineeProfileType,
  UpdateTraineeProfile,
} from "../../store/traineeProfile/types";
import { DeleteFilled } from "@ant-design/icons";
import { useProfileEdit } from "./hooks";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import Title from "antd/es/typography/Title";
import { useGetCountiresQuery } from "@/store/dictionary";

type ProfileEditType = Partial<TraineeProfileType> & {
  onChange: (data: Partial<UpdateTraineeProfile>) => void;
};

export const ProfileEdit: FC<ProfileEditType> = ({ onChange, ...data }) => {
  // const { data: countries } = useGetCountiresQuery()
  const countries = [] as { name: string; id: number }[];
  const { editingObj, link, work, educations, bio, sex, citizenship } =
    useProfileEdit({ onChange, ...data, countries: countries || [] });
  return (
    <>
      <Space>
        <Typography.Text>Пол: </Typography.Text>
        <Select
          defaultValue={sex.value || "N"}
          style={{ width: 120 }}
          onChange={(e) => sex.onChange(e)}
          options={[
            { value: "M", label: "Мужской" },
            { value: "F", label: "Женский" },
            { value: "N", label: "Не указано" },
          ]}
        />
      </Space>
      <Space>
        <Typography.Text>Гражданство: </Typography.Text>
        <Select
          defaultValue={citizenship.value || 0}
          style={{ width: 120 }}
          onChange={(e) => citizenship.onChange(e)}
          options={countries?.map(({ id, name }) => ({
            value: id,
            label: name,
          }))}
        />
      </Space>

      <Title level={4}>Ссылки:{!link.value.length && "  -"}</Title>

      {editingObj.links?.map((el) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Space>
            <Typography.Text>{el.url}</Typography.Text>
            <DeleteFilled
              onClick={() => link.onDelete(el.url)}
              style={{ color: "#ef3b3b" }}
            />
          </Space>
        </div>
      ))}
      {(editingObj.links || []).length < 5 && (
        <Input
          status={link.error && "error"}
          placeholder="Добавьте ссылку"
          value={link.value}
          onChange={(e) => link.onChange(e.target.value)}
          onPressEnter={link.onAdd}
          onBlur={() => (link.value ? link.onAdd() : link.onChange(""))}
        />
      )}
      {/*////////////////////////////////////////////////////////////////////*/}
      <Typography.Title level={3}>Образование:</Typography.Title>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {educations.value.map((el, idx) => (
          <>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <Space>
                <Typography.Text>Название:</Typography.Text>
                <Input
                  value={el.name}
                  onChange={(e) =>
                    educations.onChange(idx, "name", e.target.value)
                  }
                  placeholder={"Введите название"}
                />
              </Space>
              <Space>
                <Typography.Text>Тип: </Typography.Text>
                <Select
                  onChange={(e) => educations.onChange(idx, "type", e || "")}
                  defaultValue={educations.value[idx].type || "school"}
                  style={{ width: 140 }}
                  options={[
                    { value: "school", label: "Школа" },
                    { value: "university", label: "Университет" },
                    { value: "college ", label: "Колледж" },
                  ]}
                />
              </Space>
              {educations.value[idx].type !== "school" && (
                <Space>
                  <Typography.Text>Специлизация:</Typography.Text>
                  <Input
                    value={el.specialization}
                    onChange={(e) =>
                      educations.onChange(idx, "specialization", e.target.value)
                    }
                    placeholder={"Введите специлизацию"}
                  />
                </Space>
              )}
              <Space>
                <Typography.Text>Степень:</Typography.Text>
                <Select
                  defaultValue="Bachelor"
                  style={{ width: 120 }}
                  onChange={(e) => educations.onChange(idx, "degree", e)}
                  options={[
                    { value: "Bachelor", label: "Бакалавр" },
                    { value: "Master", label: "Магистр" },
                    { value: "Doctorate", label: "Доктор" },
                  ]}
                />
              </Space>
              <Space>
                <Typography.Text>Годы обучения:</Typography.Text>
                <Space>
                  <DatePicker
                    picker="year"
                    value={el.start_year ? dayjs(el.start_year, "YYYY") : null}
                    onChange={(e) =>
                      educations.onChange(
                        idx,
                        "start_year",
                        e?.get("year").toString() || ""
                      )
                    }
                    placeholder={"Начало"}
                  />
                  &nbsp;-&nbsp;
                  <DatePicker
                    picker="year"
                    value={el.end_year ? dayjs(el.end_year, "YYYY") : null}
                    onChange={(e) =>
                      educations.onChange(
                        idx,
                        "end_year",
                        e?.get("year").toString() || ""
                      )
                    }
                    placeholder={"Окончание"}
                  />
                </Space>
              </Space>
              <Space direction="vertical">
                <Typography.Text>Описание:</Typography.Text>
                <TextArea
                  rows={3}
                  value={el.description || ""}
                  onChange={(e) =>
                    educations.onChange(idx, "description", e.target.value)
                  }
                />
              </Space>
            </div>
            <Button
              style={{ width: "90px" }}
              danger
              onClick={() => educations.onDelete(idx)}
            >
              Удалить
            </Button>
            {educations.value.length - 1 !== idx && (
              <Divider style={{ margin: "4px 0" }} />
            )}
          </>
        ))}
      </div>
      <Button onClick={educations.onAdd}>Добавить</Button>
      {/*////////////////////////////////////////////////////////////////////*/}
      <Typography.Title level={3}>Опыт работы:</Typography.Title>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {work.value.map((el, idx) => (
          <>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <Space>
                <Typography.Text>Название организации:</Typography.Text>
                <Input
                  value={el.employer}
                  onChange={(e) =>
                    work.onChange(idx, "employer", e.target.value)
                  }
                  placeholder={"Введите название"}
                />
              </Space>
              <Space>
                <Typography.Text>Должность:</Typography.Text>
                <Input
                  value={el.position}
                  onChange={(e) =>
                    work.onChange(idx, "position", e.target.value)
                  }
                  placeholder={"Введите должность"}
                />
              </Space>
              <Space>
                <Typography.Text>Описание:</Typography.Text>
                <Input
                  onChange={(e) =>
                    work.onChange(idx, "description", e.target.value)
                  }
                  value={el.description}
                  placeholder={"Введите описание"}
                />
              </Space>
              <Space>
                <Typography.Text>Стаж:</Typography.Text>
                <Space>
                  <DatePicker
                    value={
                      el.start_date ? dayjs(el.start_date, "YYYY-MM-DD") : null
                    }
                    placeholder={"Начало"}
                    format={"DD-MM-YYYY"}
                    onChange={(e) =>
                      work.onChange(
                        idx,
                        "start_date",
                        e?.format("YYYY-MM-DD") || ""
                      )
                    }
                  />
                  &nbsp;-&nbsp;
                  <DatePicker
                    value={
                      el.end_date ? dayjs(el.end_date, "YYYY-MM-DD") : null
                    }
                    format={"DD-MM-YYYY"}
                    onChange={(e) =>
                      work.onChange(
                        idx,
                        "end_date",
                        e?.format("YYYY-MM-DD") || ""
                      )
                    }
                    placeholder={"Окончание"}
                  />
                </Space>
              </Space>
            </div>
            <Button
              style={{ width: "90px" }}
              danger
              onClick={() => work.onDelete(idx)}
            >
              Удалить
            </Button>
            {work.value.length - 1 !== idx && (
              <Divider style={{ margin: "4px 0" }} />
            )}
          </>
        ))}
      </div>
      <Button onClick={work.onAdd}>Добавить</Button>

      {/* <Typography.Title level={3}>Опыт работы:
                {!editingObj.work_experiences?.length && '  -'}
            </Typography.Title>
            {editingObj.work_experiences?.map(work => (<>
                <Typography.Paragraph>Название: {work.employer}</Typography.Paragraph>
                <Typography.Paragraph>Должность: {work.position}</Typography.Paragraph>
                <Typography.Paragraph>Дата работы: {work.start_date} - {work.end_date}</Typography.Paragraph>
                <Typography.Paragraph>Описание: {work.description}</Typography.Paragraph>

            </>))} */}
      <Typography.Title level={3}>О себе</Typography.Title>
      <TextArea
        rows={10}
        value={bio.value}
        onChange={(e) => bio.onChange(e.target.value)}
      ></TextArea>
    </>
  );
};
