import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import App from "@app";
import { ErrorBoundary } from "@components/error-boundary/error-boundary.component";
import { persistor, store } from "@store";

import "@styles/main.css";

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#ff6c00",
              },
            }}
          >
            <App />
          </ConfigProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </ErrorBoundary>
);
