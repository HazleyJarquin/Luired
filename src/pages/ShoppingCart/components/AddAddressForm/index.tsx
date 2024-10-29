import { Box, Button, FormHelperText, Input, Typography } from "@mui/material";
import { FormikProps } from "formik";
import { IUserAddress } from "../../../../interfaces";

type AddressRequest = Omit<IUserAddress, "name">;

interface Props {
  formik: FormikProps<AddressRequest>;
  setIsLoadingAddAddress: (value: boolean) => void;
  setNewAddressToAdd: (value: boolean) => void;
  isLoadingAddAddress: boolean;
  refetchAddresses: () => void;
}

export const AddAddressForm = ({
  formik,
  isLoadingAddAddress,
  refetchAddresses,
  setIsLoadingAddAddress,
  setNewAddressToAdd,
}: Props) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <Typography>Nueva Dirección:</Typography>
      <Input
        placeholder="Ingrese su dirección"
        value={formik.values.fields?.Direccion?.stringValue || ""}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          formik.setFieldValue("fields.Direccion.stringValue", e.target.value)
        }
        onBlur={(event) => {
          if (event.target instanceof HTMLInputElement) {
            formik.setFieldValue(
              "fields.Direccion.stringValue",
              event.target.value
            );
          }
          formik.handleBlur("fields.Direccion.stringValue")(event);
        }}
      />

      {formik.errors.fields?.Direccion?.stringValue &&
      formik.touched.fields?.Direccion ? (
        <FormHelperText error>
          {formik.errors.fields.Direccion.stringValue}
        </FormHelperText>
      ) : null}

      <Input
        placeholder="Estado"
        value={formik.values.fields?.Estado?.stringValue || ""}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          formik.setFieldValue("fields.Estado.stringValue", e.target.value)
        }
        onBlur={(event) => {
          if (event.target instanceof HTMLInputElement) {
            formik.setFieldValue(
              "fields.Estado.stringValue",
              event.target.value
            );
          }
          formik.handleBlur("fields.Estado.stringValue")(event);
        }}
      />

      {formik.errors.fields?.Estado?.stringValue &&
      formik.touched.fields?.Estado ? (
        <FormHelperText error>
          {formik.errors.fields.Estado.stringValue}
        </FormHelperText>
      ) : null}

      <Input
        placeholder="Ciudad"
        value={formik.values.fields?.Ciudad?.stringValue || ""}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          formik.setFieldValue("fields.Ciudad.stringValue", e.target.value)
        }
        onBlur={(event) => {
          if (event.target instanceof HTMLInputElement) {
            formik.setFieldValue(
              "fields.Ciudad.stringValue",
              event.target.value
            );
          }
          formik.handleBlur("fields.Ciudad.stringValue")(event);
        }}
      />

      {formik.errors.fields?.Ciudad?.stringValue &&
      formik.touched.fields?.Ciudad ? (
        <FormHelperText error>
          {formik.errors.fields.Ciudad.stringValue}
        </FormHelperText>
      ) : null}

      <Button
        onClick={() => {
          formik.handleSubmit();
          setIsLoadingAddAddress(true);
          setTimeout(() => {
            setNewAddressToAdd(false);
            setIsLoadingAddAddress(false);
            refetchAddresses();
          }, 3000);
        }}
        disabled={isLoadingAddAddress}
      >
        {isLoadingAddAddress ? "Agregando direccion..." : "Agregar direccion"}
      </Button>
    </Box>
  );
};
