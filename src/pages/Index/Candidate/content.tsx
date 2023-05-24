import { Spin } from "antd";

import { useAppSelector } from "@/store";

import { selectAuthUser } from "@/store/auth/selectors";

import { SubmitApplicationForm } from "./Views/SubmitApplicationForm";
import { WaitingApplicationStatus } from "./Views/WaitingApplicationStatus";
import { IntershipApplicationStatus } from "@/types/IntershipApplication";
import { useGetIntershipApplicationQuery } from "@/store/intershipApplications/api";

export const Content = () => {
  const user = useAppSelector(selectAuthUser);
  const { data, isLoading } = useGetIntershipApplicationQuery(user?.id || 0, {
    skip: !user?.id,
  });

  return (
    <Spin tip="Loading..." spinning={isLoading}>
      {!data ? (
        <SubmitApplicationForm />
      ) : data.status === IntershipApplicationStatus.PENDING ? (
        <WaitingApplicationStatus />
      ) : !data.status ? (
        <SubmitApplicationForm />
      ) : null}
    </Spin>
  );
};
