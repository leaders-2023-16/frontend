import {TemplateWithMenu} from "@/components/TemplateWithMenu";
import {Content} from "./content";
import {CuratorMenu} from "@/components/Menus/Curator.tsx";

export const CuratorWorkPlacesPage = () => {
  return <TemplateWithMenu menu={<CuratorMenu activePath={'/work-places'} />} content={<Content />} />;
};
