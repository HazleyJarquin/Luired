import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../config";
import { useUserStore } from "../../../store";
import { signOut } from "firebase/auth";

export const useNavigationsNavbar = () => {
  const { setUser, user } = useUserStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth).then(() => {
      setUser(null);
      navigate("/home");
    });
  };

  const pages = [
    { title: "Inicio", href: "/home" },
    { title: "Productos", href: "/products" },
    { title: "Acerca de", href: "/about" },
  ];

  const settings = [
    {
      title: "Perfil",
      href: `/user-profile/${user?.displayName ?? null}`,
      action: () => {},
    },
    { title: "Logout", href: "/logout", action: handleLogout },
  ];

  const favShoppingCart = [
    {
      title: "Wishlist",
      icon: <FavoriteBorderOutlinedIcon />,
      href: "/wishlist",
    },
    {
      title: "Shopping Cart",
      icon: <ShoppingBagOutlinedIcon />,
      href: "/shopping-cart",
    },
  ];

  return { pages, settings, favShoppingCart };
};
