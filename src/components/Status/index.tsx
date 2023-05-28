import { TraineeProfileTestStatus } from "@/types/TraineeProfile";
import { Tag } from "antd";
import { FC } from "react";
import { CustomTitle } from "../CustomTitle";

const colors = {
  red: "#FF0F43",
  green: "#009900",
  blue: "#E6F7FF",
};
const colorsText = {
  red: "white",
  green: "white",
  blue: "#1A1230",
};

export const Status: FC<{
  status: string;
  color?: "red" | "green" | "blue";
}> = ({ color = "blue", status }) => {
  return (
    <Tag
      style={{
        background: colors[color],
        borderRadius: "50px",
      }}
    >
      <div
        style={{
          fontSize: "18px",
          lineHeight: "24px",
          color: colorsText[color],
          padding: '8px 24px'
        }}
      >
        {status}
      </div>
    </Tag>
  );
};
