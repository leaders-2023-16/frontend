import { Menu as AntMenu } from "antd";
import { NavLink } from "react-router-dom";

export const Menu = () => {
  return (
    <AntMenu
      mode="vertical"
      defaultSelectedKeys={["/vacancy-responses"]}
      overflowedIndicator={null}
    >
      <AntMenu.Item key="/vacancy-responses">
        <NavLink to={"/vacancy-responses"}>Отклики</NavLink>
      </AntMenu.Item>

      <AntMenu.Item key="/work-places">
        <NavLink to={"/work-places"}>Стажировки</NavLink>
      </AntMenu.Item>
    </AntMenu>
  );
};
