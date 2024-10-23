import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { Box, IconButton, Typography } from "@mui/material";

interface Props {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  stock: number;
}

export const QuantityButton = ({ quantity, setQuantity, stock }: Props) => {
  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };
  const handleDecrement = () => {
    setQuantity((prevQuantity) => prevQuantity - 1);
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
      }}
    >
      <IconButton onClick={handleDecrement} disabled={quantity == 1}>
        <RemoveIcon />
      </IconButton>
      <Typography
        sx={{
          background: "#e5e7eb",
          width: "4rem",
          borderRadius: 2,
          padding: 1,
          textAlign: "center",
        }}
      >
        {quantity}
      </Typography>
      <IconButton onClick={handleIncrement} disabled={quantity == stock}>
        <AddIcon />
      </IconButton>
    </Box>
  );
};
