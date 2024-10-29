import { Box, Button, Typography } from "@mui/material";
import {
  useShoppingCartStore,
  useUserAddressStore,
  useUserStore,
} from "../../store";
import { ProductBanner } from "./components/ProductBanner";
import { BillGenerator } from "../../components";
import { useGetUserAddress } from "../../services";
import { IUserAddress } from "../../interfaces";
import { useState } from "react";

import { SlideAddress } from "./components/SlideAddress";
import { useCreateOrReadAddress } from "./hooks/useCreateOrReadAddress";
import { AddAddressForm } from "./components/AddAddressForm";

export const ShoppingCart = () => {
  const [newAddressToAdd, setNewAddressToAdd] = useState(false);
  const [isLoadingAddAddress, setIsLoadingAddAddress] = useState(false);
  const { address: userAddressToSave, setAdress } = useUserAddressStore();

  const { data: userAddress, refetch: refetchAddresses } = useGetUserAddress();
  const { formik } = useCreateOrReadAddress();
  const { cart } = useShoppingCartStore();
  const { user } = useUserStore();

  const handleChange = (newSelection: string) => {
    setAdress(newSelection);
  };

  const totalToPay = cart.reduce((acc, p) => acc + p.total, 0).toFixed(2);

  const filteredAddressByUserId = userAddress?.filter(
    (address: IUserAddress) =>
      address.fields.IdUsuario.stringValue === user?.uid
  );

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

        {newAddressToAdd || filteredAddressByUserId?.length === 0 ? (
          <AddAddressForm
            formik={formik}
            isLoadingAddAddress={isLoadingAddAddress}
            refetchAddresses={refetchAddresses}
            setIsLoadingAddAddress={setIsLoadingAddAddress}
            setNewAddressToAdd={setNewAddressToAdd}
          />
        ) : (
          <Box sx={{ width: "100%" }}>
            <Typography>Direcciones:</Typography>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                gap: "1rem",
              }}
            >
              <SlideAddress
                address={filteredAddressByUserId}
                handleChange={handleChange}
                userAddressToSave={userAddressToSave}
              />
            </Box>

            <Button onClick={() => setNewAddressToAdd(true)}>
              Agregar nueva dirección
            </Button>
          </Box>
        )}

        {filteredAddressByUserId?.length > 0 && !newAddressToAdd && (
          <BillGenerator products={cart} totalToPay={Number(totalToPay)} />
        )}

        {newAddressToAdd && (
          <Button onClick={() => setNewAddressToAdd(false)}>Cancelar</Button>
        )}
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
