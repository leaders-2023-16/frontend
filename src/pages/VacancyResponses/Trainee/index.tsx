import { TemplateWithMenu } from "@/components/TemplateWithMenu";
import { Menu } from "./menu";
import { Content } from "./content";
import { TraineeMenu } from "@/components/Menus/Trainee";

export const TraineeVacancyResponsePage = () => {
  return (
    <TemplateWithMenu
      menu={<TraineeMenu activePath="/vacancy-responses" />}
      content={<Content />}
    />
  );
};
