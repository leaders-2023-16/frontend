import {TemplateWithMenu} from "@/components/TemplateWithMenu";
import {Content} from "./content";
import {CuratorMenu} from "@/components/Menus/Curator.tsx";

export const CuratorVacanciesPage = () => {
  return <TemplateWithMenu menu={<CuratorMenu activePath={"/vacancies"} />} content={<Content />} />;
};
