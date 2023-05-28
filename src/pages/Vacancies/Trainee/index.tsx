import { TemplateWithMenu } from "@/components/TemplateWithMenu";
import React from "react";
import { Menu } from "./menu";
import { Content } from "./content";
import { TraineeMenu } from "@/components/Menus/Trainee";

export const TraineeVacanciesPage = () => {
  return (
    <TemplateWithMenu
      menu={<TraineeMenu activePath="/vacancies" />}
      content={<Content />}
    />
  );
};
