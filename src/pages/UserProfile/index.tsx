import { useParams } from "react-router-dom";
import { useUserStore } from "../../store";

export const UserProfile = () => {
  const { userName } = useParams();
  const { user } = useUserStore();

  // Verificar si el usuario existe
  const userExists = user && user.displayName === userName;

  if (!userExists) {
    return <div>Usuario no encontrado</div>;
  }

  return <div>Perfil de usuario: {user.displayName}</div>;
};
