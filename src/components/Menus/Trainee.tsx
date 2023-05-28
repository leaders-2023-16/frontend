import { Menu as AntMenu } from "antd";
import { NavLink } from "react-router-dom";

interface TraineeMenuProps {
  activePath: string;
}
export const TraineeMenu: React.FC<TraineeMenuProps> = ({ activePath }) => {
  return (
    <AntMenu
      mode="vertical"
      defaultSelectedKeys={[activePath]}
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
