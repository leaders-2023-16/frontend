import { Spin } from "antd";

import { useAppSelector } from "@/store";

import { selectAuthUser } from "@/store/auth/selectors";

import { SubmitApplicationForm } from "./Views/SubmitApplicationForm";
import { WaitingApplicationStatus } from "./Views/WaitingApplicationStatus";
import { useGetSubmitApplicationStatusQuery } from "./Store/api";
import { SubmitApplicationStatus } from "./Store/types";

export const Content = () => {
  const user = useAppSelector(selectAuthUser);
  const { data, isLoading } = useGetSubmitApplicationStatusQuery(
    user?.user_id || ""
  );

  return (
    <Spin tip="Loading..." spinning={!data || isLoading}>
      {!data ? (
        <SubmitApplicationForm />
      ) : data.status === SubmitApplicationStatus.PENDING ? (
        <WaitingApplicationStatus />
      ) : !data.status ? (
        <SubmitApplicationForm />
      ) : null}
    </Spin>
  );
};
