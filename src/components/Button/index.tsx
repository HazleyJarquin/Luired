import {
  Button as MUIButton,
  ButtonProps,
  SxProps,
  Theme,
} from "@mui/material";

export const Button = ({ sx = {}, ...props }: ButtonProps) => {
  const combinedSx: SxProps<Theme> = {
    background: "#131118",
    color: "#FFFFFF",
    textTransform: "none",
    ...sx,
  };

  return <MUIButton sx={combinedSx} {...props} />;
};
