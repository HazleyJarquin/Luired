import { signInWithGooglePopup } from "../../config";
import GoogleIcon from "@mui/icons-material/Google";
import { useUserStore } from "../../store";
import { Button, IconButton } from "@mui/material";

interface Props {
  justIcon?: boolean;
}

export const SignInButton = ({ justIcon = false }: Props) => {
  const { setUser } = useUserStore();
  const logGoogleUser = async () => {
    try {
      const response = await signInWithGooglePopup();
      if (response) {
        const responseObject = {
          displayName: response.user.displayName,
          email: response.user.email,
          photoURL: response.user.photoURL,
          uid: response.user.uid,
        };
        setUser(responseObject);
      }
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };
  return (
    <>
      {justIcon ? (
        <IconButton onClick={logGoogleUser} children={<GoogleIcon />} />
      ) : (
        <Button startIcon={<GoogleIcon />} onClick={logGoogleUser}>
          Sign in with Google
        </Button>
      )}
    </>
  );
};
