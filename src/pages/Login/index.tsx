import { Box, Typography } from "@mui/material";
import { SignInButton } from "../../components";

export const Login = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
        height: "100vh",
      }}
    >
      <Typography>Sign in to access the app</Typography>
      <SignInButton />
    </Box>
  );
};
