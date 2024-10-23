import { createTheme } from "@mui/material/styles";
import { deepmerge } from "@mui/utils";

const defaultTheme = createTheme();

export const theme = createTheme(
  deepmerge(defaultTheme, {
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
            "&.Mui-disabled": {
              backgroundColor: defaultTheme.palette.action.disabledBackground,
              color: defaultTheme.palette.action.disabled,
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
            "&.Mui-disabled": {
              backgroundColor: defaultTheme.palette.action.disabledBackground,
              color: defaultTheme.palette.action.disabled,
            },
          },
        },
      },
    },
  })
);
