import { TemplateWithMenu } from "@/components/TemplateWithMenu";
import { Content } from "./content";
import { TraineeMenu } from "@/components/Menus/Trainee";

export const TraineeWorkPlacesPage = () => {
  return (
    <TemplateWithMenu
      menu={<TraineeMenu activePath="/work-places" />}
      content={<Content />}
    />
  );
};
