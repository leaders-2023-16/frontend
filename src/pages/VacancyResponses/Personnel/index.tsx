import { TemplateWithMenu } from "@/components/TemplateWithMenu";
import { Menu } from "./Menu";
import { Content } from "./Content";

export const PersonnelVacancyResponsePage = () => {
  return <TemplateWithMenu menu={<Menu />} content={<Content />} />;
};
