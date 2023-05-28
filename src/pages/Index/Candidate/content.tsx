import { Spin, Tabs } from "antd";

import { useAppSelector } from "@/store";

import { selectAuthUser } from "@/store/auth/selectors";

import { SubmitApplicationForm } from "./Views/SubmitApplicationForm";
import { WaitingApplicationStatus } from "./Views/WaitingApplicationStatus";
import { IntershipApplicationStatus } from "@/types/IntershipApplication";
import { useGetIntershipApplicationQuery } from "@/store/intershipApplications/api";
import { CareerSchool } from "./Views/CareerSchool";
import { Testing } from "./Views/Testing";

export const Content = () => {
  const user = useAppSelector(selectAuthUser);
  const { data, isLoading } = useGetIntershipApplicationQuery(user?.id || 0, {
    skip: !user?.id,
  });

  return (
    <>
      <Tabs
        size="large"
        animated
        items={[
          {
            key: "1",
            label: "Подача заявки",
            children: (
              <>
                {!data ? (
                  <SubmitApplicationForm />
                ) : data.status === IntershipApplicationStatus.PENDING ? (
                  <WaitingApplicationStatus
                    direction={data.direction || 1}
                    status={data.status}
                  />
                ) : !data.status ? (
                  <SubmitApplicationForm />
                ) : null}
              </>
            ),
          },
          {
            key: "2",
            label: "Карьерная школа",
            children: (
              <>
                <CareerSchool
                  pass={data?.trainee_profile?.career_school_password}
                  user={data?.trainee_profile?.career_school_username}
                  status={data?.status}
                />
              </>
            ),
          },
          {
            key: "3",
            label: "Тестирование",
            children: (
              <>
                <Testing
                  pass={data?.trainee_profile?.testing_platform_password}
                  user={data?.trainee_profile?.testing_platform_username}
                  status={data?.status}
                />
              </>
            ),
          },
          {
            key: "4",
            label: "Кейс-чемпионат",
            children: <></>,
          },
        ]}
      ></Tabs>
      {/* <Spin tip="Loading..." spinning={isLoading}>
        {!data ? (
          <SubmitApplicationForm />
        ) : data.status === IntershipApplicationStatus.PENDING ? (
          <WaitingApplicationStatus />
        ) : !data.status ? (
          <SubmitApplicationForm />
        ) : null}
      </Spin> */}
    </>
  );
};
