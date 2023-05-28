import { TemplateWithMenu } from "@/components/TemplateWithMenu";
import { Content } from "./content";
import { Menu } from "./menu";
import { Typography } from "antd";

export const CandidateIndexPage = () => {
  return (
    <>
      <div
        style={{
          fontSize: "36px",
          lineHeight: "40px",
          margin: '24px 0',
          color: '#1A1230'
        }}
      >
        Стажировка
      </div>
      <Content />
    </>
  );
};
