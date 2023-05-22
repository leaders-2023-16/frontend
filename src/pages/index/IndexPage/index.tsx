import { Col, Spin } from "antd";

import { useAppSelector } from "../../../store";

import { SubmitApplicationStatus } from "../../../store/submitApplicationScreen/types";
import { useGetSubmitApplicationStatusQuery } from "../../../store/submitApplicationScreen/api";
import { selectAuthUser } from "../../../store/auth/selectors";
import { SubmitApplicationForm } from "./Views/SubmitApplicationForm";

export const IndexPage = () => {
  const user = useAppSelector(selectAuthUser);
  const { data, isLoading } = useGetSubmitApplicationStatusQuery(
    user?.user_id || ""
  );

  return (
    <Spin tip="Loading..." spinning={isLoading}>
      {data?.status === SubmitApplicationStatus.PENDING ? (
        <SubmitApplicationForm />
      ) : (
        <SubmitApplicationForm />
      )}
    </Spin>
  );
};
