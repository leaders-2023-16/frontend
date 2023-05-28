import { UserRole } from "@/types/User";
import { Space } from "antd";
import { FC } from "react";
import { Link } from "react-router-dom";
import style from "./tabs.module.css";

const LinkButton = ({ to, name }: { to: string; name: string }) => (
  <>
    <Link to={to} className={style.linkButton}>
      {name}
    </Link>
  </>
);

export const Tabs: FC<{ role?: UserRole }> = ({ role }) => {
  if (role === UserRole.TRAINEE || role === UserRole.CANDIDATE) {
    return (
      <>
        <Space size='large'>
          <LinkButton to="/profile" name="Профиль" />
          <LinkButton to="/profile" name="Стажировка" />
          <LinkButton to="/profile" name="Вакансии" />
        </Space>
      </>
    );
  }

  return <></>;
};
