import { Box, Typography } from "@mui/material";
import { useShoppingCartStore, useUserStore } from "../../store";
import { ProductBanner } from "./components/ProductBanner";
import { BillGenerator } from "../../components";

export const ShoppingCart = () => {
  const { cart } = useShoppingCartStore();
  const { user } = useUserStore();
  const totalToPay = cart.reduce((acc, p) => acc + p.total, 0).toFixed(2);

  if (!cart.length) {
    return (
      <Box>
        <Typography>No hay productos en el carrito</Typography>
      </Box>
    );
  }
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "space-between",
        gap: { xs: "1rem", md: "0" },
      }}
    >
      {/* <Button onClick={clearCart}>Clear</Button> */}
      <Box
        sx={{
          width: "50%",
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {cart.map((p) => (
          <ProductBanner
            key={p.name}
            productName={p.name}
            productPrice={p.price}
            productIso3Code={p.iso3Code}
            quantity={p.quantity}
            productImage={p.image}
            id={p.id}
            stock={p.stock}
            total={p.total}
          />
        ))}
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: { xs: "100%", md: "40%" },
        }}
      >
        <Typography>Nombre Completo: {user?.displayName}</Typography>
        <Typography>Email: {user?.email}</Typography>
        <Typography>Total: $ {totalToPay}</Typography>

        <BillGenerator products={cart} totalToPay={Number(totalToPay)} />
      </Box>

      <Box
        sx={{
          width: "100%",
          display: { xs: "flex", md: "none" },
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {cart.map((p) => (
          <ProductBanner
            key={p.name}
            productName={p.name}
            productPrice={p.price}
            productIso3Code={p.iso3Code}
            quantity={p.quantity}
            productImage={p.image}
            id={p.id}
            stock={p.stock}
            total={p.total}
          />
        ))}
      </Box>
    </Box>
  );
};
