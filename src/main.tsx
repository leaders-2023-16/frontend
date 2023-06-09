import React from "react";
import ReactDOM from "react-dom/client";
import { store } from "./store";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.tsx";
import setup from "./services/setupInterceptors.ts";
import { App, ConfigProvider } from "antd";
import { theme } from "./theme.ts";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider theme={theme}>
      <App>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </App>
    </ConfigProvider>
  </React.StrictMode>
);

setup(store);
