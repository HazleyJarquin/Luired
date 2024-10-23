import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

export const ProductNotFound = () => {
  const navigate = useNavigate();
  const { productCategory } = useParams();
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
        textAlign: "center",
      }}
    >
      <SentimentDissatisfiedIcon sx={{ fontSize: 100 }} />
      <Typography variant="h4">
        Producto con categoria{" "}
        <span style={{ fontWeight: "bold" }}>{productCategory}</span> no
        encontrado
      </Typography>
      <Typography variant="subtitle1">
        Es posible que la categoria no exista o no hay disponibles en este
        moneto.
      </Typography>
      <Button onClick={() => navigate("/products")} variant="contained">
        Ver productos
      </Button>
    </Box>
  );
};
