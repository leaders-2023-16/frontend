import { TemplateWithMenu } from "@/components/TemplateWithMenu";
import { Content } from "./Content";
import { Menu } from "./Menu";

export const TraineeDetailedVacancyPage = () => {
  return <TemplateWithMenu menu={<Menu />} content={<Content />} />;
};
