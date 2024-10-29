import { Box, Card, Typography } from "@mui/material";
import { CheckboxGroup } from "../../../../components";
import { LocationCityOutlined } from "@mui/icons-material";
interface Props {
  address: {
    fields: {
      IdUsuario: { stringValue: string };
      Direccion: { stringValue: string };
      Ciudad: { stringValue: string };
      Estado: { stringValue: string };
    };
  };
  userAddressToSave: string;
  handleChange: (newSelection: string) => void;
}
export const AddressesCard = ({
  address,
  handleChange,
  userAddressToSave,
}: Props) => {
  return (
    <Card sx={{ width: "100%", padding: "1rem" }}>
      <CheckboxGroup
        option={address.fields.Direccion.stringValue}
        onChange={handleChange}
        selectedCheckbox={userAddressToSave}
      />

      <Box sx={{ display: "flex", gap: "0.2rem", alignItems: "center" }}>
        <LocationCityOutlined />
        <Typography variant="body1" sx={{ ml: 1 }}>
          Ciudad: {address.fields.Ciudad.stringValue}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", gap: "0.2rem", alignItems: "center" }}>
        <LocationCityOutlined />
        <Typography variant="body1" sx={{ ml: 1 }}>
          Estado: {address.fields.Estado.stringValue}
        </Typography>
      </Box>
    </Card>
  );
};
