import { TemplateWithMenu } from "@/components/TemplateWithMenu";
import { Menu } from "./menu";
import { Content } from "./content";

export const CuratorVacanciesPage = () => {
  return <TemplateWithMenu menu={<Menu />} content={<Content />} />;
};
