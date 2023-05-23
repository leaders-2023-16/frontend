import { TemplateWithMenu } from "../../components/TemplateWithMenu";
import { Menu } from "./Menu";
import { Outlet } from "react-router-dom";

export const IndexLayout = () => {
  return <TemplateWithMenu menu={<Menu />} content={<Outlet />} />;
};
