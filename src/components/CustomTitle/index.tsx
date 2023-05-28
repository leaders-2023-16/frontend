import { Typography } from "antd";
import { FC } from "react";

export const CustomTitle: FC<{
  children: React.ReactNode;
  isTitle?: boolean;
}> = ({ children, isTitle }) => {
  return (
    <Typography.Text
      style={{
        fontSize: "18px",
        lineHeight: "24px",
        color: "#1A1230",
        ...(isTitle && {
          fontSize: "24px",
          lineHeight: "32px",
        }),
      }}
    >
      {children}
    </Typography.Text>
  );
};
