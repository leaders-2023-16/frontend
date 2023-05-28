import { TemplateWithMenu } from "@/components/TemplateWithMenu";
import { Menu } from "./menu";
import { Content } from "./content";
import { TraineeMenu } from "@/components/Menus/Trainee";

export const TraineeDetailedWorkPlacePage = () => {
  return (
    <TemplateWithMenu
      menu={<TraineeMenu activePath="/work-places" />}
      content={<Content />}
    />
  );
};
