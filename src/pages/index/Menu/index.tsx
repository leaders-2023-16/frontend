import { Steps } from "antd";
import React from "react";

export const Menu = () => {
  return (
    <Steps
      direction="vertical"
      current={0}
      size="small"
      items={[
        {
          title: "Подать заявку",
        },
        {
          title: "Пройти отбор",
        },
      ]}
    />
  );
};
