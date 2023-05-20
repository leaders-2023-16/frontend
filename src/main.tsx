import React from 'react'
import ReactDOM from 'react-dom/client'
import { store } from './store'
import { Provider } from 'react-redux'
import {
  RouterProvider,
} from "react-router-dom";
import { router } from './router.tsx'
import setup from './services/setupInterceptors.ts';
import { ConfigProvider } from 'antd';
import { theme } from './theme.ts';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider theme={theme}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ConfigProvider>
  </React.StrictMode>,
)

setup(store)