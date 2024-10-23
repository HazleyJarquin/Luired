import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Snackbar,
  SnackbarCloseReason,
  Box,
  IconButton,
  Alert,
  Button,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useShoppingCartStore } from "../../store";

interface ProductCardProps {
  productName: string;
  description: string;
  price: number;
  images: string[];
  iso3Code: string;
  category: string;
}

export const ProductCard = ({
  productName,
  description,
  price,
  images,
  category,
  iso3Code,
}: ProductCardProps) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const productToShoppingCart = {
    name: productName,
    price: price,
    quantity: 1,
    id: uuidv4(),
  };

  const { addToCart } = useShoppingCartStore();

  const handleAddToCart = () => {
    addToCart(productToShoppingCart);
    setOpen(true);
  };

  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        color="success"
        sx={{ mt: 8 }}
      >
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          Producto: {productToShoppingCart.name} agregado al carrito
        </Alert>
      </Snackbar>
      <Card
        sx={{
          maxWidth: "100%",
          m: 2,
          border: "1px solid #E0E0E0",
          boxShadow: "none",
          borderRadius: 6,
          padding: 2,
        }}
      >
        <CardMedia
          component="img"
          height="280"
          image={images[0]}
          sx={{
            cursor: "pointer",
            objectFit: "cover",
            borderRadius: 4,
            border: "1px solid #E0E0E0",
          }}
          alt={productName}
          onClick={() => navigate(`/product/${productName}`)}
        />
        <CardContent sx={{ width: "100%" }}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography gutterBottom variant="h6" component="div">
              {productName.length > 19
                ? `${productName.slice(0, 19)} ...`
                : productName}
            </Typography>
            <Typography variant="h6" color="#28a745">
              {iso3Code}
              {price.toFixed(2)}
            </Typography>
          </Box>

          <span
            style={{
              background: "#e9e0e3",
              borderRadius: 4,
              padding: 6,
              color: "red",
              fontSize: 12,
            }}
          >
            {category}
          </span>

          <Typography mt={1} height={50} variant="body2" color="text.secondary">
            {description.length > 100
              ? `${description.slice(0, 100)}...`
              : description}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            boxShadow: "none",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button onClick={() => navigate(`/product/${productName}`)}>
            Ver más
          </Button>
          <Box
            sx={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton
              onClick={handleAddToCart}
              sx={{
                background: "red",
                "&:hover": {
                  backgroundColor: "#8B0000",
                },
              }}
            >
              <AddShoppingCartIcon />
            </IconButton>
            <IconButton
              onClick={() => alert("proximamente")}
              sx={{
                background: "red",
                "&:hover": {
                  backgroundColor: "#8B0000",
                },
              }}
            >
              <FavoriteBorderIcon />
            </IconButton>
          </Box>
        </CardActions>
      </Card>
    </>
  );
};
