import { Menu as AntMenu } from "antd";
import { NavLink } from "react-router-dom";

export const Menu = () => {
  return (
    <AntMenu
      mode="vertical"
      defaultSelectedKeys={["/vacancy-responses"]}
      overflowedIndicator={null}
    >
      <AntMenu.Item key="/vacancies">
        <NavLink to={"/vacancies"}>Вакансии</NavLink>
      </AntMenu.Item>
      <AntMenu.Item key="/vacancy-responses">
        <NavLink to={"/vacancy-responses"}>Отклики</NavLink>
      </AntMenu.Item>
      <AntMenu.Item key="/work-places">
        <NavLink to={"/work-places"}>Стажировка</NavLink>
      </AntMenu.Item>
    </AntMenu>
  );
};
