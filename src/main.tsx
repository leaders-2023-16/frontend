import React from 'react'
import ReactDOM from 'react-dom/client'
import '@shopify/polaris/build/esm/styles.css';
import { store } from './store'
import { Provider } from 'react-redux'
import {
  RouterProvider,
} from "react-router-dom";
import { router } from './router.tsx'
import enTranslations from '@shopify/polaris/locales/en.json';
import { AppProvider } from '@shopify/polaris';
import setup from './services/setupInterceptors.ts';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppProvider i18n={enTranslations}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </AppProvider>
  </React.StrictMode>,
)

setup(store)