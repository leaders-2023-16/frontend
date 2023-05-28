import {TemplateWithMenu} from "@/components/TemplateWithMenu";
import {Content} from "./content";
import {CuratorMenu} from "@/components/Menus/Curator.tsx";

export const CuratorDetailedIntershipApplicationPage = () => {
  return <TemplateWithMenu menu={<CuratorMenu activePath={'/intership-applications'} />} content={<Content />} />;
};
