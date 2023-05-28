import {TemplateWithMenu} from "@/components/TemplateWithMenu";
import {Content} from "./content";
import {CuratorMenu} from "@/components/Menus/Curator.tsx";

export const CuratorDetailedWorkPlacePage = () => {
  return <TemplateWithMenu menu={<CuratorMenu activePath={'/work-places'} />} content={<Content />} />;
};
