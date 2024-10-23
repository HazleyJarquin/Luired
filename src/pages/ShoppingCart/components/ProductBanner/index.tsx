import { Edit, Delete, Save } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { useShoppingCartStore } from "../../../../store";
import { useState } from "react";
import { QuantityButton } from "../../../../components";

interface Props {
  productName: string;
  productPrice: number;
  productIso3Code: string;
  quantity: number;
  productImage: string;
  id: string;
  stock: number;
  total: number;
}

export const ProductBanner = ({
  productIso3Code,
  productName,
  productPrice,
  quantity,
  productImage,
  id,
  stock,
  total,
}: Props) => {
  const [edit, setEdit] = useState(false);
  const [quantityEdit, setQuantityEdit] = useState(quantity);
  const { updateQuantity, removeFromCart } = useShoppingCartStore();

  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: 2,
        border: "1px solid #e0e0e0",
        padding: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#ffffff",
      }}
    >
      <img
        src={productImage}
        alt={productName}
        style={{
          width: "100px",
          height: "100px",
          objectFit: "cover",
          borderRadius: 2,
          border: "1px solid #f0f0f0",
        }}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "50%",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {productName}
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          {productIso3Code} {productPrice.toFixed(2)}
        </Typography>
        {edit ? (
          <QuantityButton
            quantity={quantityEdit}
            setQuantity={setQuantityEdit}
            stock={stock}
          />
        ) : (
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            Cantidad: {quantity}
          </Typography>
        )}
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          Total: ${total.toFixed(2)}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <IconButton
          onClick={() => {
            if (edit) {
              updateQuantity(id, quantityEdit);
              setEdit(false);
            } else {
              setEdit(true);
            }
          }}
        >
          {edit ? <Save /> : <Edit />}
        </IconButton>

        <IconButton onClick={() => removeFromCart(id)}>
          <Delete />
        </IconButton>
      </Box>
    </Box>
  );
};
