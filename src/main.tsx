import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Routers } from "./components";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Routers />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
