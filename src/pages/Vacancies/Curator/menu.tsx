import { Menu as AntMenu } from "antd";
import { NavLink } from "react-router-dom";

export const Menu = () => {
  return (
    <AntMenu
      mode="vertical"
      defaultSelectedKeys={["/vacancies"]}
      overflowedIndicator={null}
    >
      <AntMenu.Item key="/intership-applications">
        <NavLink to={"/intership-applications"}>Заявки на стажировку</NavLink>
      </AntMenu.Item>

      <AntMenu.Item key="/vacancies">
        <NavLink to={"/vacancies"}>Заявки на стажеров</NavLink>
      </AntMenu.Item>
    </AntMenu>
  );
};