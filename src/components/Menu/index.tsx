import React from "react";
import { Col, Menu as AntMenu } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

interface IMenuItem {
  label: string;
  path: string;
}

interface MenuProps {
  items: IMenuItem[];
}
export const Menu: React.FC<MenuProps> = ({ items: providedItems }) => {
  return (
    <AntMenu
      onClick={(e) => console.log(e)}
      items={providedItems.map((item) => ({
        label: item.label,
        key: item.path,
      }))}
    />
  );
};

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
    path: key,
  } as MenuItem;
}
