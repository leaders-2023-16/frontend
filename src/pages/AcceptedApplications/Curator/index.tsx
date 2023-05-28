import {TemplateWithMenu} from "@/components/TemplateWithMenu";
import {Content} from "./content";
import {CuratorMenu} from "@/components/Menus/Curator.tsx";

export const CuratorAcceptedApplicationsPage = () => {
  return <TemplateWithMenu menu={<CuratorMenu activePath={"/accepted-applications"} />} content={<Content />} />;
};
