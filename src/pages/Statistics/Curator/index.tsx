import {TemplateWithMenu} from "@/components/TemplateWithMenu";
import { CuratorMenu } from "@/components/Menus/Curator";
import { Content } from "./content";

export const CuratorStatisticsPage = () => {
  return <TemplateWithMenu menu={<CuratorMenu activePath={'/statistics'} />} content={<Content />} />;
};
