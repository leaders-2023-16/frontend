import { TemplateWithMenu } from "@/components/TemplateWithMenu";
import { Content } from "./Content";
import { TraineeMenu } from "@/components/Menus/Trainee";

export const TraineeDetailedVacancyPage = () => {
  return (
    <TemplateWithMenu
      menu={<TraineeMenu activePath="/vacancies" />}
      content={<Content />}
    />
  );
};
