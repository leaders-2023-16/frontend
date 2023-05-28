import { Menu as AntMenu } from "antd";
import { NavLink } from "react-router-dom";

interface CuratorMenuProps {
  activePath: string;
}
export const CuratorMenu: React.FC<CuratorMenuProps> = ({ activePath }) => {
  return (
    <AntMenu
      mode="vertical"
      defaultSelectedKeys={[activePath]}
      overflowedIndicator={null}
    >
      <AntMenu.Item key="/intership-applications">
        <NavLink to={"/intership-applications"}>Заявки на стажировку</NavLink>
      </AntMenu.Item>

      <AntMenu.Item key="/accepted-applications">
        <NavLink to={"/accepted-applications"}>Проходят отбор</NavLink>
      </AntMenu.Item>

      <AntMenu.Item key="/vacancies">
        <NavLink to={"/vacancies"}>Заявки на стажеров</NavLink>
      </AntMenu.Item>

      <AntMenu.Item key="/vacancy-responses">
        <NavLink to={"/vacancy-responses"}>Отклики</NavLink>
      </AntMenu.Item>

      <AntMenu.Item key="/work-places">
        <NavLink to={"/work-places"}>Стажировки</NavLink>
      </AntMenu.Item>

      <AntMenu.Item key="/statistics">
        <NavLink to={"/statistics"}>Статистика</NavLink>
      </AntMenu.Item>
    </AntMenu>
  );
};
