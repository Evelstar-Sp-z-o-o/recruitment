import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import store from "./store/store";
import App from "./App";
import { CssBaseline } from "@mui/material";

const container = document.getElementById("root")!;
const root = createRoot(container);
root.render(
  <StrictMode>
    <Provider store={store}>
      <CssBaseline />
      <App />
    </Provider>
  </StrictMode>
);
