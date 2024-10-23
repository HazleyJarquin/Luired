import MenuIcon from "@mui/icons-material/Menu";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { FilterButton } from "../../../FilterButton";
import { useGetProductsCategory } from "../../../../services";

interface Props {
  handleOpenNavMenu: (event: React.MouseEvent<HTMLElement>) => void;
  anchorElNav: null | HTMLElement;
  handleCloseNavMenu: () => void;
  navigate: (to: string) => void;
  pages: { title: string; href: string }[];
}
export const MenuItemNavbarMobile = ({
  anchorElNav,
  handleCloseNavMenu,
  handleOpenNavMenu,
  navigate,
  pages,
}: Props) => {
  const handleFilterNavigate = (to: string) => {
    navigate(`/products/category/${to}`);
  };

  const { data: productFilters } = useGetProductsCategory();
  return (
    <>
      <StoreOutlinedIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
      <Typography
        variant="h6"
        noWrap
        component="a"
        onClick={() => navigate("/home")}
        sx={{
          mr: 2,
          display: { xs: "none", md: "flex" },
          color: "inherit",
          textDecoration: "none",
        }}
      >
        LUIRED
      </Typography>

      <Box
        sx={{
          flexGrow: 1,
          display: { xs: "flex", md: "none" },
          alignItems: "center",
        }}
      >
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          sx={{
            backgroundColor: "transparent",
            color: "black",
          }}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: "block", md: "none" },
          }}
        >
          {pages.map((page) => (
            <MenuItem key={page.title} onClick={() => navigate(page.href)}>
              <Typography sx={{ textAlign: "center" }}>{page.title}</Typography>
            </MenuItem>
          ))}
          <FilterButton
            filters={productFilters}
            handleNavigate={handleFilterNavigate}
          />
        </Menu>
      </Box>
    </>
  );
};
