import { Menu as AntMenu } from "antd";
import { NavLink, useMatch } from "react-router-dom";

export const Menu = () => {
  return (
    <AntMenu
      mode="vertical"
      defaultSelectedKeys={["/create-vacancy"]}
      overflowedIndicator={null}
    >
      <AntMenu.Item key="/create-vacancy">
        <NavLink to={"/create-vacancy"}>Создать вакансию</NavLink>
      </AntMenu.Item>
      <AntMenu.Item key="/vacancies">
        <NavLink to={"/vacancies"}>Мои вакансию</NavLink>
      </AntMenu.Item>
      <AntMenu.Item key="/vacancies-response">
        <NavLink to={"/vacancies-response"}>Отклики</NavLink>
      </AntMenu.Item>
    </AntMenu>
  );
};
