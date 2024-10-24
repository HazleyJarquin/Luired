import { Box, Typography } from "@mui/material";
import {
  useShoppingCartStore,
  useUserAddressStore,
  useUserStore,
} from "../../store";
import { ProductBanner } from "./components/ProductBanner";
import { BillGenerator, CheckboxGroup } from "../../components";
import { useGetUserAddress } from "../../services";
import { IUserAddress } from "../../interfaces";

export const ShoppingCart = () => {
  const { address: userAddressToSave, setAdress } = useUserAddressStore();

  const handleChange = (newSelection: string) => {
    setAdress(newSelection);
  };

  const { cart } = useShoppingCartStore();
  const { user } = useUserStore();

  const { data: userAddress } = useGetUserAddress();
  const totalToPay = cart.reduce((acc, p) => acc + p.total, 0).toFixed(2);

  if (!cart.length) {
    return (
      <Box>
        <Typography>No hay productos en el carrito</Typography>
      </Box>
    );
  }

  const filteredAddressByUserId = userAddress?.filter(
    (address: IUserAddress) =>
      address.fields.IdUsuario.stringValue === user?.uid
  );

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

        {filteredAddressByUserId?.map((address: IUserAddress) => (
          <Box key={address.name}>
            <Typography>Direcciones:</Typography>
            {address.fields.Direcciones.arrayValue.values.map(
              (direccion: { stringValue: string }, index: number) => (
                <CheckboxGroup
                  key={index}
                  option={direccion.stringValue}
                  onChange={handleChange}
                  selectedCheckbox={userAddressToSave}
                />
              )
            )}
            <Typography>Ciudad: {address.fields.Ciudad.stringValue}</Typography>
            <Typography>Estado: {address.fields.Estado.stringValue}</Typography>
          </Box>
        ))}

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
