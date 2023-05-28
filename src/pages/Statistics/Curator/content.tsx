import { useGetStatisticQuery } from "@/store/statistics/api";
import React, { useCallback, useEffect, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  Label,
} from "recharts";
import { Col, Row, Statistic } from "antd";

const COLORS = ["#B390EC", "#9068C0", "#663398", "#2C1551", "#1A1230"];

export const Content = () => {
  const { data, isLoading } = useGetStatisticQuery();

  const ageStatistic = useMemo(() => {
    if (!data) return [];
    const arr = JSON.parse(JSON.stringify(data.age_statistics));
    return [...data.age_statistics]
      .sort((a, b) => {
        const a1 = a.label === null ? -Infinity : parseInt(a.label, 10);
        const b1 = b.label === null ? -Infinity : parseInt(b.label, 10);
        return a1 - b1;
      })
      .map((el) => ({
        ...el,
        label: el.label ?? "Без опыта",
      }));
  }, [data]);

  const workExperienceStatistic = useMemo(() => {
    if (!data) return data;
    return data.work_experience;
  }, [data]);

  const dataStat = useMemo(() => {
    if (!data) return [];
    return data.direction_statistics.filter((el) => !!el.label);
  }, [data]);
  console.log(dataStat);
  if (!data) return null;
  return (
    <>
      <h2>Отклики</h2>
      <Row>
        <Col flex={1}>
          <Statistic title="Всего откликов" value={data.responses.total} />
        </Col>
        <Col flex={1}>
          <Statistic
            title="Релевантных откликов"
            value={data.responses.relevant}
          />
        </Col>
        <Col flex={1}>
          <Statistic
            title="Нерелевантных откликов"
            value={data.responses.irrelevant}
          />
        </Col>
        <Col flex={1}>
          <Statistic
            title="Всего заявок на стажеров"
            value={data.vacancies.total}
          />
        </Col>
      </Row>

      <h2>Статистика по возрасту</h2>
      <BarChart
        width={800}
        height={300}
        data={ageStatistic}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="label">
          <Label value="Возраст" offset={0} position="insideBottom" />
        </XAxis>
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#9068C0" name={"Количество"} />
      </BarChart>

      <h2>Статистика по типу образования</h2>
      <BarChart
        width={800}
        height={300}
        data={data.education.by_type}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="label" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#9068C0" name={"Количество"} />
      </BarChart>

      <h2>Статистика по образовательному учреждению</h2>
      <BarChart
        width={800}
        height={300}
        data={data.education.by_name}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="label" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#9068C0" name={"Количество"} />
      </BarChart>

      <h2>Статистика по опыту работы</h2>
      <BarChart
        width={800}
        height={300}
        data={data.work_experience}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="label">
          <Label value="Опыт работы, лет" offset={0} position="insideBottom" />
        </XAxis>
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#9068C0" name={"Количество"} />
      </BarChart>
      <h2>Статистика по направлениям</h2>
      <PieChart width={400} height={400}>
        <Pie
          dataKey="count"
          nameKey="label"
          data={dataStat}
          fill="#9068C0"
          label
        >
          {dataStat.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
        <Tooltip />
      </PieChart>
      <h2>Статистика заявок на стажеров по департаментам</h2>

      <BarChart
        width={800}
        height={300}
        data={data.vacancies.by_department}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="label" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#9068C0" name={"Количество"} />
      </BarChart>
    </>
  );
};
