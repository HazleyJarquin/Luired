import * as React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IProductsCategory } from "../../interfaces";

interface Props {
  filters: IProductsCategory[];
  handleNavigate: (path: string) => void;
}

export const FilterButton = ({ filters, handleNavigate }: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseWhenClickTheAction = (category: string) => {
    handleNavigate(category);
    handleClose();
  };

  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        endIcon={open ? <KeyboardArrowUpIcon /> : <ExpandMoreIcon />}
        sx={{
          textTransform: "uppercase",
          my: 2,
          color: "gray",
          display: "flex",
          backgroundColor: "transparent",
          "&:hover": {
            backgroundColor: "transparent",
          },
        }}
      >
        Filtros
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{ zIndex: 99999 }}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {filters?.map((filter) => (
          <MenuItem
            key={filter.fields.Titulo.stringValue}
            onClick={() =>
              handleCloseWhenClickTheAction(filter.fields.Categoria.stringValue)
            }
          >
            {filter.fields.Titulo.stringValue}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
