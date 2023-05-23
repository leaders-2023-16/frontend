import { Spin } from "antd";

import { useAppSelector } from "../../../store";

import { SubmitApplicationStatus } from "../../../store/submitApplicationScreen/types";
import { useGetSubmitApplicationStatusQuery } from "../../../store/submitApplicationScreen/api";
import { selectAuthUser } from "../../../store/auth/selectors";
import { SubmitApplicationForm } from "./Views/SubmitApplicationForm";
import { WaitingApplicationStatus } from "./Views/WaitingApplicationStatus";

export const IndexPage = () => {
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
