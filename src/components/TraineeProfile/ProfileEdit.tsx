import {
  Button,
  DatePicker,
  Divider,
  Input,
  Select,
  Space,
  Typography,
} from "antd";
import { FC } from "react";

import {
  DeleteFilled,
  PlusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useProfileEdit } from "./hooks";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import Title from "antd/es/typography/Title";
import {
  IPatchTraineeProfile,
  ITraineeProfile,
  TraineeProfileSex,
} from "@/types/TraineeProfile";
import { useGetCountiresQuery } from "@/store/dictionary";
import { CustomButton } from "../Button";
import { CustomTitle } from "../CustomTitle";

type ProfileEditType = Partial<ITraineeProfile> & {
  onChange: (data: IPatchTraineeProfile) => void;
};

export const ProfileEdit: FC<ProfileEditType> = ({ onChange, ...data }) => {
  const { data: countries } = useGetCountiresQuery();
  // const countries = [] as { name: string; id: number }[];
  const { editingObj, link, work, educations, bio, sex, citizenship, birth } =
    useProfileEdit({ onChange, ...data, countries: countries || [] });
  return (
    <>
      <Space direction="vertical">
        <Space size={"middle"}>
          <CustomTitle>Дата рождения:</CustomTitle>
          <DatePicker
            value={birth.value ? dayjs(birth.value, "YYYY-MM-DD") : null}
            placeholder="Введите дату"
            format={"DD-MM-YYYY"}
            style={{ width: "160px" }}
            onChange={(e) => birth.onChange(e?.format("YYYY-MM-DD") || "")}
          />
        </Space>
        <Space size={"middle"}>
          <CustomTitle>Пол: </CustomTitle>
          <Select
            defaultValue={sex.value || "N"}
            style={{ width: 120 }}
            onChange={(e) => sex.onChange(e as TraineeProfileSex)}
            options={[
              { value: "M", label: "Мужской" },
              { value: "F", label: "Женский" },
              { value: "N", label: "Не указано" },
            ]}
          />
        </Space>
        <Space size={"middle"}>
          <CustomTitle>Гражданство: </CustomTitle>
          <Select
            defaultValue={citizenship.value || 0}
            style={{ width: 240 }}
            onChange={(e) => citizenship.onChange(e)}
            options={countries?.map(({ id, name }) => ({
              value: id,
              label: name,
            }))}
          />
        </Space>
        <CustomTitle>Ссылки:</CustomTitle>
        {editingObj.links?.map((el) => (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Space>
              <CustomTitle>{el.url}</CustomTitle>
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
        )}{" "}
        {/*////////////////////////////////////////////////////////////////////*/}
        <Space style={{ marginTop: "16px" }}>
          <CustomTitle isTitle>Образование:</CustomTitle>{" "}
          <Button
            type="text"
            style={{ borderRadius: "50%", marginTop: "2px" }}
            icon={<PlusOutlined />}
            onClick={educations.onAdd}
          />
        </Space>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            marginTop: "8px",
          }}
        >
          {educations.value.map((el, idx) => (
            <>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                <Space>
                  <CustomTitle>Название:</CustomTitle>
                  <Input
                    value={el.name}
                    onChange={(e) =>
                      educations.onChange(idx, "name", e.target.value)
                    }
                    placeholder={"Введите название"}
                  />
                </Space>
                <Space>
                  <CustomTitle>Тип: </CustomTitle>
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
                    <CustomTitle>Специлизация:</CustomTitle>
                    <Input
                      value={el.specialization}
                      onChange={(e) =>
                        educations.onChange(
                          idx,
                          "specialization",
                          e.target.value
                        )
                      }
                      placeholder={"Введите специлизацию"}
                    />
                  </Space>
                )}
                <Space>
                  <CustomTitle>Степень:</CustomTitle>
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
                  <CustomTitle>Годы обучения:</CustomTitle>
                  <Space>
                    <DatePicker
                      picker="year"
                      value={
                        el.start_year
                          ? dayjs(el.start_year.toString(), "YYYY")
                          : null
                      }
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
                      value={
                        el.end_year
                          ? dayjs(el.end_year.toString(), "YYYY")
                          : null
                      }
                      format={"YYYY"}
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
                  <CustomTitle>Описание:</CustomTitle>
                  <TextArea
                    rows={3}
                    value={el.description || ""}
                    onChange={(e) =>
                      educations.onChange(idx, "description", e.target.value)
                    }
                  />
                </Space>
              </div>
              {educations.value.length > 1 && (
                <Button
                  danger
                  type="text"
                  style={{ width: "115px", marginLeft: "auto" }}
                  onClick={() => educations.onDelete(idx)}
                >
                  Удалить
                </Button>
              )}
              {educations.value.length - 1 !== idx && (
                <Divider style={{ margin: "4px 0" }} />
              )}
            </>
          ))}
        </div>
        {/*////////////////////////////////////////////////////////////////////*/}
        <Space style={{ marginTop: "16px" }}>
          <CustomTitle isTitle>Опыт работы:</CustomTitle>{" "}
          <Button
            type="text"
            style={{ borderRadius: "50%", marginTop: "2px" }}
            icon={<PlusOutlined />}
            onClick={work.onAdd}
          />
        </Space>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {work.value.map((el, idx) => (
            <>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                <Space>
                  <CustomTitle>Название организации:</CustomTitle>
                  <Input
                    value={el.employer}
                    onChange={(e) =>
                      work.onChange(idx, "employer", e.target.value)
                    }
                    placeholder={"Введите название"}
                  />
                </Space>
                <Space>
                  <CustomTitle>Должность:</CustomTitle>
                  <Input
                    value={el.position}
                    onChange={(e) =>
                      work.onChange(idx, "position", e.target.value)
                    }
                    placeholder={"Введите должность"}
                  />
                </Space>
                <Space>
                  <CustomTitle>Стаж:</CustomTitle>
                  <Space>
                    <DatePicker
                      value={
                        el.start_date
                          ? dayjs(el.start_date, "YYYY-MM-DD")
                          : null
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
                <CustomTitle>Описание:</CustomTitle>
                <TextArea
                  rows={3}
                  value={el.description || ""}
                  onChange={(e) =>
                    work.onChange(idx, "description", e.target.value)
                  }
                />
              </div>
              {work.value.length > 1 && (
                <Button
                  danger
                  type="text"
                  style={{ width: "115px", marginLeft: "auto" }}
                  onClick={() => work.onDelete(idx)}
                >
                  Удалить
                </Button>
              )}
              {work.value.length - 1 !== idx && (
                <Divider style={{ margin: "4px 0" }} />
              )}
            </>
          ))}
        </div>
        <div style={{ marginTop: "16px" }}>
          <CustomTitle isTitle>О себе</CustomTitle>
          <TextArea
            style={{ marginTop: "12px" }}
            rows={10}
            value={bio.value}
            onChange={(e) => bio.onChange(e.target.value)}
          ></TextArea>
        </div>
      </Space>
    </>
  );
};
