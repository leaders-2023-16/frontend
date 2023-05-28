import { Menu as AntMenu } from "antd";
import { NavLink } from "react-router-dom";

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
        <NavLink to={"/vacancies"}>Мои вакансии</NavLink>
      </AntMenu.Item>
      {/* <AntMenu.Item key="/vacancy-responses">
        <NavLink to={"/vacancy-responses"}>Отклики</NavLink>
      </AntMenu.Item> */}
    </AntMenu>
  );
};
