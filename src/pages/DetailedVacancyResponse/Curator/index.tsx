import { TemplateWithMenu } from "@/components/TemplateWithMenu";
import { Menu } from "./menu";
import { Content } from "./content";

export const CuratorDetailedVacancyResponsePage = () => {
  return <TemplateWithMenu menu={<Menu />} content={<Content />} />;
};
