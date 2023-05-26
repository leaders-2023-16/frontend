import { ThemeConfig } from "antd";

export const theme: ThemeConfig = {
  token: {
    colorBgLayout: "#f5f5f5",
    colorBgContainer: "#ffffff",
    fontFamily: 'GT Walsheim LC'
  },
  components: {
    Layout: {
      colorBgHeader: "white",
      controlHeight: 39
    },
    Button: {
      colorPrimary: "#1A1230",
      colorPrimaryHover: '#48357c',
      borderRadius: 50,
      controlHeight: 46,
      paddingContentHorizontal: 32,
      paddingContentVertical: 16,
      fontSize: 14,
    },
  },
};
