import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
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
  stock: number;
}

export const ProductCard = ({
  productName,
  description,
  price,
  images,
  stock,
  iso3Code,
}: ProductCardProps) => {
  const [displayImage, setDisplayImage] = useState(images[0]);
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
  };
  return (
    <Card
      sx={{
        maxWidth: "100%",
        m: 2,
        boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px",
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={displayImage}
        sx={{ cursor: "pointer" }}
        alt={productName}
        onMouseEnter={() => setDisplayImage(images[1])}
        onMouseLeave={() => setDisplayImage(images[0])}
        onClick={() => navigate(`/product/${productName}`)}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {productName.length > 20
            ? `${productName.slice(0, 20)} ...`
            : productName}
        </Typography>
        <Typography height={50} variant="body2" color="text.secondary">
          {description.length > 100
            ? `${description.slice(0, 100)}...`
            : description}
        </Typography>

        <Typography height={20} variant="h6" color="primary" sx={{ mt: 2 }}>
          {iso3Code}
          {price.toFixed(2)}- {stock} in stock
        </Typography>
      </CardContent>
      <CardActions sx={{ boxShadow: "none" }}>
        <Button
          variant="contained"
          startIcon={<ShoppingCart />}
          onClick={handleAddToCart}
          fullWidth
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};
