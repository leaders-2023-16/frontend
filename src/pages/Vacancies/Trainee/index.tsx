import { TemplateWithMenu } from "@/components/TemplateWithMenu";
import React from "react";
import { Menu } from "./menu";
import { Content } from "./content";

export const TraineeVacanciesPage = () => {
  return <TemplateWithMenu menu={<Menu />} content={<Content />} />;
};
