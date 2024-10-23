import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import {
  Avatar,
  Badge,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { useShoppingCartStore, useUserStore } from "../../../../store";
import { SignInButton } from "../../../SignInButton";
import { FilterButton } from "../../../FilterButton";
import React from "react";
import { useGetProductsCategory } from "../../../../services";

interface Props {
  navigate: (to: string) => void;
  pages: { title: string; href: string }[];
  settings: { title: string; href: string; action: () => void }[];
  favShoppingCart: { title: string; icon: JSX.Element; href: string }[];
  anchorElUser: null | HTMLElement;
  handleOpenUserMenu: (event: React.MouseEvent<HTMLElement>) => void;
  handleCloseUserMenu: () => void;
}
export const PagesAndUserProfile = ({
  navigate,
  pages,
  settings,
  favShoppingCart,
  anchorElUser,
  handleOpenUserMenu,
  handleCloseUserMenu,
}: Props) => {
  const { pathname } = useLocation();
  const { user } = useUserStore();
  const { cart } = useShoppingCartStore();

  const { data: productFilters } = useGetProductsCategory();

  const handleFilterNavigate = (to: string) => {
    navigate(`/products/category/${to}`);
  };

  return (
    <>
      <StoreOutlinedIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
      <Typography
        variant="h5"
        noWrap
        component="a"
        onClick={() => navigate("/home")}
        sx={{
          mr: 2,
          display: { xs: "flex", md: "none" },
          flexGrow: 1,
          color: "inherit",
          textDecoration: "none",
        }}
      >
        LUIRED
      </Typography>
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        {pages.map((page) => (
          <Button
            key={page.title}
            onClick={() => navigate(page.href)}
            sx={{
              textTransform: "uppercase",
              my: 2,
              color: pathname === page.href ? "black" : "gray",
              display: "block",
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            {page.title}
          </Button>
        ))}
        <FilterButton
          filters={productFilters}
          handleNavigate={handleFilterNavigate}
        />
      </Box>
      <Box
        sx={{
          flexGrow: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        {favShoppingCart.map((fav, index) => (
          <React.Fragment key={fav.title || index}>
            {fav.title === "Shopping Cart" && cart.length > 0 ? (
              <Badge badgeContent={cart.length} color="primary">
                <IconButton
                  onClick={() => navigate(fav.href)}
                  sx={{
                    p: 0,
                    color: pathname === fav.href ? "black" : "gray",
                    backgroundColor: "transparent",
                    "&:hover": { backgroundColor: "transparent" },
                  }}
                >
                  {fav.icon}
                </IconButton>
              </Badge>
            ) : (
              <IconButton
                onClick={() => navigate(fav.href)}
                sx={{
                  p: 0,
                  color: pathname === fav.href ? "black" : "gray",
                  backgroundColor: "transparent",
                  "&:hover": { backgroundColor: "transparent" },
                }}
              >
                {fav.icon}
              </IconButton>
            )}
          </React.Fragment>
        ))}

        {user ? (
          <>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt={user?.displayName ?? ""}
                  src={user?.photoURL ?? ""}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting.title}
                  onClick={
                    setting.title === "Logout"
                      ? setting.action
                      : () => navigate(setting.href)
                  }
                >
                  <Typography sx={{ textAlign: "center" }}>
                    {setting.title}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </>
        ) : (
          <SignInButton justIcon />
        )}
      </Box>
    </>
  );
};
