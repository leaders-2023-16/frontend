import {TemplateWithMenu} from "@/components/TemplateWithMenu";
import {Content} from "./content";
import {CuratorMenu} from "@/components/Menus/Curator.tsx";

export const CuratorDetailedVacancyResponsePage = () => {
  return <TemplateWithMenu menu={<CuratorMenu activePath={'/vacancy-responses'} />} content={<Content />} />;
};
