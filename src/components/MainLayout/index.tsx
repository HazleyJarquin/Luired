import { Outlet } from "react-router-dom";
import { Navbar } from "../Navbar";
import { Box } from "@mui/material";

export const MainLayout = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100vh",
      }}
    >
      <Box sx={{ position: "sticky", top: 0, zIndex: "99999" }}>
        <Navbar />
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          width: "100%",
          padding: "1rem",
          overflowY: "auto",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};
