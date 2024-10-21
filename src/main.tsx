import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Routers } from "./components";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Routers />
    </ThemeProvider>
  </StrictMode>
);
