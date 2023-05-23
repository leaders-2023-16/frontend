import { TemplateWithMenu } from "@/components/TemplateWithMenu";
import { Content } from "./content";
import { Menu } from "./menu";

export const CandidateIndexPage = () => {
  return <TemplateWithMenu menu={<Menu />} content={<Content />} />;
};
