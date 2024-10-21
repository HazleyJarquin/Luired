import { AppBar, Container, Toolbar } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MenuItemNavbarMobile, PagesAndUserProfile } from "./components";
import { useNavigationsNavbar } from "./hooks/useNavigationsNavbar";

export const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const { pages, settings, favShoppingCart } = useNavigationsNavbar();
  const navigate = useNavigate();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: "#FFFFFF",
        boxShadow: "none",
        color: "#000000",
        borderBottom: "1px solid #E0E0E0",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <MenuItemNavbarMobile
            anchorElNav={anchorElNav}
            handleCloseNavMenu={handleCloseNavMenu}
            handleOpenNavMenu={handleOpenNavMenu}
            navigate={navigate}
            pages={pages}
          />
          <PagesAndUserProfile
            anchorElUser={anchorElUser}
            handleCloseUserMenu={handleCloseUserMenu}
            handleOpenUserMenu={handleOpenUserMenu}
            navigate={navigate}
            pages={pages}
            settings={settings}
            favShoppingCart={favShoppingCart}
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
