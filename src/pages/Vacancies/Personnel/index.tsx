import { TemplateWithMenu } from "@/components/TemplateWithMenu";
import { Content } from "./content";
import { Menu } from "./menu";

export const VacanciesPersonnelPage = () => {
  return <TemplateWithMenu content={<Content />} menu={<Menu />} />;
};
