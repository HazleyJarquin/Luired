import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    fontFamily: "Arimo, sans-serif",
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          backgroundColor: "#131118",
          color: "#FFFFFF",
          "&:hover": {
            backgroundColor: "#1a1a1a",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "#FFFFFF",
          backgroundColor: "#131118",
          "&:hover": {
            backgroundColor: "#1a1a1a",
          },
        },
      },
    },
  },
});
