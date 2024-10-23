import { useParams } from "react-router-dom";
import { IProducts } from "../../interfaces";
import { useGetAllProducts } from "../../services";
import {
  Alert,
  Box,
  Button,
  Snackbar,
  SnackbarCloseReason,
  Typography,
} from "@mui/material";
import { QuantityButton, SliderShowProduct } from "../../components";
import { useShoppingCartStore } from "../../store";
import { useState } from "react";
import { v4 as v44 } from "uuid";

export const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const { data: productsData } = useGetAllProducts();
  const { productName } = useParams();
  const { addToCart } = useShoppingCartStore();

  const productByNameFound = productsData?.documents?.find(
    (product: IProducts) =>
      product.fields.NombreProducto.stringValue === productName
  );

  const imageUrls = productByNameFound?.fields?.Images?.arrayValue?.values?.map(
    (image: { stringValue: string }) => image.stringValue
  );

  const imageTitle = productByNameFound?.fields?.NombreProducto?.stringValue;

  const productToAddCartObject = {
    name: productByNameFound?.fields?.NombreProducto?.stringValue,
    price: Number(productByNameFound?.fields?.Precio?.stringValue),
    image:
      productByNameFound?.fields?.Images?.arrayValue?.values[0]?.stringValue,
    quantity: quantity,
    id: v44(),
    stock: productByNameFound?.fields?.Stock?.integerValue,
    total: Number(productByNameFound?.fields?.Precio?.stringValue) * quantity,
    iso3Code: productByNameFound?.fields?.Iso3Code?.stringValue,
  };

  const handleAddToCart = () => {
    setOpen(true);
    addToCart(productToAddCartObject);
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
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        color="success"
        sx={{ mt: 8 }}
      >
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          Producto: {productToAddCartObject.name} agregado al carrito
        </Alert>
      </Snackbar>
      <Box
        sx={{
          display: { xs: "none", md: "flex", flexDirection: "column" },
          width: "50%",
        }}
      >
        <SliderShowProduct
          productImages={imageUrls}
          imageTitle={imageTitle}
          mainImageHeight="25rem"
        />
      </Box>
      <Box sx={{ display: { xs: "flex", md: "none" }, width: "100%" }}>
        <SliderShowProduct
          productImages={imageUrls}
          imageTitle={imageTitle}
          mainImageHeight="20rem"
          showThumbs={false}
        />
      </Box>

      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
          <Typography sx={{ fontSize: "2rem", fontWeight: "bold" }}>
            {productByNameFound?.fields?.NombreProducto?.stringValue}
          </Typography>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <Typography sx={{ fontSize: "1.5rem", color: "#8B0000" }}>
              {productByNameFound?.fields?.Iso3Code?.stringValue}
              {productByNameFound?.fields?.Precio?.stringValue}
            </Typography>
            <Typography sx={{ fontSize: "1.5rem", color: "#8B0000" }}>
              Disponibles: {productByNameFound?.fields?.Stock?.integerValue}
            </Typography>
          </Box>
        </Box>

        <QuantityButton
          quantity={quantity}
          setQuantity={setQuantity}
          stock={productByNameFound?.fields?.Stock.integerValue}
        />
        <Typography sx={{ fontSize: "1rem", fontWeight: "bold" }}>
          Descripción <br />
          <span>{productByNameFound?.fields?.Descripcion?.stringValue}</span>
        </Typography>

        <Button
          sx={{ width: { xs: "100%", md: "20%" } }}
          onClick={handleAddToCart}
        >
          Agregar al carrito
        </Button>
      </Box>
    </Box>
  );
};
